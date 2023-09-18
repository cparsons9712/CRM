from app.models import db, Service, environment, SCHEMA
from sqlalchemy.sql import text



def seed_services():
    one = Service(
        freelancerId= 1,
        name= "Custom Software",
        description= "Companies opt for webapps over traditional software because of their development speed and flexibility. We can build your custom software product through prototyping, development, and optimization.",

    )
    oneb = Service(
        freelancerId= 1,
        name= "Custom E-commerce",
        description= "eCommerce web apps allow your customers or staff to configure and setup complex orders either with the product or service itself or through the elements of the checkout process.",

    )

    two = Service(
        freelancerId= 1,
        name= "Furniture Assembly",
        description= "Do you need help assembling that newly delivered furniture? Or want to move your other furniture and need help? Rest assured, I will help you. Get in touch for more information and pricing.",

    )
    three = Service(
        freelancerId= 4,
        name= "Maintenance Repairs",
        description= "Have a minor broken item in your house you need fixed? Give me a call and I'll head out and set you straight. From door frames to bikes I'll fix it.",

    )
    four = Service(
        freelancerId= 4,
        name= "Painting Services",
        description= "Do you want to paint your house but don't want to go through the work and save your time? Rest assured, my years of experience will leave your home looking amazing, without you taking any risks.",

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
def undo_services():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM services"))

    db.session.commit()
