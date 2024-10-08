import { useEffect, useRef, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import ttapi from "@tomtom-international/web-sdk-services";
import "./App.css";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import List from "./components/List";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";

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
    const currentLocation = navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      }
    );

    const map = tt.map({
      key: "GTJ7RFG5DS8CVoFHKyGsvmoys35G6KMT",
      container: "mapElement",
      center: [longitude, latitude],
      stylesVisibility: {
        trafficIncidents: true,
        trafficFlow: true,
      },
      zoom: 13,
    });

    setMap(map);

    const addMarker = () => {
      const popupOffset = { bottom: [0, -36] };

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
    if (destinations.length >= 1) recalculateRoutes();
  }, [destinations]);

  const recalculateRoutes = () => {
    console.log("try");
    sortAddresses().then((res) => {
      setAddresses(res);

      const locations = res.map((curr) => {
        return curr.latLng;
      });

      locations.unshift({
        lng: longitude,
        lat: latitude,
      });

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

  const addDest = async (inputAddress) => {
    // let call = await fetch(
    //   "http://www.mapquestapi.com/geocoding/v1/address?key=cnU92uvDR2KXPibdVGb7aGVYPikbqnV4&location=" +
    //     inputAddress
    // );

    let call = await ttapi.services
      .geocode({
        key: "GTJ7RFG5DS8CVoFHKyGsvmoys35G6KMT",
        query: inputAddress,
      })
      .then((res, err) => {
        if (err) return console.log(err);

        const address = {
          name: inputAddress,
          latLng: res.results[0].position,
        };

        setDestinations((prev) => [...prev, address]);
        addDeliveryMarker(address.latLng, map);
      });

    // let res = await call;
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
        "line-color": "dodgerblue",
        "line-width": 5,
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
    element.id = lngLat.lat + "," + lngLat.lng;
    console.log(destinations);
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
            drivingTime: result.response.routeSummary.travelTimeInSeconds,
            isVisited: false,
          };
        });

        resultsArray.sort((a, b) => {
          return a.drivingTime - b.drivingTime;
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
      removeMarker(latLng);
    }
  };

  const removeMarker = (latLng) => {
    const element = document.getElementById(latLng.lat + "," + latLng.lng);
    element?.remove();

    if (map.getLayer("route")) {
      map.removeLayer("route");
      map.removeSource("route");
    }
  };

  const handleVisitedAddress = (index) => {
    const temp = [...addresses];

    temp[index].isVisited = !temp[index].isVisited;

    if (temp[index].isVisited) {
      temp.push(temp.splice(index, 1)[0]);
    } else {
      temp.sort((a, b) => {
        return a.drivingTime - b.drivingTime;
      });

      temp.map((curr, _index) => {
        if (curr.isVisited) temp.push(temp.splice(_index, 1)[0]);
      });
    }

    setAddresses(temp);
  };

  return (
    <>
      {map && (
        <div className="App">
          <Map />
          <Navbar />
          <SearchBar addDest={addDest} />
          {addresses.length > 0 && (
            <Gallery addresses={addresses} removeAddress={removeAddress} />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;

/*<div className="background">
  <div className="main">

    <Search addDest={addDest} />
    {
      addresses &&
      <List addresses={addresses}
        handleVisitedAddress={handleVisitedAddress}
        removeAddress={removeAddress} />
    }
  </div>
</div>*/
