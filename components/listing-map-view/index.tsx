import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import type { AddressType, CoordinatesType, ListingType } from "@/types";

import { Listing } from "./listing";
import { Map } from "./map";

interface ListingMapViewProps {
  type: "Sell";
}

export const ListingMapView = ({ type }: ListingMapViewProps) => {
  const [listing, setListing] = useState<ListingType[]>();
  const [bedCount, setBedCount] = useState<number>(0);
  const [bathCount, setBathCount] = useState<number>(0);
  const [parkingCount, setParkingCount] = useState<number>(0);
  const [homeType, setHomeType] = useState<string>("");
  const [coordinates, setCoordinates] = useState<CoordinatesType | null>();

  const { toast } = useToast();

  const handleSearch = async (value: AddressType | null) => {
    const searchTerm = value?.value.structured_formatting.main_text || "";

    let query = supabase
      .from("listing")
      .select("*,listing_images(listing_id,url)")
      .eq("active", true)
      .eq("type", type)
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount)
      .like("address", `%${searchTerm}%`)
      .order("id", { ascending: false });

    if (homeType) {
      query = query.eq("property_type", homeType);
    }

    const { data, error } = await query;

    if (data) {
      setListing(data);
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with searching the listings.",
      });
    }
  };

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24 p-10">
      <Listing
        listing={listing}
        handleSearch={(value) => handleSearch(value)}
        setBedCount={(value) => setBedCount(+value)}
        setBathCount={(value) => setBathCount(+value)}
        setParkingCount={(value) => setParkingCount(+value)}
        setHomeType={(value) => setHomeType(value)}
        setCoordinates={(value) => setCoordinates(value)}
      />
      <Map coordinates={coordinates} />
    </div>
  );
};
