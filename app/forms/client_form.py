from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Client
from flask_login import current_user, login_user, logout_user, login_required


def relationship_exists(form, field):
    otherId = field.data

    if current_user.authLevel == 1:
        relationship = Client.query.filter(Client.freelancerId == current_user.id, Client.clientId == otherId).first()
    else:
        relationship = Client.query.filter(Client.freelancerId == otherId, Client.clientId == current_user.id).first()

    if relationship:
        raise ValidationError('A relationship already exists between this user and the signed-in user')

class ClientForm(FlaskForm):
    otherId = IntegerField('other Id', validators=[DataRequired(), relationship_exists])
