from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, DateField, IntegerField, BooleanField
from wtforms.validators import DataRequired


class TaskForm(FlaskForm):
    clientId = IntegerField('Client Id')
    description = StringField('description', validators=[DataRequired()])
    priority = SelectField('Priority', choices=['Low', 'Med', 'High'], validators=[DataRequired()])
    due_date = DateField('Due Date')
    completed = BooleanField('Completed')
