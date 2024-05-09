"use client";

import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import type { AddressType, CoordinatesType } from "@/types";

import { GoogleAddressSearch } from "./_components/google-address-search";

const AddNewListingPage = () => {
  const [address, setAddress] = useState<AddressType | null>(null);
  const [coordinates, setCoordinates] = useState<CoordinatesType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useUser();
  const { toast } = useToast();

  const router = useRouter();

  const handleNext = async () => {
    setIsLoading(true);

    if (!address || !coordinates) {
      return;
    }

    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: address.label,
          coordinates,
          created_by: user?.primaryEmailAddress?.emailAddress,
        },
      ])
      .select();

    if (data) {
      toast({
        title: "Success!",
        description: "New Address added for listing.",
      });

      router.replace(`/edit-listing/${data[0].id}`);
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="mt-24 md:mx-56 lg:mx-80">
      <div className="p-10 flex flex-col gap-5 items-center justify-center">
        <h2 className="font-bold text-2xl">Add new Listing</h2>
        <div className="p-10 rounded-lg border w-full shadow-md flex flex-col gap-5">
          <p className="text-gray-500">Enter Address which you want to list</p>
          <GoogleAddressSearch
            setAddress={(value) => setAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
            disabled={!address || !coordinates || isLoading}
            onClick={handleNext}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddNewListingPage;
