from flask_wtf import FlaskForm
from wtforms import DateField, TimeField, StringField
from wtforms.validators import DataRequired, Email, ValidationError



class BookingForm(FlaskForm):
    day = DateField('Day', validators=[DataRequired()])
    time = TimeField('Time', validators=[DataRequired()])
    title = StringField('Title', validators=[DataRequired()] )
    location = StringField('Location')
