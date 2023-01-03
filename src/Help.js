import './Navbar.css'

const Help = ({toggleHelp}) => {


    return (
        <div className='modal'>
            <h3>About Rootix</h3>
            <p>
                Rootix is a website made to plan a route that goes through several destinations.
                The algorithm knows to take care of - traffic loads, departure times, blocked roads and more, all in real time.
                To start using the platform choose a city and address, then add the address number and search.
                The engine will automaticly update your route by the arriving time.
            </p>
        </div>
    )
}

export default Help;