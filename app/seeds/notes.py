from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text



def seed_notes():
    one = Note(
        freelancerId = 1,
        clientId = 2,
        text = "LM - asked to call me back"
    )
    oneb = Note(
        freelancerId = 1,
        clientId = 2,
        text = "Need to recieve down payment for services"
    )

    two = Note(
        freelancerId = 1,
        clientId = 3,
        text = "Need approval for wireframe"
    )
    three = Note(
        freelancerId = 1,
        clientId = 5,
        text = "Had consultation, will get back to me about estimate"
    )
    four = Note(
        freelancerId = 4,
        clientId = 5,
        text = "When fixing door mentioned might need fencing done. requires follow up"
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
def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
