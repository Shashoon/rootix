import { useState } from 'react';
import Help from './Help';
import '../styles/Navbar.css'

const Navbar = () => {
    const [isHelpVisible, setIsHelpVisible] = useState(false);

    const toggleHelp = () => {
        setIsHelpVisible(!isHelpVisible);
    }

    return (
        <div className="navbar">
            <div className='title'>
                Rootix
            </div>
            <button className='btn' onClick={toggleHelp}>Help</button>
            {isHelpVisible ? <Help /> : null}
        </div>
    )

}

export default Navbar;