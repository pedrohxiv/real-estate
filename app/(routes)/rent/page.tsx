"use client";

import { LoadScript } from "@react-google-maps/api";

import { ListingMapView } from "@/components/listing-map-view";
import { ListingItemSkeleton } from "@/components/listing-map-view/listing";

const RentPage = () => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY!}
      libraries={["places"]}
      loadingElement={<RentPageSkeleton />}
    >
      <ListingMapView type="Rent" />
    </LoadScript>
  );
};

const RentPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 p-10">
      <div>
        <div className="flex flex-col gap-6 p-3">
          <div className="w-full h-[38px] bg-slate-200 animate-pulse rounded-lg" />
          <div className="flex flex-row gap-3">
            <div className="grid grid-cols-2 xl:flex xl:flex-row gap-3 w-full">
              <div className="h-10 w-full bg-slate-200 animate-pulse rounded-lg" />
              <div className="h-10 w-full bg-slate-200 animate-pulse rounded-lg" />
              <div className="h-10 w-full bg-slate-200 animate-pulse rounded-lg" />
              <div className="h-10 w-full bg-slate-200 animate-pulse rounded-lg" />
            </div>
            <div className="h-10 md:w-[148px] lg:w-[118px] bg-slate-200 animate-pulse rounded-lg" />
          </div>
        </div>
        <div className="h-5 w-36 bg-slate-200 animate-pulse rounded-lg mx-3" />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          <ListingItemSkeleton />
          <ListingItemSkeleton />
          <ListingItemSkeleton />
          <ListingItemSkeleton />
          <ListingItemSkeleton />
        </div>
      </div>
      <div className="fixed right-0 mt-3 mr-10 h-[75vh] w-[42.8%] lg:w-[45.8%] bg-slate-200 animate-pulse rounded-lg" />
    </div>
  );
};

export default RentPage;
