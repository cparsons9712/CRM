from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates


class Availability(db.Model):
    __tablename__ = 'availability'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    dayOfWeek = db.Column(db.String(15), nullable=False)
    startTime = db.Column(db.Time, nullable=False)
    endTime = db.Column(db.Time, nullable=False)

    @validates('dayOfWeek')
    def validate_dayOfWeek(self, key, value):
        # Ensure dayOfWeek is one of the allowed values
        allowed_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        if value not in allowed_days:
            raise ValueError(f"Priority must be one of {', '.join(allowed_days)}")
        return value

    def to_dict(self):
        def serialize_time(time_obj):
            return time_obj.strftime('%H:%M:%S')

        return {
            "id" : self.id,
            "userId" : self.userId,
            "dayOfWeek":  self.dayOfWeek,
            "startTime": serialize_time(self.startTime),
            "endTime": serialize_time(self.endTime)
        }
