from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Client

task_routes = Blueprint('task', __name__)
