import "../styles/Gallery.css";

const Gallery = ({ addresses, removeAddress }) => {
  return (
    <div className="gallery-wrapper">
      <div className="gallery" id="gallery">
        {addresses.map((curr, _index) => (
          <div className="address-box" key={_index}>
            <div className="location">
              <i className="ri-map-pin-2-line"></i>
              <h1>{curr.name}</h1>
            </div>
            <div className="time">
              <i className="ri-time-line"></i>
              <p>{"" + Math.floor(curr.drivingTime / 60) + " min"}</p>
            </div>
            <div className="navigate-deck">
              <div className="navigate">
                <a
                  target="_blank"
                  href={
                    "https://www.waze.com/live-map/directions?navigate=yes&to=ll." +
                    curr.latLng.lat +
                    "%2C" +
                    curr.latLng.lng
                  }
                >
                  <img className="logo" src={require("../images/waze.png")} />
                </a>
                <a
                  target="_blank"
                  href={
                    "https://maps.google.com/?ll=" +
                    curr.latLng.lat +
                    "," +
                    curr.latLng.lng
                  }
                >
                  <img
                    className="logo"
                    src={require("../images/google-maps.png")}
                  />
                </a>
                <a
                  target="_blank"
                  href={
                    "http://maps.apple.com/?ll=" +
                    curr.latLng.lat +
                    "," +
                    curr.latLng.lng
                  }
                >
                  <img className="logo" src={require("../images/apple.png")} />
                </a>
                <a
                  className="delete"
                  onClick={() => removeAddress(curr.latLng)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>{" "}
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
