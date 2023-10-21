from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime



def seed_tasks():
    one = Task(
        freelancerId = 1,
        clientId = 2,
        title = "Finish seeding database",
        description = "Make 5 seed data objects for users, task, appointments, and notes",
        priority = "Med",
        completed = False,
        due_date=datetime.strptime('2023-11-15', '%Y-%m-%d')
    )
    two = Task(
        freelancerId = 1,
        clientId = 5,
        title = "Send invoice",
        description = "Invoice should be for creating the GoBabby site- A medium level ecommerence site completed on Sept 3 2023",
        priority = "High",
        completed = True,
        due_date=datetime.strptime('2023-11-15', '%Y-%m-%d')
    )
    three = Task(
        freelancerId = 1,
        clientId = 3,
        title = "Make chart component",
        description = "Need a pie chart that can take a lead dataset and break down how many resulted in different dollar amount percent wise. Like 0-$5/ 6-25/ 25-50/ 50+",
        priority = "Low",
        completed = False,
        due_date=datetime.strptime('2023-11-10', '%Y-%m-%d')
    )
    four = Task(
        freelancerId = 1,
        clientId = 5,
        title = "Commit Arson",
        description= "The user's account is past due. If the bills not paid by this date burn his house down! (not really!! just send him to collections)",
        priority = "Med",
        completed = False,
        due_date = datetime.strptime('2023-11-30', '%Y-%m-%d')
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
