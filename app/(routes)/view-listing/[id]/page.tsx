"use client";

import { LoadScript } from "@react-google-maps/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import type { ListingType } from "@/types";

import { Details } from "./_components/details";
import { Slider } from "./_components/slider";

interface ViewListingPageProps {
  params: {
    id: string;
  };
}

const ViewListingPage = ({ params }: ViewListingPageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [listingDetails, setListingDetails] = useState<ListingType>();

  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("listing")
        .select("*,listing_images(listing_id,url)")
        .eq("id", params.id)
        .eq("active", true);

      if (!data?.length) {
        router.replace("/");
      }

      if (data) {
        setListingDetails(data[0]);
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with getting the listing.",
        });
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY!}
      libraries={["places"]}
      loadingElement={<ViewListingPageSkeleton />}
    >
      {isLoading ? (
        <ViewListingPageSkeleton />
      ) : (
        <div className="mt-[90px] px-4 md:px-32 lg:px-56">
          <Slider imageList={listingDetails?.listing_images} />
          <Details listingDetails={listingDetails} />
        </div>
      )}
    </LoadScript>
  );
};

const ViewListingPageSkeleton = () => {
  return (
    <div className="mt-[90px] px-4 md:px-32 lg:px-56">
      <div className="w-full h-[360px] bg-slate-200 animate-pulse rounded-b-lg" />
      <div className="flex flex-col gap-2 my-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-36 bg-slate-200 animate-pulse rounded-lg mb-3" />
            <div className="h-6 w-96 bg-slate-200 animate-pulse rounded-lg" />
          </div>
          <div className="h-10 md:w-[148px] lg:w-[118px] bg-slate-200 animate-pulse rounded-lg" />
        </div>
        <hr />
        <div className="flex flex-col gap-3 mt-4">
          <div className="h-7 w-36 bg-slate-200 animate-pulse rounded-lg" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="h-10 bg-slate-200 animate-pulse rounded-lg p-3 w-full" />
            <div className="h-10 bg-slate-200 animate-pulse rounded-lg p-3 w-full" />
            <div className="h-10 bg-slate-200 animate-pulse rounded-lg p-3 w-full" />
            <div className="h-10 bg-slate-200 animate-pulse rounded-lg p-3 w-full" />
            <div className="h-10 bg-slate-200 animate-pulse rounded-lg p-3 w-full" />
            <div className="h-10 bg-slate-200 animate-pulse rounded-lg p-3 w-full" />
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <div className="h-7 w-36 bg-slate-200 animate-pulse rounded-lg" />
          <div className="h-44 bg-slate-200 animate-pulse rounded-lg p-3 w-full" />
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div className="h-7 w-36 bg-slate-200 animate-pulse rounded-lg" />
          <div className="h-[450px] w-full bg-slate-200 animate-pulse rounded-lg" />
        </div>

        <div className="flex flex-col gap-3 mt-4">
          <div className="h-7 w-36 bg-slate-200 animate-pulse rounded-lg" />
          <div className="h-32 w-full bg-slate-200 animate-pulse rounded-lg my-6" />
        </div>
      </div>
    </div>
  );
};

export default ViewListingPage;
