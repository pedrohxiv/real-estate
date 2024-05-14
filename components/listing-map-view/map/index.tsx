import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

import type { CoordinatesType, ListingType } from "@/types";

import { Marker } from "./marker";

interface MapProps {
  coordinates?: CoordinatesType | null;
  listing?: ListingType[];
}

export const Map = ({ coordinates, listing }: MapProps) => {
  const [center, setCenter] = useState({
    lat: -23.5557714,
    lng: -46.6395571,
  });
  const [_, setMap] = useState(null);

  const onLoad = useCallback((map: any) => {
    const bounds = new window.google.maps.LatLngBounds(center);

    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    coordinates && setCenter(coordinates);
  }, [coordinates]);

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "75vh",
        position: "fixed",
        right: 0,
        marginTop: 12,
        borderRadius: 10,
      }}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {listing &&
        listing.map((item, index) => <Marker key={index} item={item} />)}
    </GoogleMap>
  );
};
