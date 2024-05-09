"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import type { ListingType } from "@/types";

import { useToast } from "../ui/use-toast";
import { Listing } from "./listing";

interface ListingMapViewProps {
  type: "Sell";
}

export const ListingMapView = ({ type }: ListingMapViewProps) => {
  const [listing, setListing] = useState<ListingType[]>();

  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("listing")
        .select("*,listing_images(listing_id,url)")
        .eq("active", true)
        .eq("type", type)
        .order("id", { ascending: false });

      if (data) {
        setListing(data);
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with getting the listings.",
        });
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Listing listing={listing} />
    </div>
  );
};
