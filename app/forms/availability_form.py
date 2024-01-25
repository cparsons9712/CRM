from flask_wtf import FlaskForm
from wtforms import DateField, TimeField, StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError

"""
This form is not currently in use in the application as the feature isnt in use at the moment
"""


class AvailabilityForm(FlaskForm):
    monStartTime = TimeField('Start Time', validators=[DataRequired()] )
    monEndTime = TimeField('End Time', validators=[DataRequired()])
    tueStartTime = TimeField('Start Time', validators=[DataRequired()] )
    tueEndTime = TimeField('End Time', validators=[DataRequired()])
    wedStartTime = TimeField('Start Time', validators=[DataRequired()] )
    wedEndTime = TimeField('End Time', validators=[DataRequired()])
    thuStartTime = TimeField('Start Time', validators=[DataRequired()] )
    thuEndTime = TimeField('End Time', validators=[DataRequired()])
    friStartTime = TimeField('Start Time', validators=[DataRequired()] )
    friEndTime = TimeField('End Time', validators=[DataRequired()])
    satStartTime = TimeField('Start Time', validators=[DataRequired()] )
    satEndTime = TimeField('End Time', validators=[DataRequired()])
    sunStartTime = TimeField('Start Time', validators=[DataRequired()] )
    sunEndTime = TimeField('End Time', validators=[DataRequired()])
