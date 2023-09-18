from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text



def seed_messages():
    one = Message(
        to_id = 2,
        from_id = 1,
        message = "Good Evening! I need to get approvals for the wireframes. Is there a good time to talk about it?"

    )
    oneb = Message(
        to_id = 1,
        from_id = 2,
        message = "Yes, I am avaliable on the 25th pretty much anytime. I'll look at your calender and book an appointment."
    )

    two = Message(
        to_id = 1,
        from_id = 3,
        message = "Can I get an estimate for adding a new feature? I have a really good idea"

    )
    three = Message(
        to_id = 4,
        from_id = 5,
        message = "Thank you for fixing our window the other day! I am going to be sure to recommend you to everyone I know!",
        addressed= True

    )
    four = Message(
        to_id = 4,
        from_id = 6,
        message = "Hi, I have heard good things about you from my buddy. Can I get with you about some things I need help with around my house?"
    )

    db.session.add(one)
    db.session.add(oneb)
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
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))

    db.session.commit()
