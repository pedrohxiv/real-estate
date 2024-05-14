import {
  Bath,
  BedDouble,
  CarFront,
  Drill,
  Home,
  LandPlot,
  MapPin,
  Share,
} from "lucide-react";
import Image from "next/image";

import { Map } from "@/components/listing-map-view/map";
import { Button } from "@/components/ui/button";
import type { ListingType } from "@/types";

interface DetailsProps {
  listingDetails?: ListingType;
}

export const Details = ({ listingDetails }: DetailsProps) => {
  return (
    listingDetails && (
      <div className="flex flex-col gap-2 my-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-3xl">${listingDetails.price}</h2>
            <div className="flex flex-row items-center gap-2 mt-2 text-gray-400">
              <MapPin className="w-5 h-5" />
              <h6 className="truncate">{listingDetails.address}</h6>
            </div>
          </div>
          <Button className="flex gap-2">
            <Share /> Share
          </Button>
        </div>
        <hr />
        <div className="flex flex-col gap-3 mt-4">
          <h3 className="font-bold text-2xl">Key Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <p className="flex gap-2 text-sm bg-purple-100 rounded-lg p-3 w-full text-primary justify-center items-center">
              <Home className="h-4 w-4" />
              {listingDetails.property_type}
            </p>
            <p className="flex gap-2 text-sm bg-purple-100 rounded-lg p-3 w-full text-primary justify-center items-center">
              <Drill className="h-4 w-4" />
              Built In {listingDetails.built_in}
            </p>
            <p className="flex gap-2 text-sm bg-purple-100 rounded-lg p-3 w-full text-primary justify-center items-center">
              <LandPlot className="h-4 w-4" />
              {listingDetails.area}
            </p>
            <p className="flex gap-2 text-sm bg-purple-100 rounded-lg p-3 w-full text-primary justify-center items-center">
              <BedDouble className="h-4 w-4" />
              {listingDetails.bedroom} Bed
            </p>
            <p className="flex gap-2 text-sm bg-purple-100 rounded-lg p-3 w-full text-primary justify-center items-center">
              <Bath className="h-4 w-4" />
              {listingDetails.bathroom} Bath
            </p>
            <p className="flex gap-2 text-sm bg-purple-100 rounded-lg p-3 w-full text-primary justify-center items-center">
              <CarFront className="h-4 w-4" />
              {listingDetails.parking} Parking
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-2xl">What&apos;s Special</h3>
          <p className="text-gray-600">{listingDetails.description}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-2xl">Find on Map</h3>
          <Map
            coordinates={listingDetails.coordinates}
            listing={[listingDetails]}
          />
        </div>
        <div className="mt-4">
          <h3 className="font-bold text-2xl">Contact Agent</h3>
          <div className="flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border my-6">
            <div className="flex items-center gap-6">
              <Image
                src={listingDetails.profile_image!}
                alt="Profile image"
                height={60}
                width={60}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">
                  {listingDetails.full_name}
                </h2>
                <h2 className="text-gray-500">{listingDetails.created_by}</h2>
              </div>
            </div>
            <Button>Send Message</Button>
          </div>
        </div>
      </div>
    )
  );
};
