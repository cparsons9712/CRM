from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notes import seed_notes, undo_notes
from .task import seed_tasks, undo_tasks
from .avaliability import seed_availability, undo_availability
from .booking import seed_bookings, undo_bookings
from .message import seed_messages, undo_messages
from .service import seed_services, undo_services

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_notes()
        undo_tasks()
        undo_availability()
        undo_bookings()
        undo_messages()
        undo_services()

    seed_users()
    seed_notes()
    seed_tasks()
    seed_availability()
    seed_bookings()
    seed_messages()
    seed_services()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_notes()
    undo_tasks()
    undo_availability()
    undo_bookings()
    undo_messages()
    undo_services()
