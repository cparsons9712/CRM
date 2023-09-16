from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import validates

class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    freelancerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    clientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.Date, nullable=False)

    freelancerRef = db.relationship('User', foreign_keys='Client.freelancerId')
    clientRef = db.relationship('User', foreign_keys='Client.clientId')

    def to_dict(self):
        return {
            "id": self.id,
            "freelancerId": self.freelancerId,
            "clientId": self.clientId,
            "clientInfo": self.clientRef.to_dict(),
            "text": self.text,
            "createdAt": self.createdAt
        }