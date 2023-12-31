from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import validates
from datetime import datetime

class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    freelancerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    clientId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    description = db.Column(db.String(250))
    title = db.Column(db.String(50),nullable=False )
    priority = db.Column(db.String(5), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    due_date = db.Column(db.Date)
    createdAt = db.Column(db.DateTime, default=datetime.utcnow)


    freelancerRef = db.relationship('User', foreign_keys='Task.freelancerId')
    clientRef = db.relationship('User', foreign_keys='Task.clientId')

    @validates('priority')
    def validate_priority(self, key, value):
        # Ensure priority is one of the allowed values
        allowed_priorities = ['Low', 'Med', 'High']
        if value not in allowed_priorities:
            raise ValueError(f"Priority must be one of {', '.join(allowed_priorities)}")
        return value

    def to_dict(self):
        task_dict = {
                "id": self.id,
                "title": self.title,
                "description": self.description,
                "priority": self.priority,
                "completed": self.completed,
                "due_date": self.due_date,
                "createdAt": self.createdAt,
            }

        if hasattr(self, 'clientRef') and hasattr(self.clientRef, 'to_dict') and callable(self.clientRef.to_dict):
            task_dict["Client"] = self.clientRef.to_dict()
        else:
            task_dict["Client"] = None

        return task_dict
