from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates

class Client(db.Model):
    __tablename__ = 'clients'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    freelancerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    clientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    freelancerRef = db.relationship('User', foreign_keys='Client.freelancerId')
    clientRef = db.relationship('User', foreign_keys='Client.clientId')

    def to_dict(self):
        return {
            'id': self.id,
            'client_info': self.clientRef.to_dict(),
            'freelancer_info': self.freelancerRef.to_dict()
        }
