from app.models import db, User, environment, SCHEMA, Client
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
      email='demo@aa.io', password='password', firstName="Guest", lastName="User", phoneNumber="5551234567", authLevel=1, aboutMe= "I am a professional developer making cool websites", title="Web Developer"
    )
    marnie = User(
         email='client1@email.com', password='password', firstName="Karry", lastName="Wilson", phoneNumber="5551234567", authLevel=0
    )
    jerry = User(
         email='client2@email.com', password='password', firstName="Jerry", lastName="Bolden", phoneNumber="5551234567", authLevel=0
    )
    marie = User(
         email='client3@email.com', password='password', firstName="Marie", lastName="Goldeen", phoneNumber="5551234567", authLevel=0
    )
    joe = User(
         email='client4@email.com', password='password', firstName="Joe", lastName="White", phoneNumber="5551234567", authLevel=0
    )
    demoClient = User(
        email='demo@email.com', password='password', firstName="Guest", lastName="Client", phoneNumber="0001234567", authLevel=0
    )



    bobby = User(
        email='bobbyboi@email.com', password='password', firstName="Bobby", lastName="Jones", phoneNumber="5551234567", authLevel=1, aboutMe= "Give me duck tape and I can fix the world", title="Handy Man"
    )
    amanda = User(
        email='kitkat@email.com', password='password', firstName="Amanda", lastName="Jones", phoneNumber="5551234567", authLevel=1, aboutMe= "I can make your dollars stretch further than you would ever believe", title="Accountant"
    )
    nancy = User(
        email='nancyf@email.com', password='password', firstName="Nancy", lastName="Freeman", phoneNumber="5551234567", authLevel=1, aboutMe= "I can turn your yard into the garden of Edan", title="Landscaper"
    )
    landen = User(
        email='landentower@email.com', password='password', firstName="Landen", lastName="Townsend", phoneNumber="5551234567", authLevel=1, aboutMe= "Want a memior? I'll write it for you.", title="Copywriter"
    )

    a = Client(freelancerId = 1, clientId = 2)
    b = Client(freelancerId = 1, clientId = 3)
    c = Client(freelancerId = 1, clientId = 5)
    d = Client(freelancerId = 8, clientId = 6)
    e = Client(freelancerId = 6, clientId = 10)


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(jerry)
    db.session.add(bobby)
    db.session.add(marie)
    db.session.add(joe)
    db.session.add(amanda)
    db.session.add(nancy)
    db.session.add(landen)
    db.session.add(demoClient)

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
        db.session.execute(f"TRUNCATE table {SCHEMA}.clients RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM clients"))

    db.session.commit()
