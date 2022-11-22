import { React, useState, useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import ttapi from "@tomtom-international/web-sdk-services";
import "@tomtom-international/web-sdk-maps/dist/maps.css";

const Map = () => {
    const [map, setMap] = useState({});
    const [latitude, setLatitude] = useState(32.0777);
    const [longitude, setLongitude] = useState(34.77448);

    const origin = {
        lng: longitude,
        lat: latitude,
    };

    useEffect(() => {
        const map = tt.map({
            key: "GTJ7RFG5DS8CVoFHKyGsvmoys35G6KMT",
            container: "mapElement",
            center: [longitude, latitude],
            stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true,
            },
            zoom: 14,
        });

        return () => map.remove();
    }, []);

    return (
        <div className="map-wrapper">
            {map && <div id="mapElement" className="map" />}
        </div>
    );
};

export default Map;