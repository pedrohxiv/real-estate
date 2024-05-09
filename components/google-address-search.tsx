"use client";

import { MapPin } from "lucide-react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

import type { AddressType, CoordinatesType } from "@/types";

interface GoogleAddressSearchProps {
  setAddress: (value: AddressType | null) => void;
  setCoordinates: (value: CoordinatesType | null) => void;
}

export const GoogleAddressSearch = ({
  setAddress,
  setCoordinates,
}: GoogleAddressSearchProps) => {
  return (
    <div className="flex items-center w-full">
      <MapPin className="h-[38px] w-[38px] p-2 rounded-l-md text-primary border border-r-0 border-[#1f085e] bg-purple-400/20" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}
        selectProps={{
          placeholder: "Search property address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            if (!place) {
              setAddress(null);
              setCoordinates(null);
              return;
            }

            geocodeByAddress(place.label)
              .then((result) => getLatLng(result[0]))
              .then(({ lat, lng }) => {
                setAddress(place);
                setCoordinates({ lat, lng });
              });
          },
          styles: {
            control: (provided) => ({
              ...provided,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderTopRightRadius: 6,
              borderBottomRightRadius: 6,
              boxShadow: "none",
              borderLeft: 0,
              borderColor: "#1f085e",
              ":hover": {
                borderColor: "#1f085e",
              },
            }),
            valueContainer: (provided) => ({
              ...provided,
              cursor: "text",
            }),
            indicatorsContainer: (provided) => ({
              ...provided,
              cursor: "pointer",
            }),
            option: (provided, { isFocused }) => ({
              ...provided,
              backgroundColor: isFocused ? "#e9d5ff" : "",
              ":hover": {
                cursor: "pointer",
              },
            }),
          },
          autoFocus: true,
        }}
      />
    </div>
  );
};
