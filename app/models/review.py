from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    freelancerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    clientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    text = db.Column(db.String(255))
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)


    freelancerRef = db.relationship('User', foreign_keys='Review.freelancerId')
    clientRef = db.relationship('User', foreign_keys='Review.clientId')

    def to_dict(self):
        return {
            "id": self.id,
            "freelancerId": self.freelancerId,
            "clientInfo": self.clientRef.to_dict(),
            "createdAt": self.createdAt,
            "stars": self.stars,
            "text": self.text
        }
