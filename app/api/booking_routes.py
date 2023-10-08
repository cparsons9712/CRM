from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Booking, Client, Availability, db
from app.forms import BookingForm
from datetime import date, timedelta, datetime, time

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
    # Calculate the end time as a timedelta
    start_time = starttime.data
    duration_time = duration.data
    end_time_timedelta = timedelta(hours=start_time.hour, minutes=start_time.minute) + timedelta(hours=duration_time.hour, minutes=duration_time.minute)

    # Calculate the end time as a datetime.datetime object (for the date component) and then extract the time component
    end_time_datetime = datetime(1, 1, 1) + end_time_timedelta
    end_time = end_time_datetime.time()

    return end_time







def getDayOfWeek(date):
    return date.strftime('%A')


def getAvaliableSchedule(dayOfWeek, freelancerId):
    # get the complete schedule of avaliability
    schedule = Availability.query.filter(Availability.userId == freelancerId).first()
        # match the day from form to a day on the avaliabilty

    scheduleTable = {
        "Monday": [schedule.monStartTime, schedule.monEndTime],
        "Tuesday": [schedule.tueStartTime, schedule.tueEndTime],
        "Wednesday": [schedule.wedStartTime, schedule.wedEndTime],
        "Thursday": [schedule.thuStartTime, schedule.thuEndTime],
        "Friday": [schedule.friStartTime, schedule.friEndTime],
        "Saturday": [schedule.satStartTime, schedule.satEndTime],
        "Sunday": [schedule.sunStartTime, schedule.sunEndTime],
    }
    return scheduleTable.get(dayOfWeek, [])

def is_time_between(start_time, end_time, target_time):
    start_time_str = start_time.strftime('%H:%M')
    end_time_str = end_time.strftime('%H:%M')
    target_time_str = target_time.strftime('%H:%M')

    return start_time_str <= target_time_str <= end_time_str


@booking_routes.route('/freelancer/<userId>')
@login_required
def getUsersBookings(userId):
    """
    Get all of the bookings for a freelancer
    """

    bookings = Booking.query.filter((Booking.freelancerId == userId ) & (Booking.day >= date.today())).all()

    return [booking.to_dict() for booking in bookings]

@booking_routes.route('/<userId>', methods=['GET'])
@login_required
def getBookingsWithUser(userId):
    """
    Get all of the appointments the signed in user has with another specified user
    """
    if current_user.authLevel == 1:
        # if signed in user is a freelancer the other user will be client
        bookings = Booking.query.filter(Booking.freelancerId == current_user.id
        ).filter(Booking.clientId == userId
        ).filter(Booking.day >= date.today())

        return [booking.to_dict() for booking in bookings]
    else:
        # signed in user is a client so we look for the freelancer based on passed in id
        bookings = Booking.query.filter(Booking.freelancerId == userId
        ).filter(Booking.clientId == current_user.id
        ).filter(Booking.day >= date.today())

        return [booking.to_dict() for booking in bookings]

@booking_routes.route('/<userId>', methods=['POST'])
@login_required
def bookAppt(userId):
    """
    Books an appointment for the signed in user and another specified user
    """
    print('********** API RT FOR BOOKING ******************')
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    appointment = Booking()
    if form.validate_on_submit():

        # get the current appointments booked for both users on day and loop through all of them
        bookings = Booking.query.filter(
            (Booking.freelancerId == current_user.id) | (Booking.clientId == userId) |
            (Booking.freelancerId == userId) | (Booking.clientId == current_user.id)
            ).filter(Booking.day == form["day"].data)

        newStartTime = form["time"]
        newDuration = form["duration"]
        newEndTime = setEndTime(newStartTime, newDuration)

        #if newAppt starttime or endtime is after bookedAppt starttime and before bookedAppt endtime ERROR- Appointment slot not avaliable\

        for booking in bookings:

            if is_time_between(booking.time, booking.endTime, newStartTime.data) or is_time_between(booking.time, booking.endTime, newEndTime):
                return {'errors':[ 'One or both users are unavaliable for an appointment at the requested time']}, 422

        form.populate_obj(appointment)
        appointment.endTime = newEndTime


        #if the user is a freelancer
        if current_user.authLevel == 1:
            appointment.freelancerId = current_user.id
            appointment.clientId = userId
        # user is a client
        else:
            # Get the freelancers start and end times from his scheduled avaliability
            dayOfWeek = (form["day"].data).strftime('%A')
            schedArr = getAvaliableSchedule(dayOfWeek, userId)
            # check that the time is after avaliability start time and before avaliability end time
            if not is_time_between(schedArr[0], schedArr[1],newStartTime ):
                return {'errors':[ 'This start time is out of Freelancers avaliability to be booked']}, 422
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
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        # get the current appointments booked for both users on day of appointment
        bookings = Booking.query.filter(
            (Booking.freelancerId == appt.freelancerId)  |
             (Booking.clientId == appt.clientId)
            ).filter(Booking.day == date.today())

        newStartTime = form["time"]
        newDuration = form["duration"]
        newEndTime = setEndTime(newStartTime, newDuration)

        for booking in bookings:
            # check that the new start time or new end time are not within an existing appointment
            if is_time_between(booking.time, booking.endTime, newStartTime.data) or is_time_between(booking.time, booking.endTime,newEndTime):
                # make sure we are not looking at an old version of the booking we are updating
                if booking.id != appt.id:
                    return {'errors': [ 'One or both users are unavaliable for an appointment at the requested time']}, 422

        if(current_user.authLevel == 0):
            # get freelancers avaliability by calling a function that will return an array with two values- a start time and an end time
            dayOfWeek = (form["day"].data).strftime('%A')
            schedArr = getAvaliableSchedule(dayOfWeek, appt.freelancerId)

            # check that the time is after avaliability start time and before avaliability end time
            if not is_time_between(schedArr[0], schedArr[1],newStartTime ):
                return {'errors': ['This start time is out of Freelancers avaliability to be booked']}, 422

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

    if (appt.freelancerId != current_user.id) and (appt.clientId != current_user.id):
        return {'errors': ['Unauthorized']}, 401

    db.session.delete(appt)
    db.session.commit()

    return {'message': 'Appointment deleted successfully!'}
