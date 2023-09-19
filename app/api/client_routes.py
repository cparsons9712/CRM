from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Client

client_routes = Blueprint('relationships', __name__)
