import SignupFormPage from "../SignupFormPage"
import './LandingPage.css'

function LandingPage(){

    return (
    <div className="landingCont">
        <div className="landingHeader">
          <h1>Your Village Starts Here!</h1>
          <p>Life is easier with support. Find the perfect person to help with any aspect of your life.</p>
        </div>

        <div className="landingBenefits">
          <h2>Why Choose Our Freelance Marketplace?</h2>
          <ul>
            <li>Access a diverse community of skilled freelancers.</li>
            <li>Get help with any problem, big or small.</li>
            <li>Effortlessly manage your projects and workloads.</li>
            <li>Find support for any discipline or task.</li>
          </ul>
        </div>

        <div className="landingSignUp">
          <h3>Ready to Find Support?</h3>
          <p>Sign up today and discover how easy it is to get the assistance you need.</p>
          <SignupFormPage />
        </div>

        <div className="landingTestimonials">
          <h2>What Our Users Say</h2>
          <div className="testimonial">
            <blockquote>
              "I found an amazing freelancer here who transformed my project. Highly recommended!"
            </blockquote>
            <p>- Jane Doe, satisfied client</p>
          </div>
          <div className="testimonial">
            <blockquote>
              "As a freelancer, this platform has connected me with valuable clients and streamlined my workflow."
            </blockquote>
            <p>- John Smith, successful freelancer</p>
          </div>
        </div>
      </div>
    )
}

export default LandingPage