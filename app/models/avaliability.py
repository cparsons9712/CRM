from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates


class Availability(db.Model):
    __tablename__ = 'availability'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    monStartTime = db.Column(db.Time, nullable=False)
    monEndTime = db.Column(db.Time, nullable=False)
    tueStartTime = db.Column(db.Time, nullable=False)
    tueEndTime = db.Column(db.Time, nullable=False)
    wedStartTime = db.Column(db.Time, nullable=False)
    wedEndTime = db.Column(db.Time, nullable=False)
    thuStartTime = db.Column(db.Time, nullable=False)
    thuEndTime = db.Column(db.Time, nullable=False)
    friStartTime = db.Column(db.Time, nullable=False)
    friEndTime = db.Column(db.Time, nullable=False)
    satStartTime = db.Column(db.Time, nullable=False)
    satEndTime = db.Column(db.Time, nullable=False)
    sunStartTime = db.Column(db.Time, nullable=False)
    sunEndTime = db.Column(db.Time, nullable=False)



    def to_dict(self):
        def serialize_time(time_obj):
            return time_obj.strftime('%H:%M:%S')

        return {
            "id" : self.id,
            "userId" : self.userId,
            "monStartTime": serialize_time(self.monStartTime),
            "monEndTime": serialize_time(self.monEndTime),
            "tueStartTime": serialize_time(self.tuesStartTime),
            "tueEndTime": serialize_time(self.tuesEndTime),
            "wedStartTime": serialize_time(self.monStartTime),
            "wedEndTime": serialize_time(self.monEndTime),
            "thuStartTime": serialize_time(self.monStartTime),
            "thuEndTime": serialize_time(self.monEndTime),
            "friStartTime": serialize_time(self.monStartTime),
            "friEndTime": serialize_time(self.monEndTime),
            "satStartTime": serialize_time(self.monStartTime),
            "satEndTime": serialize_time(self.monEndTime),
            "sunStartTime": serialize_time(self.monStartTime),
            "sunEndTime": serialize_time(self.monEndTime),

        }
