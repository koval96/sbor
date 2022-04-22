import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

export const MapDiv = (props) => {
  const [mapCenter, setMapCenter] = useState([56.326887, 44.005986]);

  const mapState = {
    center: mapCenter,
    zoom: 11,
  };

  return (
    <div>
      <YMaps
        query={{
          apikey: "83253a05-8a17-4325-b40c-2c5a1e3917c0",
          ns: "ymaps",
        }}
      >
        <Map
          state={mapState}
          modules={["geolocation", "geocode"]}
        >


          <Placemark geometry={[56.326887, 44.005986]} />
        </Map>

      </YMaps>
    </div>
  );
};
