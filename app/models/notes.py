from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import validates
from datetime import datetime

class Note(db.Model):
    __tablename__ = 'notes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    freelancerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    clientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    text = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)

    freelancerRef = db.relationship('User', foreign_keys='Note.freelancerId')
    clientRef = db.relationship('User', foreign_keys='Note.clientId')

    def to_dict(self):
        return {
            "id": self.id,
            "clientId": self.clientId,
            "text": self.text,
            "createdAt": self.createdAt
        }
