import '../styles/Gallery.css';

const Gallery = ({ addresses, removeAddress }) => {


    return (
        <div className='gallery' id='gallery'>
            {addresses.map((curr, _index) => (
                <div className='address-box' key={_index}>
                    <div className='location'>
                        <img src={require('../images/marker.png')} />
                        <h1>{curr.name}</h1>
                    </div>
                    <div className='time'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='currentColor'>
                            <path d="M20.56,3.34a1,1,0,0,0-1-.08l-17,8a1,1,0,0,0-.57.92,1,1,0,0,0,.6.9L8,15.45v6.72L13.84,18l4.76,2.08a.93.93,0,0,0,.4.09,1,1,0,0,0,.52-.15,1,1,0,0,0,.48-.79l1-15A1,1,0,0,0,20.56,3.34ZM18.1,17.68l-5.27-2.31L16,9.17,8.35,13.42,5.42,12.13,18.89,5.79Z"></path>
                        </svg>
                        <p>{"" + Math.floor(curr.drivingTime / 60) + " min"}</p>
                    </div>
                    <div className="navigate-deck">
                        <div className="navigate">
                            <a target="_blank" href={''}>
                                <img className="logo" src={require("../images/waze.png")} />
                            </a>
                            <a target="_blank" href={''}>
                                <img className="logo" src={require("../images/google-maps.png")} />
                            </a>
                            <a target="_blank" href={''}>
                                <img className="logo" src={require("../images/apple.png")} />
                            </a>
                            <a className="delete" onClick={() => removeAddress(curr.latLng)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><polyline points="3 6 5 6 21 6"></polyline> <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                            </a>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default Gallery;