import '../styles/Gallery.css';

const Gallery = () => {


    return (
        <div className='gallery'>
            <div className='address-box'>
                <div className='location'>
                    <img src={require('../images/marker.png')} />
                    <h1>Dizzengof 42, Tel Aviv</h1>
                </div>
                <p>Diriving Time: 56 min</p>
            </div>
        </div>
    )
}

export default Gallery;