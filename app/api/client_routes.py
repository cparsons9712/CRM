from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Client, User, db
from app.forms import ClientForm



client_routes = Blueprint('relationships', __name__)



def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@client_routes.route('/')
@login_required
def relationships():
    """
    Query for all users with whom the signed in user has a relationship with and returns them in an array
    """
    # if the current user is a freelancer, find their clients
    if current_user.authLevel == 1:
        clients = Client.query.filter( Client.freelancerId == current_user.id ).all()
        return {'Clients': [client.to_dict() for client in clients]}

    # if the current user is a client, find the freelancers they work with
    else:
        freelancers = Client.query.filter( Client.clientId == current_user.id ).all()
        return {'Freelancers': [freelancer.to_dict() for freelancer in freelancers]}

@client_routes.route('/', methods=['POST'])
@login_required
def newRelationship():
    """
    Create a new connection between a freelancer and a client
    """
    form = ClientForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # print('!!!!!!!!!!!!!!!!!!!!!!!')
    # print(form.data)
    if form.validate_on_submit():
        #print('!!!!!!!!!!!!!!!!!!!!!!!')
        #print(form.data)

        if current_user.authLevel == 1:
            relationship = Client(
                freelancerId = current_user.id,
                clientId = +form.data['otherId']
            )
            db.session.add(relationship)
            db.session.commit()
            return {'Client' : relationship.to_dict()}

        else:
            relationship = Client(
                clientId = current_user.id,
                freelancerId = +form.data['otherId']
            )
            db.session.add(relationship)
            db.session.commit()
            return {'Freelancer': relationship.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 422
