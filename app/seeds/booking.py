from app.models import db, Booking, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date, time



def seed_bookings():
    one = Booking(
     freelancerId = 1,
     clientId = 2,
     day = date(2023, 9, 30),
     time = time(20, 30, 00),
     endTime = time(21,00,00),
     duration = time(0, 30, 00),
     title = "Progress Meeting",
     location = "Zoom"
    )

    two = Booking(
     freelancerId = 1,
     clientId = 3,
     day = date(2023, 10, 15),
     time = time(21, 30, 00),
     endTime = time(22,00,00),
     duration = time(0, 30),
     title = "Initial consult",
     location = "Zoom"
    )
    three = Booking(
        freelancerId = 1,
        clientId = 5,
        day = date(2023, 10, 15),
        time = time(22, 30, 00),
        duration = time(1, 00),
        endTime = time(23,30,00),
        title = "Approval Meeting",
        location = "Zoom"
    )
    four = Booking(
     freelancerId = 4,
     clientId = 5,
     day = date(2023, 10, 14),
     time = time(10, 30, 00),
     duration = time(2, 30),
     endTime = time(13,00,00),
     title = "Fix Sink",
     location = "10 Main Street"
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
def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()
