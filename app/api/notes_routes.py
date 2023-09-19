from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Client

note_routes = Blueprint('notes', __name__)
