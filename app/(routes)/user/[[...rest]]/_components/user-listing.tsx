import { useUser } from "@clerk/nextjs";
import { BathIcon, BedDouble, MapPin, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ListingItemSkeleton } from "@/components/listing-map-view/listing";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { ListingType } from "@/types";

export const UserListing = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listing, setListing] = useState<ListingType[]>();

  const { toast } = useToast();
  const { user } = useUser();

  const handleDelete = async (e: React.MouseEvent, id: number | undefined) => {
    e.preventDefault();

    setIsLoading(true);

    if (!id) {
      return;
    }

    await supabase.from("listing_images").delete().eq("listing_id", id);
    await supabase.from("listing").delete().eq("id", id);

    setIsLoading(false);

    const { data, error } = await supabase
      .from("listing")
      .select("*,listing_images(listing_id,url)")
      .eq("created_by", user?.primaryEmailAddress?.emailAddress);

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
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("listing")
        .select("*,listing_images(listing_id,url)")
        .eq("created_by", user?.primaryEmailAddress?.emailAddress);

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
    <div>
      <h2 className="font-bold text-2xl mb-6">Manage your listing</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {!listing ? (
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
              <div
                key={index}
                className="p-3 hover:opacity-95 cursor-pointer rounded-lg relative"
              >
                <h2
                  className={cn(
                    "text-white absolute px-2 text-sm p-1 rounded-tl-lg rounded-br-lg",
                    item.active ? "bg-primary" : "bg-destructive"
                  )}
                >
                  {item.active ? "Published" : "Draft"}
                </h2>
                <Image
                  src={
                    item.listing_images![0]
                      ? item.listing_images![0].url
                      : "/placeholder.png"
                  }
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
                    <Button
                      className="flex gap-2 text-sm rounded-md p-2 w-full text-white justify-center items-center"
                      variant="destructive"
                      disabled={isLoading}
                      onClick={(e) => handleDelete(e, item.id)}
                    >
                      <Trash className="h-4 w-4" />
                      Delete
                    </Button>
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
