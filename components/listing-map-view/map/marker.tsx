import { MarkerF, OverlayView } from "@react-google-maps/api";
import { BathIcon, BedDouble, MapPin, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ListingType } from "@/types";

interface MarkerProps {
  item: ListingType;
}

export const Marker = ({ item }: MarkerProps) => {
  const [selectedListing, setSelectedListing] = useState<ListingType | null>(
    null
  );

  return (
    <MarkerF
      onClick={() => setSelectedListing(item)}
      position={item.coordinates!}
      icon={{ url: "/pin.png" }}
    >
      {selectedListing && (
        <OverlayView
          position={selectedListing.coordinates}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="relative cursor-default rounded-lg w-[180px] bg-white">
            <X
              className="absolute right-0 top-0 mt-1 mr-1 h-4 w-4 cursor-pointer"
              onClick={() => setSelectedListing(null)}
            />
            <Image
              src={item.listing_images![0].url}
              height={120}
              width={180}
              alt={`Listing`}
              priority
              className="rounded-lg object-cover h-[120px] w-[180px]"
            />
            <div className="flex flex-col gap-2 p-2">
              <h2 className="font-bold text-lg">${item.price}</h2>
              <div className="flex flex-row items-center gap-1 text-sm text-gray-400">
                <div>
                  <MapPin className="w-5 h-5" />
                </div>
                <h6 className="truncate">{item.address}</h6>
              </div>
              <div className="flex gap-2 justify-between">
                <p className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                  <BedDouble className="h-4 w-4" />
                  {item.bedroom}
                </p>
                <p className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                  <BathIcon className="h-4 w-4" />
                  {item.bathroom}
                </p>
              </div>
              <Button size="sm">View Details</Button>
            </div>
          </div>
        </OverlayView>
      )}
    </MarkerF>
  );
};
