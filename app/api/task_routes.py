from flask import Blueprint, jsonify,request, session
from flask_login import login_required, current_user
from app.models import Client, Task, db
from app.forms import TaskForm

task_routes = Blueprint('task', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@task_routes.route('/')
@login_required
def task():
    """
    Get all the task for signed in user
    """

    tasks = Task.query.filter(Task.freelancerId == current_user.id).all()

    return [task.to_dict() for task in tasks]

@task_routes.route('/<client_id>')
@login_required
def clientTask(client_id):
    """
    Get all the task for a client of signed in user
    """
    relationship = Client.query.filter((Client.clientId == client_id) & (Client.freelancerId == current_user.id)).first()
    if relationship is None:
        return {'errors': {'Unauthorized': 'Freelancer does not have an existing client relationship with this user.'}}, 401
    tasks = Task.query.filter((Task.freelancerId == current_user.id) & (Task.clientId == client_id)).all()

    return  [task.to_dict() for task in tasks]

@task_routes.route('/', methods=['POST'])
@login_required
def newTask():
    """
    Create a new Task
    """
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        clientId = form.data['clientId']

        if clientId:
                relationship = Client.query.filter((Client.clientId == clientId) & (Client.freelancerId == current_user.id)).first()

                if relationship is None:
                    return {'errors': {'Unauthorized': 'Freelancer does not have an existing client relationship with this user.'}}, 401
        # Create the new Task with proper info
        newTask = Task()
        form.populate_obj(newTask)
        newTask.freelancerId = current_user.id

        db.session.add(newTask)
        db.session.commit()


        return newTask.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 422

@task_routes.route('/<task_id>', methods=['PUT'])
@login_required
def editTask(task_id):
    """
    Edits an existing Task or updates the completion status.
    """

    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    task = Task.query.get_or_404(task_id)
    if task.freelancerId != current_user.id:
        return {'errors': {'Unauthorized': 'Freelancer is not the author of this note.'}}, 401

    if form.validate_on_submit():
        if 'completed' in form.data:
            # Handle completion status change
            task.completed = form.completed.data
        else:
            # Handle editing main task details
            form.populate_obj(task)

        db.session.add(task)
        db.session.commit()

        return task.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 422

@task_routes.route('/<task_id>', methods=['DELETE'])
@login_required
def delete_note(task_id):
    """
    Deletes an existing Task
    """
    task = Task.query.filter(Task.id == task_id).first()
    if task is None:
        return {'errors': {'Not Found': 'A task with this id could not be located'}}, 404

    if task.freelancerId != current_user.id:
        return {'errors': {'Unauthorized': 'Freelancer is not the author of this note. '}}, 401

    db.session.delete(task)
    db.session.commit()

    return {'message': 'Note deleted successfully!'}
