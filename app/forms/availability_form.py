from flask_wtf import FlaskForm
from wtforms import DateField, TimeField, StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError



class AvailabilityForm(FlaskForm):
    dayOfWeek = StringField('Day of Week')
    startTime = TimeField('Start Time', validators=[DataRequired()] )
    endTime = TimeField('End Time', validators=[DataRequired()])

    def validate_endTime(form, field):
        if form.startTime.data and field.data <= form.startTime.data:
            raise ValidationError('End time must be later than start time.')
