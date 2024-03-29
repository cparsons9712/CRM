"""
Avaliability feature is not currently implemimented 

"""


from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Booking, Client, Availability, db
from app.forms import AvailabilityForm

availability_routes = Blueprint('availability', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@availability_routes.route('/<userId>')
def getUsersAvaliability(userId):
    """
    Get the avaliability of a specific user
    """
    schedule = Availability.query.filter( Availability.userId == userId).first()

    return schedule.to_dict()

@availability_routes.route('/<id>', methods=['PUT'])
@login_required
def updateSchedule(id):
    """
    Allows a user to change the time frames they are avaliable to be booked
    """
    form = AvailabilityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if current_user.authLevel != 1:
        return {'errors': {'Unauthorized': 'User is not a Freelancer and cannot set availibility'}}, 401

    slot = Availability.query.get_or_404(id)

    if slot.userId is not current_user.id:
        return {'errors': {'Unauthorized': 'This slot is not associated with the user'}}, 401

    if form.validate_on_submit():
        form.populate_obj(slot)
        db.session.add(slot)
        db.session.commit()
        return slot.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 422

@availability_routes.route('/', methods=['POST'])
@login_required
def setSchedule():
    """
    Sets up an initial schedule for a user
    """
    form = AvailabilityForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if current_user.authLevel != 1:
        return {'errors': {'Unauthorized': 'User is not a Freelancer and cannot set availibility'}}, 401

    slot = Availability()


    if form.validate_on_submit():
        slot.userId = current_user.id
        form.populate_obj(slot)
        db.session.add(slot)
        db.session.commit()
        return slot.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 422
