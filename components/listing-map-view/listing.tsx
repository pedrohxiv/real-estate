import Image from "next/image";

import type { ListingType } from "@/types";
import { BathIcon, BedDouble, MapIcon, Ruler } from "lucide-react";

interface ListingProps {
  listing?: ListingType[];
}

export const Listing = ({ listing }: ListingProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {listing?.map((item, index) => (
        <div
          key={index}
          className="p-3 hover:opacity-85 cursor-pointer rounded-lg"
        >
          <Image
            src={item.listing_images![0].url}
            height={170}
            width={800}
            alt={`Listing ${index}`}
            className="rounded-lg object-cover h-[170px]"
          />
          <div className="flex mt-2 flex-col gap-2">
            <h2 className="font-bold text-xl">${item.price}</h2>
            <h6 className="flex gap-2 text-sm text-gray-400 items-center">
              <MapIcon className="h-8 w-8" />
              {item.address}
            </h6>
            <div className="flex gap-2 mt-2 justify-between">
              <p className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                <BedDouble className="h-4 w-4" />
                {item.bedroom}
              </p>
              <p className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                <BathIcon className="h-4 w-4" />
                {item.bathroom}
              </p>
              <p className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-500 justify-center items-center">
                <Ruler className="h-4 w-4" />
                {item.area}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
