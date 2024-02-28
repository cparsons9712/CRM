import React from "react";
import './LandingPage.css';
import dealImage from "../../images/Freelancer.webp"
import notepadImage from "../../images/notepad.png"
import calenderImage from "../../images/calendar.png"
import taskImage from "../../images/to-do-list.png"
import clientsImage from "../../images/clients.png"
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";


const LandingPage = () => {
  return (
    <div className="landingCont">


      <header className="landingHeader">

        <div className="headerText">

          <h1>Unlock Your Freelancing Potential</h1>
          <p>Supercharge your workflow with our CRM designed exclusively for freelancers.</p>
          <OpenModalButton
            id="headerSignUpButton"
            buttonText="Sign Up Today"
            modalComponent={<SignupFormModal />}
          />

        </div>

        <div className="headerImage">
          <img src={dealImage} alt="Freelancer shaking someones hand" />
        </div>

      </header>

      <div className="landingFeatures">
        <div className="landingSectionHead">We give you the tools you need to get things done</div>

        <div className="feature" id='f1'>
          <div className="featureImage">
            <img src={notepadImage} alt="Notes" />
          </div>
          <div className="featureText" >
            <h3>Take Notes</h3>
            <p>Take and organize notes specific to each client to remember important details.</p>
          </div>
        </div>

        <div className="feature" id='f2'>
          <div className="featureImage">
            <img src={taskImage} alt="Tasks" />
          </div>
          <div className="featureText">
            <h3>Task Management</h3>
            <p>Set due dates, priorities, and specify clientsto keep track of your to-dos.</p>
          </div>
        </div>


        <div className="feature" id='f3'>
          <div className="featureImage">
            <img src={calenderImage} alt="Booking" />
          </div>
          <div className="featureText">
            <h3>Booking & Scheduling</h3>
            <p>Effortlessly book appointments and manage your schedule.</p>
          </div>
        </div>


        <div className="feature" id='f4'>
          <div className="featureImage">
            <img  src={clientsImage} alt="Clients" />
          </div>
          <div className="featureText">
            <h3>Client Management</h3>
            <p>Add clients, track contact info, and see an overview of client-related data.</p>
          </div>
        </div>
      </div>

      <div className="landingTestimonials">
        <div className="landingSectionHead review testimonialTitle">But don't take our word for it</div>
        
        <div className="testimonialBlock">
          <div className="testimonial">
            <blockquote>
              "Before I struggled to keep track of everything, now I come into each day prepared!"
            </blockquote>
            <p>- Jess Pinn</p>
          </div>

          <div className="testimonial">
            <blockquote>
              "My life is infinitely easier thanks to Bantam. "
            </blockquote>
            <p>- Sandy Shru</p>
          </div>
          <div className="testimonial">
            <blockquote>
              "My productivity has gone THROUGH the roof!"
            </blockquote>
            <p>- Charlie Zard</p>
          </div>
          <div className="testimonial">
            <blockquote>
              "Thanks to the note feature my clients are impressed when I remember things "
            </blockquote>
            <p>- Luke Cario</p>
          </div>
        </div>
      </div>

      <div className="landingCTA">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of freelancers who have already transformed their work with our CRM.</p>
        <OpenModalButton
              buttonText="Sign Up Now!"
              modalComponent={<SignupFormModal />}
            />
      </div>


    </div>
  );
};

export default LandingPage;
