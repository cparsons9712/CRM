from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
from flask_login import current_user

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

        if current_user.authLevel == 1:
            client = self.clientRef.to_dict()
            res = {'id':client['id'], 'firstName': client['firstName'], 'lastName': client['lastName'], 'email': client['email'], 'phoneNumber': client['phoneNumber'] }
            return res
        else:
            freelancer = self.freelancerRef.to_dict()
            res = {'id': freelancer['id'], 'firstName': freelancer['firstName'], 'lastName': freelancer['lastName'], 'email': freelancer['email'], 'phoneNumber': freelancer['phoneNumber'], 'title': freelancer['title'], 'aboutMe': freelancer['aboutMe']}
            return res
