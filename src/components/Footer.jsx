import { Link } from 'react-router-dom';
import './Responsive.css';


function Footer () {

    return (
        <footer>
            <p>
                <Link to='/about'>About</Link>
                 <span>&#20;|&#20;</span> 
                 <Link to='/questions'>FAQ</Link>
                  <span>&#20;|&#20;</span> 
                 <Link to='/contact'>Contact Us</Link>
                  <span>&#20;|&#20;</span> 
                  <Link to='/terms'>Terms & Conditions</Link>
                  </p>
        </footer>
    );
}

export default Footer;