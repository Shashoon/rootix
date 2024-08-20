import { useState } from "react";
import Help from "./Help";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const toggleHelp = () => {
    // setIsHelpVisible(!isHelpVisible);

    // const toggleSearchBar = () => {
    const element = document.getElementById("search-bar");

    if (window.getComputedStyle(element).display === "flex")
      element.style.display = "none";
    else element.style.display = "flex";
    // }
  };

  return (
    <div className="navbar">
      <div className="title">Rootix</div>
      <div className="navbar-btn" onClick={toggleHelp}>
        {/* <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M10.6 16q0-2.025.363-2.913q.362-.887 1.537-1.937q1.025-.9 1.562-1.563q.538-.662.538-1.512q0-1.025-.687-1.7Q13.225 5.7 12 5.7q-1.275 0-1.938.775q-.662.775-.937 1.575L6.55 6.95q.525-1.6 1.925-2.775Q9.875 3 12 3q2.625 0 4.038 1.463q1.412 1.462 1.412 3.512q0 1.25-.537 2.138q-.538.887-1.688 2.012Q14 13.3 13.738 13.912q-.263.613-.263 2.088Zm1.4 6q-.825 0-1.412-.587Q10 20.825 10 20q0-.825.588-1.413Q11.175 18 12 18t1.413.587Q14 19.175 14 20q0 .825-.587 1.413Q12.825 22 12 22Z" /></svg> */}
        <i className="ri-add-line"></i>
      </div>
      {isHelpVisible ? <Help /> : null}
    </div>
  );
};

export default Navbar;
