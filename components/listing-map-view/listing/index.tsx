import { BathIcon, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { GoogleAddressSearch } from "@/components/google-address-search";
import { Button } from "@/components/ui/button";
import type { AddressType, CoordinatesType, ListingType } from "@/types";

import { Filters } from "./filters";

interface ListingProps {
  listing?: ListingType[];
  handleSearch: (value: AddressType | null) => void;
  setBedCount: (value: string) => void;
  setBathCount: (value: string) => void;
  setParkingCount: (value: string) => void;
  setHomeType: (value: string) => void;
  setCoordinates: (value: CoordinatesType | null) => void;
}

export const Listing = ({
  listing,
  handleSearch,
  setBedCount,
  setBathCount,
  setParkingCount,
  setHomeType,
  setCoordinates,
}: ListingProps) => {
  const [address, setAddress] = useState<AddressType | null>(null);

  return (
    <div>
      <div className="flex flex-col gap-6 p-3">
        <GoogleAddressSearch
          setAddress={(value) => {
            setAddress(value);
            handleSearch(value);
          }}
          setCoordinates={(value) => setCoordinates(value)}
        />
        <div className="flex flex-row gap-3">
          <Filters
            setBedCount={setBedCount}
            setBathCount={setBathCount}
            setParkingCount={setParkingCount}
            setHomeType={setHomeType}
          />
          <Button className="gap-2" onClick={() => handleSearch(null)}>
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
      {!listing?.length ? (
        <div className="h-5 w-36 bg-slate-200 animate-pulse rounded-lg mx-3" />
      ) : (
        <p className="text-sm text-gray-400 truncate w-full px-3">
          Found{" "}
          <span className="text-primary font-bold">
            {listing.length > 999 ? "999+" : listing.length}
          </span>
          {listing.length > 1 ? " results" : " result"}
          {address ? (
            <>
              {" "}
              in <span className="text-primary font-bold">{address.label}</span>
            </>
          ) : (
            "."
          )}
        </p>
      )}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {!listing?.length ? (
          <>
            <ListingItemSkeleton />
            <ListingItemSkeleton />
            <ListingItemSkeleton />
            <ListingItemSkeleton />
            <ListingItemSkeleton />
          </>
        ) : (
          listing.map((item, index) => (
            <Link key={index} href={`/view-listing/${item.id}`}>
              <div className="p-3 hover:opacity-85 cursor-pointer rounded-lg">
                <Image
                  src={item.listing_images![0].url}
                  height={170}
                  width={800}
                  alt={`Listing ${index}`}
                  priority
                  className="rounded-lg object-cover h-[170px] w-[800px]"
                />
                <div className="flex mt-2 flex-col gap-2">
                  <h2 className="font-bold text-xl">${item.price}</h2>
                  <div className="flex flex-row items-center gap-2 text-sm text-gray-400">
                    <div>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h6 className="truncate">{item.address}</h6>
                  </div>
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
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export const ListingItemSkeleton = () => {
  return (
    <div className="flex flex-col m-2 mt-3 gap-3">
      <div className="h-[170px] w-full bg-slate-200 animate-pulse rounded-lg" />
      <div className="h-6 w-36 bg-slate-200 animate-pulse rounded-lg" />
      <div className="h-10 w-full bg-slate-200 animate-pulse rounded-lg" />
      <div className="flex flex-row gap-2">
        <div className="h-10 w-full bg-slate-200 animate-pulse rounded-lg" />
        <div className="h-10 w-full bg-slate-200 animate-pulse rounded-lg" />
        <div className="h-10 w-full bg-slate-200 animate-pulse rounded-lg" />
      </div>
    </div>
  );
};
