from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')




class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired()])
    firstName = StringField('first name', validators=[DataRequired()])
    lastName = StringField('last name', validators=[DataRequired()])
    phoneNumber = StringField('phone number' )
    authLevel = SelectField("auth level", choices=[(0, "Client"), (1, "Freelancer")],validators=[DataRequired()], coerce=int )
    aboutMe = StringField('about me')
    title = StringField('title')
