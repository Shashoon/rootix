import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import "../styles/List.css";

const List = ({ addresses, handleVisitedAddress, removeAddress }) => {

  return (
    <div className="list">
      {addresses.map((curr, _index) => {
        return (
          <div key={_index} className="address" id={_index}>
            <div className="index">
              <input
                type="checkbox"
                className="checkbox"
                checked={curr.isVisited}
                onChange={() => handleVisitedAddress(_index)}
              />
            </div>
            <div className="name">
              {curr.name}
              <a className="time">
                {" (" + Math.floor(curr.drivingTime / 60) + " min)"}
              </a>
            </div>
            <div className="navigate-deck">
              <div className="navigate">
                <a target="_blank" href={"https://www.waze.com/live-map/directions?navigate=yes&to=ll." + curr.latLng.lat + "%2C" + curr.latLng.lng}>
                  <img className="logo" src={require("../images/waze.png")} />
                </a>
                <a target="_blank" href={"https://maps.google.com/?ll=" + curr.latLng.lat + "," + curr.latLng.lng}>
                  <img className="logo" src={require("../images/google-maps.png")} />
                </a>
                <a target="_blank" href={"http://maps.apple.com/?ll=" + curr.latLng.lat + "," + curr.latLng.lng}>
                  <img className="logo" src={require("../images/apple.png")} />
                </a>
                <a className="delete" onClick={() => removeAddress(curr.latLng)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><polyline points="3 6 5 6 21 6"></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </a>
              </div>
              <a className="nav-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-three-dots" viewBox="0 0 22 22"><path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" /> </svg>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;

/*<table cellSpacing={0}>
                <thead className="table-header">
                    <tr>
                        <th>Stop No.</th>
                        <th className="header-address">Address</th>
                        <th>Navigate</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map((curr, _index) => {
                        return (
                            <tr key={_index} className="address">
                                <div className="index">
                                    <input type="radio" className='checkbox' />
                                    {_index + 1}</div>
                                <div className="name">
                                    {curr.name}
                                </div>
                                <div className="navigate">
                                    <a href={'https://www.waze.com/live-map/directions?navigate=yes&to=ll.' + curr.latLng.lat + '%2C' + curr.latLng.lng}>
                                        <img className='logo' src={require('./Images/waze.png')} />
                                    </a>
                                    <a href={'https://maps.google.com/?ll=' + curr.latLng.lat + ',' + curr.latLng.lng}>
                                        <img className='logo' src={require('./Images/google-maps.png')} />
                                    </a>
                                    <a href={'http://maps.apple.com/?ll=' + curr.latLng.lat + ',' + curr.latLng.lng}>
                                        <img className='logo' src={require('./Images/apple.png')} />
                                    </a>
                                </div>
                            </tr>
                        );
                    })}
                </tbody>
            </table>*/
