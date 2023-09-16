from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.orm import validates

class Message(db.Model):
    __tablename__ = 'messages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    to_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    from_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    message = db.Column(db.String(255), nullable=False)
    addressed = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)

    toRef = db.relationship('User', foreign_keys='Message.to_id')
    fromRef = db.relationship('User', foreign_keys='Message.from_id')

    def to_dict(self):
        return {
            'id': self.id,
            'to_id': self.to_id,
            'senderInfo': self.fromRef.to_dict(),
            'message': self.message,
            'addressed': self.addressed,
            'createdAt': self.createdAt
        }
