from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import validates


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(25), nullable=False)
    lastName = db.Column(db.String(25), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    phoneNumber = db.Column(db.String(10))
    authLevel = db.Column(db.Integer, nullable=False)
    aboutMe = db.Column(db.String(255))
    title= db.Column(db.String(50))
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'phoneNumber': self.phoneNumber,
            'authLevel': self.authLevel,
            'aboutMe': self.aboutMe,
            'title': self.title
        }
