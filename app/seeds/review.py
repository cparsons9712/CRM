from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text



def seed_reviews():
    one = Review(
    freelancerId = 1,
    clientId = 2,
    stars = 5,
    text= "Fantastic guy to work with!",
    )
    oneb = Review(
    freelancerId = 1,
    clientId = 3,
    stars = 5,
    text= "He produces top quality stuff",
    )
    two = Review(
    freelancerId = 4 ,
    clientId = 5,
    stars = 4,
    text= "Did a great job painting for me but did track some mud in the house",
    )


    db.session.add(one)
    db.session.add(oneb)
    db.session.add(two)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
