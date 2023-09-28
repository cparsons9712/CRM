from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Booking, Client, Availability, db
from app.forms import BookingForm
from datetime import date

booking_routes = Blueprint('booking', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

def setEndTime(starttime, duration):
    return (starttime + duration).strftime('%H:%M')

def getDayOfWeek(date):
    dayNum = date.weekday()
    days = ["mon", 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
    return days[dayNum]

def getAvaliableSchedule(dayOfWeek, scheduleObj):
    scheduleTable = {
        "mon": [scheduleObj[monStartTime], scheduleObj[monEndTime]],
        "tue": [scheduleObj[tueStartTime], scheduleObj[tueEndTime]],
        "wed": [scheduleObj[wedStartTime], scheduleObj[wedEndTime]],
        "thu": [scheduleObj[thuStartTime], scheduleObj[thuEndTime]],
        "fri": [scheduleObj[friStartTime], scheduleObj[friEndTime]],
        "sat": [scheduleObj[satStartTime], scheduleObj[satEndTime]],
        "sun": [scheduleObj[sunStartTime], scheduleObj[sunEndTime]],
    }
    return scheduleTable[dayOfWeek]


@booking_routes.route('/<userId>')
@login_required
def getUsersBookings(userId):
    """
    Get all of the bookings for a user
    """

    bookings = Booking.query.filter((Booking.freelancerId == userId or Booking.clientId == userId) and Booking.day <= date.today())

    return [booking.to_dict() for booking in bookings]

@booking_routes.route('/<userId>', methods=['GET'])
@login_required
def getBookingsWithUser(userId):
    """
    Get all of the appointments the signed in user has with another specified user
    """
    if current_user.authLevel == 1:

        bookings = Booking.query.filter(Booking.freelancerId == current_user.id and Booking.clientId == userId and Booking.day <= date.today())
        return [booking.to_dict() for booking in bookings]
    else:
        bookings = Booking.query.filter(Booking.freelancerId == userId and Booking.clientId == current_user.id and Booking.day <= date.today())
        return [booking.to_dict() for booking in bookings]

@booking_routes.route('/<userId>', methods=['POST'])
@login_required
def bookAppt(userId):
    """
    Books an appointment for the signed in user and another specified user
    """
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    appointment = Booking()
    if form.validate_on_submit():
        # get the current appointments booked for both users on day and loop through all of them
        bookings = Booking.query.filter(
            ((Booking.freelancerId == current_user.id) & (Booking.clientId == userId)) |
            ((Booking.freelancerId == userId) & (Booking.clientId == current_user.id))
            ).filter(Booking.day == date.today())

        newStartTime = form["time"]
        newDuration = form["duration"]
        newEndTime = setEndTime(newStartTime, newDuration)
        #if newAppt starttime or endtime is after bookedAppt starttime and before bookedAppt endtime ERROR- Appointment slot not avaliable
        for booking in bookings:
            if (newStartTime > booking.startTime and newStartTime < booking.endTime) or (newEndTime > booking.startTime and newEndTime < booking.endTime):
                return {'errors': {'time': 'One or both users are unavaliable for an appointment at the requested time'}}

        form.populate_obj(appointment)
        appointment.endTime = newEndTime

        #if the user is a freelancer
        if current_user.authLevel == 1:
            appointment.freelancerId = current_user.id
            appointment.clientId = userId
        # user is a client
        else:
            # get the passed in users avaliability
            freelancerSchedule = Availability.query.filter(Availability.userId == userId).first()
            # match the day from form to a day on the avaliabilty
            dayOfWeek = getDayOfWeek(form["day"])
            schedArr = getAvaliableSchedule(dayOfWeek, freelancerSchedule)
            # check that the time is after avaliability start time and before avaliability end time
            if(form["time"] < schedArr[0] or form["time"] > schedArr[1]):
                return {'errors': {'time': 'This start time is out of Freelancers avaliability to be booked'}}
            # set freelancerId to passedin UserId
            appointment.freelancerId = userId
            # set clientId to current users id
            appointment.clientId = current_user.id

        db.session.add(appointment)
        db.session.commit()
        # return the instance in JSON formatt
        return appointment.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 422


@booking_routes.route('/<bookingId>', methods=['PUT'])
@login_required
def updateAppt(bookingId):
    appt = Booking.query.get_or_404(bookingId)
    form = BookingForm
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # get the current appointments booked for both users on day and loop through all of them
        bookings = Booking.query.filter(
            (Booking.freelancerId == appt.freelancerId)  |
             (Booking.clientId == appt.clientId)
            ).filter(Booking.day == date.today())

        newStartTime = form["time"]
        newDuration = form["duration"]
        newEndTime = setEndTime(newStartTime, newDuration)
        #if newAppt starttime or endtime is after bookedAppt starttime and before bookedAppt endtime ERROR- Appointment slot not avaliable
        for booking in bookings:
            if (newStartTime > booking.startTime and newStartTime < booking.endTime) or (newEndTime > booking.startTime and newEndTime < booking.endTime):
                if booking.id != appt.id:
                    return {'errors': {'time': 'One or both users are unavaliable for an appointment at the requested time'}}
        # make sure appt is in freelancers avaliability
        freelancerSchedule = Availability.query.filter(Availability.userId == appt.freelancerId).first()
        # match the day from form to a day on the avaliabilty
        dayOfWeek = getDayOfWeek(form["day"])
        schedArr = getAvaliableSchedule(dayOfWeek, freelancerSchedule)
        # check that the time is after avaliability start time and before avaliability end time
        if(form["time"] < schedArr[0] or form["time"] > schedArr[1]):
            return {'errors': {'time': 'This start time is out of Freelancers avaliability to be booked'}}

        form.populate_obj(appt)
        appt.endTime = newEndTime
        db.session.add(appt)
        db.session.commit()
        # return the instance in JSON formatt
        return appt.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 422

@booking_routes.route('/<booking_id>', methods=['DELETE'])
@login_required
def delete_booking(booking_id):
    """
    Deletes an existing Appointment
    """
    appt = Booking.query.get_or_404(booking_id)

    if (appt.freelancerId != current_user.id) | (appt.clientId != current_user.id):
        return {'errors': {'Unauthorized': 'Only the freelancer or client associated with this booking may delete it '}}, 401

    db.session.delete(appt)
    db.session.commit()

    return {'message': 'Appointment deleted successfully!'}
