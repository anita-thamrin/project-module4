import travellerapp from '../assets/travellerapp.png';
import './Responsive.css';

function Header () {

    return (
        <nav>
            <img className="header-image" src={travellerapp} alt="Travel App Header" />
        </nav>
    );
}

export default Header;