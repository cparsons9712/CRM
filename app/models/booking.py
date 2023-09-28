from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from flask_login import current_user
from sqlalchemy import func

class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    freelancerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    clientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)

    day = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable = False)
    duration = db.Column(db.Time, nullable=False)
    endTime = db.Column(db.Time)
    title = db.Column (db.String(50), nullable = False)
    location = db.Column(db.String(50))



    freelancerRef = db.relationship('User', foreign_keys='Booking.freelancerId')
    clientRef = db.relationship('User', foreign_keys='Booking.clientId')


    def to_dict(self):
        if current_user.authLevel == 1:
            return {
                "id": self.id,
                "userId": self.freelancerId,
                "Client": self.clientRef.to_dict(),
                "day": self.day,
                "time": self.time.strftime('%H:%M'),
                "endTime": self.endTime.strftime('%H:%M'),
                "title": self.title,
                "location": self.location,
                "createdAt": self.createdAt.strftime('%Y-%m-%d %H:%M:%S')
            }
        else:
            return {
                "id": self.id,
                "userId": self.freelancerId,
                "Freelancer": self.freelancerRef.to_dict(),
                "day": self.day,
                "time": self.time.strftime('%H:%M'),
                "endTime": self.endTime.strftime('%H:%M'),
                "title": self.title,
                "location": self.location,
                "createdAt": self.createdAt.strftime('%Y-%m-%d %H:%M:%S')
            }
