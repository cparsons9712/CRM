from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    freelancerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    clientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    day = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable = False)
    title = db.Column (db.String(50), nullable = False)
    location = db.Column(db.String(50))
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)


    freelancerRef = db.relationship('User', foreign_keys='Client.freelancerId')
    clientRef = db.relationship('User', foreign_keys='Client.clientId')

    def to_dict(self):
        return {
            "id" : self.id,
            "freelancerId" :self.freelancerId,
            "freelancerInfo": self.freelancerRef.to_dict(),
            "clientId": self.clientId,
            "clientInfo": self.clientRef.to_dict(),
            "day" : self.day,
            "time" : self.time,
            "title" : self.title,
            "location" : self.location,
            "createdAt" : self.createdAt
        }
