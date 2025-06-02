import travellerapp from '../assets/travellerapp.png';

function Header () {

    return (
        <>
        <nav>
            <img style={{marginTop:"10px"}} src={travellerapp} width="1000px" height="400px" alt="" />
        </nav>
        </>
    );
}

export default Header;