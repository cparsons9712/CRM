from app.models import db, User, environment, SCHEMA, Client
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='ImaBigKidNow', email='demo@aa.io', password='password', firstName="Tristan", lastName="Huckabee", phoneNumber="5551234567", authLevel=1, aboutMe= "I like to code so much I teach it!!! ohh noo sunlight my nemesis", title="Web Developer"
    )
    marnie = User(
        username='ChristmasGal', email='christmas@gmail.com', password='password', firstName="Karry", lastName="Wilson", phoneNumber="5551234567", authLevel=0
    )
    jerry = User(
        username='FisherBoi', email='fishingLife@email.com', password='password', firstName="Jerry", lastName="Bolden", phoneNumber="5551234567", authLevel=0
    )


    bobby = User(
        username='bigbobby', email='bobbyboi@email.com', password='password', firstName="Bobby", lastName="Jones", phoneNumber="5551234567", authLevel=1, aboutMe= "Give me duck tape and I can fix the world", title="Handy Man"
    )

    marie = User(
        username='darknessIncarnate', email='easyNightmares@gmail.com', password='password', firstName="Marie", lastName="Goldeen", phoneNumber="5551234567", authLevel=0
    )
    joe = User(
        username='bigTruckRuck', email='saltLyfe@email.com', password='password', firstName="Joe", lastName="White", phoneNumber="5551234567", authLevel=0
    )

    a = Client(freelancerId = 1, clientId = 2)
    b = Client(freelancerId = 1, clientId = 3)
    c = Client(freelancerId = 4, clientId = 5)
    d = Client(freelancerId = 4, clientId = 6)
    e = Client(freelancerId = 1, clientId = 5)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(jerry)
    db.session.add(bobby)
    db.session.add(marie)
    db.session.add(joe)

    db.session.add(a)
    db.session.add(b)
    db.session.add(c)
    db.session.add(d)
    db.session.add(e)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
