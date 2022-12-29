import { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import ttapi from "@tomtom-international/web-sdk-services";
import "./App.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import List from "./List";
import Map from "./Map";
import Navbar from "./Navbar";

const App = () => {
  const [map, setMap] = useState({});
  const [latitude, setLatitude] = useState(32.0777);
  const [longitude, setLongitude] = useState(34.77448);
  const [destinations, setDestinations] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const origin = {
    lng: longitude,
    lat: latitude,
  };

  /// Set map and handle map dragging
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

    setMap(map);

    const addMarker = () => {
      const popupOffset = { bottom: [0, -25] };

      const popup = new tt.Popup({
        offset: popupOffset,
      }).setHTML("This is You!");

      const element = document.createElement("div");
      element.className = "marker";

      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
        .setLngLat([longitude, latitude])
        .addTo(map);

      /*marker.on('dragend', () => {
        const lngLat = marker.getLngLat();
        setLongitude(lngLat.lng);
        setLatitude(lngLat.lat);
      })*/

      marker.setPopup(popup).togglePopup();
    };

    addMarker();

    return () => map.remove();
  }, [longitude, latitude]);

  useEffect(() => {
    if (destinations.length > 0)
     recalculateRoutes();
  }, [destinations]);

  const recalculateRoutes = () => {
    console.log('recalculate')
    sortAddresses().then((res) => {
      setAddresses(res);

      const locations = res.map((curr) => {
        return curr.latLng;
      });

      locations.unshift(origin);

      ttapi.services
        .calculateRoute({
          key: "GTJ7RFG5DS8CVoFHKyGsvmoys35G6KMT",
          locations: locations,
        })
        .then((routeData) => {
          const geoJson = routeData.toGeoJson();
          drawRoute(geoJson, map);
        });
    });
  };

  const addDest = async (event) => {
    event.preventDefault();
    document.getElementById('textbox').placeholder = '';

    let inputAddress = event.target[0].value;
    let call = await fetch(
      "http://www.mapquestapi.com/geocoding/v1/address?key=cnU92uvDR2KXPibdVGb7aGVYPikbqnV4&location=" +
        inputAddress
    );
    let res = await call.json();

    const address = {
      name: inputAddress,
      latLng: res.results[0].locations[0].latLng,
    };

    setDestinations((prev) => [...prev, address]);
    addDeliveryMarker(address.latLng, map);

  };

  const drawRoute = (geoJson, map) => {
    if (map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }

    map.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geoJson,
      },
      paint: {
        "line-color": "blue",
        "line-width": 4,
      },
    });
  };

  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      },
    };
  };

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement("div");
    element.className = "marker-delivery";
    element.id = lngLat.lat + ',' + lngLat.lng;

    new tt.Marker({
      element: element,
    })
      .setLngLat(lngLat)
      .addTo(map);
  };

  const sortAddresses = () => {
    const pointsForDestinations = destinations.map((curr) => {
      return convertToPoints(curr.latLng);
    });

    const callParameters = {
      key: "GTJ7RFG5DS8CVoFHKyGsvmoys35G6KMT",
      destinations: pointsForDestinations,
      origins: [convertToPoints(origin)],
    };

    return new Promise((resolve, reject) => {
      ttapi.services.matrixRouting(callParameters).then((matrixAPIResults) => {
        const results = matrixAPIResults.matrix[0];
        const resultsArray = results.map((result, index) => {
          return {
            name: destinations[index].name,
            latLng: destinations[index].latLng,
            drivingtime: result.response.routeSummary.travelTimeInSeconds,
          };
        });

        resultsArray.sort((a, b) => {
          return a.drivingtime - b.drivingtime;
        });

        const sortedLocations = resultsArray.map((result) => {
          return result.location;
        });

        setAddresses(resultsArray);
        resolve(resultsArray);
      });
    });
  };

  const removeAddress = (latLng) => {
    const tempDest = [...destinations].filter((curr) => {
      return curr.latLng.lat !== latLng.lat && curr.latLng.lng !== latLng.lng;
    });

    const tempAddresses = [...addresses].filter((curr) => {
      return curr.latLng.lat !== latLng.lat && curr.latLng.lng !== latLng.lng;
    });

    setDestinations(tempDest);
    setAddresses(tempAddresses);

    if (tempDest.length === 0) {
      removeMarker(latLng)
    }

  };

  const removeMarker = (latLng) => {
    const element = document.getElementById(latLng.lat + ',' + latLng.lng);
    element.remove();

    if (map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }

  }

  return (
    <>
      <Navbar />
      {map && (
        <div className="App">
          <Map />
          <div className="background">
            <div className="main">
              <h1>Where to ?</h1>
              <form onSubmit={(e) => addDest(e)}>
                <input
                  className="textbox"
                  id="textbox"
                  type="text"
                  placeholder="Enter address"
                />
                <button className="btn" type="submit" >Submit</button>
              </form>
              {addresses && <List addresses={addresses} removeAddress={removeAddress}/>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
