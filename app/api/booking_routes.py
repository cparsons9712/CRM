from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Booking, Client, db
from app.forms import BookingForm

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


