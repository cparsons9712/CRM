from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime



def seed_tasks():
    one = Task(
        freelancerId = 1,
        clientId = 2,
        description = "Finish seeding database",
        priority = "Med",
        completed = False,
        due_date=datetime.strptime('2023-10-15', '%Y-%m-%d')
    )
    two = Task(
        freelancerId = 1,
        clientId = 3,
        description = "Send invoice",
        priority = "High",
        completed = True,
        due_date=datetime.strptime('2023-09-15', '%Y-%m-%d')
    )
    three = Task(
        freelancerId = 1,
        clientId = 5,
        description = "Feed dogs",
        priority = "Low",
        completed = False,
        due_date=datetime.strptime('2023-10-10', '%Y-%m-%d')
    )
    four = Task(
        freelancerId = 4,
        clientId = 5,
        description = "Commit Arson",
        priority = "Med",
        completed = False,
        due_date = datetime.strptime('2023-10-31', '%Y-%m-%d')
    )


    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
