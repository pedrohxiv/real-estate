import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";

import { CoordinatesType } from "@/types";

interface MapProps {
  coordinates?: CoordinatesType | null;
}

export const Map = ({ coordinates }: MapProps) => {
  const [center, setCenter] = useState({
    lat: -23.5557714,
    lng: -46.6395571,
  });
  const [map, setMap] = useState(null);

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
    <div className="fixed right-10 h-full p-3 md:w-[350px] lg:w-[450px] xl:w-[600px] 2xl:w-[700px]">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "75vh",
          borderRadius: 10,
        }}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </div>
  );
};
