from app.models import db, Availability, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import time



def seed_availability():
    mon1 = Availability(
        userId = 1,

        monStartTime = time(13, 0, 0),
        monEndTime = time(23,0,0),

        tueStartTime = time(13, 0, 0),
        tueEndTime = time(23,0,0),

        wedStartTime = time(13, 0, 0),
        wedEndTime = time(23,0,0),

        thuStartTime = time(13, 0, 0),
        thuEndTime = time(23,0,0),

        friStartTime = time(13, 0, 0),
        friEndTime = time(23,0,0),

        satStartTime = time(0, 0, 0),
        satEndTime = time(0,0,0),

        sunStartTime = time(0, 0, 0),
        sunEndTime = time(0,0,0),
    )


    mon4 = Availability(
        userId = 4,

        monStartTime = time(0, 0, 0),
        monEndTime = time(0,0,0),

        tueStartTime = time(8, 0, 0),
        tueEndTime = time(16,0,0),

        wedStartTime = time(8, 0, 0),
        wedEndTime = time(16,0,0),

        thuStartTime = time(8, 0, 0),
        thuEndTime = time(16,0,0),

        friStartTime = time(8, 0, 0),
        friEndTime = time(16,0,0),

        satStartTime = time(8, 0, 0),
        satEndTime = time(16,0,0),

        sunStartTime = time(0, 0, 0),
        sunEndTime = time(0,0,0),
    )


    db.session.add(mon1)

    db.session.add(mon4)


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
