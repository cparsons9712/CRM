from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates


class Service(db.Model):
    __tablename__ = 'services'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    freelancerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Integer)

    freelancerRef = db.relationship('User', foreign_keys='Service.freelancerId')

    def to_dict(self):
        return {
            "id": self.id,
            "freelancerId" : self.freelancerId,
            "name" : self.name,
            "description": self.description,
            "price" : self.price
        }
