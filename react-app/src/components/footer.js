import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () =>{
    return  (
        <div className="landingFooter">
            <p className="componentTitle"> Christine Parsons
            &nbsp; &nbsp;
            <a href="https://github.com/cparsons9712/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} />

            </a>
            &nbsp; &nbsp;
            <a href="https://www.linkedin.com/in/christine-parsons-498b046a/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin}
            />
            </a>
            </p>

            <div className="alignRight"><a href="https://www.flaticon.com/free-icons/notepad" target="_blank" rel="noreferrer" title="notepad icons" >Icons created by Smashicons</a></div>

        </div>
    )
}
export default Footer
