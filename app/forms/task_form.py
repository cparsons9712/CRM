from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DateField, IntegerField, BooleanField
from wtforms.validators import DataRequired , ValidationError
import datetime


class TaskForm(FlaskForm):
    clientId = IntegerField('Client Id')
    title = StringField('title', validators=[DataRequired()])
    description = StringField('description')
    priority = SelectField('Priority', choices=['Low', 'Med', 'High'], validators=[DataRequired()])
    due_date = DateField('Due Date', validators=[DataRequired()])
    completed = BooleanField('Completed')

    def validate_title(form, field):
        if len(field.data) < 2 or len(field.data) > 50:
            raise ValidationError('Title must be between 2 and 50 characters')

    def validate_description(form, field):
        if len(field.data) > 250:
            raise ValidationError('Description cannot be longer than 250 Characters')

    def validate_due_date(form, field):
        if field.data < datetime.date.today():
            raise ValidationError("The due date cannot be in the past.")
