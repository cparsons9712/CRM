from flask_wtf import FlaskForm
from wtforms import DateField, TimeField, StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from datetime import date, time

def validDay(form, field):
    day = field.data
    today = date.today()
    if day < today:
        raise ValidationError('Day cannot be in the past')


class BookingForm(FlaskForm):

    day = DateField('Day', validators=[DataRequired(), validDay])
    time = TimeField('Time', validators=[DataRequired()])
    duration = TimeField("Duration", validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired(), Length(min=3, max=30)] )
    location = StringField('Location', validators=[ Length(min=2, max=30)] )
