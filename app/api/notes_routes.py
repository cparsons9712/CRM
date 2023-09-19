from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Note, Client, db
from app.forms import NotesForm

note_routes = Blueprint('notes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@note_routes.route('/<client_id>')
@login_required
def notes(client_id):
    """
    Get all the notes that the signed in user has made for a client
    """
    relationship = Client.query.filter((Client.clientId == client_id) & (Client.freelancerId == current_user.id)).first()
    if relationship is None:
        return {'errors': {'Unauthorized': 'Freelancer does not have an existing client relationship with this user.'}}, 401
    notes = Note.query.filter((Note.clientId == client_id) & (Note.freelancerId == current_user.id)).all()

    return {"Notes": [note.to_dict() for note in notes]}

@note_routes.route('/<client_id>', methods=['POST'])
@login_required
def new_note(client_id):
    """
    Take in form data for text<str> and a client's Id from the url then creates a new note record for that client
    """
    form = NotesForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # Check that the user is associated with the client. If not prevent the user from seeing the client's notes
    relationship = Client.query.filter((Client.clientId == client_id) & (Client.freelancerId == current_user.id)).first()
    if relationship is None:
        return {'errors': {'Unauthorized': 'Freelancer does not have an existing client relationship with this user.'}}, 401

    if form.validate_on_submit():
        newNote = Note(
        freelancerId = current_user.id,
        clientId = client_id,
        text = form.data['text']
        )
        db.session.add(newNote)
        db.session.commit()
        return newNote.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 422

@note_routes.route('/<note_id>', methods=['PUT'])
@login_required
def edit_note(note_id):
    """
    Edit an existing Note
    """
    form = NotesForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    note = Note.query.get_or_404(note_id)

    if note.freelancerId != current_user.id:
        return {'errors': {'Unauthorized': 'Freelancer is not the author of this note. '}}, 401


    if form.validate_on_submit():
        note.text = form.data['text']

        db.session.add(note)
        db.session.commit()

        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 422

@note_routes.route('/<note_id>', methods=['DELETE'])
@login_required
def delete_note(note_id):
    """
    Deletes an existing Note
    """
    note = Note.query.get_or_404(note_id)

    if note.freelancerId != current_user.id:
        return {'errors': {'Unauthorized': 'Freelancer is not the author of this note. '}}, 401

    db.session.delete(note)
    db.session.commit()

    return {'message': 'Note deleted successfully!'}
