from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError


class NotesForm(FlaskForm):
    text = StringField('text', validators=[DataRequired()])

    def validate_text(form, field):
        if len(field.data) < 2 or len(field.data) > 85:
            raise ValidationError('The note needs to have between 2 and 85 characters')
