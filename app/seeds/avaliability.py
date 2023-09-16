from app.models import db, Availability, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import time



def seed_availability():
    mon1 = Availability(
        userId = 1,
        dayOfWeek = 'Monday',
        startTime = time(13, 0, 0),
        endTime = time(23,0,0)
    )
    tues1 = Availability(
        userId = 1,
        dayOfWeek = 'Tuesday',
        startTime =time(13, 0, 0),
        endTime = time(23, 0, 0)
    )
    wed1 = Availability(
        userId = 1,
        dayOfWeek = 'Wednesday',
        startTime = time(13, 0, 0),
        endTime = time(23, 0, 0)

    )
    thurs1 = Availability(
        userId = 1,
        dayOfWeek = 'Thursday',
        startTime = time(13, 0, 0),
        endTime = time(23, 0, 0)

    )
    fri1 = Availability(
        userId = 1,
        dayOfWeek = 'Friday',
        startTime = time(13, 0, 0),
        endTime = time(23, 0, 0)
    )

    sat1 = Availability(
        userId = 1,
        dayOfWeek = 'Saturday',
        startTime = time(0, 0, 0),
        endTime = time(0, 0, 0)

    )
    sun1 = Availability(
        userId = 1,
        dayOfWeek = 'Sunday',
        startTime = time(0, 0, 0),
        endTime = time(0, 0, 0)
    )

    mon4 = Availability(
        userId = 4,
        dayOfWeek = 'Monday',
        startTime = time(8, 0, 0),
        endTime = time(16, 0, 0)
    )
    tues4 = Availability(
        userId = 4,
        dayOfWeek = 'Tuesday',
        startTime = time(8, 0, 0),
        endTime = time(16, 0, 0)
    )
    wed4 = Availability(
        userId = 4,
        dayOfWeek = 'Wednesday',
        startTime = time(8, 0, 0),
        endTime = time(16, 0, 0)
    )
    thurs4 = Availability(
        userId = 4,
        dayOfWeek = 'Thursday',
        startTime = time(8, 0, 0),
        endTime = time(16, 0, 0)
    )
    fri4 = Availability(
        userId = 4,
        dayOfWeek = 'Friday',
        startTime = time(8, 0, 0),
        endTime = time(16, 0, 0)
    )

    sat4 = Availability(
        userId = 4,
        dayOfWeek = 'Saturday',
        startTime = time(8, 0, 0),
        endTime = time(16, 0, 0)
    )
    sun4 = Availability(
        userId = 4,
        dayOfWeek = 'Sunday',
        startTime = time(8, 0, 0),
        endTime = time(16, 0, 0)
    )


    db.session.add(mon1)
    db.session.add(tues1)
    db.session.add(wed1)
    db.session.add(thurs1)
    db.session.add(fri1)
    db.session.add(sat1)
    db.session.add(sun1)
    db.session.add(mon4)
    db.session.add(tues4)
    db.session.add(wed4)
    db.session.add(thurs4)
    db.session.add(fri4)
    db.session.add(sat4)
    db.session.add(sun4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_availability():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.availability RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM availability"))

    db.session.commit()
