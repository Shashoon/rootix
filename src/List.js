import './List.css';


const List = ({ addresses, removeAddress }) => {

    return (
        <div className="list">
            <div className='header'>
                <div>Stop No.</div>
                <div>Address</div>
                <div>Navigate</div>
            </div>
            <div className=''>
                {addresses.map((curr, _index) => {
                    return (
                        <div key={_index} className="address">
                            <input type="checkbox" className='checkbox' />
                            <div className="index">
                                {_index + 1}
                            </div>
                            <div className="name">
                                {curr.name}
                            </div>
                            <div className="navigate">
                                <a target='_blank' href={'https://www.waze.com/live-map/directions?navigate=yes&to=ll.' + curr.latLng.lat + '%2C' + curr.latLng.lng}>
                                    <img className='logo' src={require('./Images/waze.png')} />
                                </a>
                                <a target='_blank' href={'https://maps.google.com/?ll=' + curr.latLng.lat + ',' + curr.latLng.lng}>
                                    <img className='logo' src={require('./Images/google-maps.png')} />
                                </a>
                                <a target='_blank' href={'http://maps.apple.com/?ll=' + curr.latLng.lat + ',' + curr.latLng.lng}>
                                    <img className='logo' src={require('./Images/apple.png')} />
                                </a>
                                <a>
                                    <button onClick={() => removeAddress(curr.latLng)}>X</button>
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

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