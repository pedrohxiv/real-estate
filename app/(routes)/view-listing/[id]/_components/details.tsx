import { useUser } from "@clerk/nextjs";
import {
  Bath,
  BedDouble,
  CarFront,
  CheckCheck,
  Drill,
  Home,
  LandPlot,
  MapPin,
  Pen,
  Share,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Map } from "@/components/listing-map-view/map";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { ListingType } from "@/types";

interface DetailsProps {
  listingDetails?: ListingType;
}

export const Details = ({ listingDetails }: DetailsProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const { user } = useUser();
  const { toast } = useToast();

  const router = useRouter();
  const pathname = usePathname();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + pathname);

    setCopied(true);

    toast({
      title: "Success!",
      description: "Link copied to clipboard.",
    });

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    listingDetails && (
      <div className="flex flex-col gap-2 my-6">
        <div className="flex justify-between items-center">
          <div className="w-full flex flex-row bg justify-between items-center">
            <div>
              <h2 className="font-bold text-3xl">${listingDetails.price}</h2>
              <div className="flex flex-row items-center gap-2 mt-2 text-gray-400">
                <div>
                  <MapPin className="w-5 h-5" />
                </div>
                <h6>{listingDetails.address}</h6>
              </div>
            </div>
            <div className="p-2 flex flex-row gap-2">
              {listingDetails.created_by ===
                user?.emailAddresses[0].emailAddress && (
                <Button
                  variant="outline"
                  className="flex gap-2"
                  onClick={() =>
                    router.push(`/edit-listing/${listingDetails.id}`)
                  }
                >
                  <Pen className="h-4 w-4" />
                  Edit
                </Button>
              )}
              <Button className="flex gap-2" onClick={handleShare}>
                {copied ? (
                  <CheckCheck className="h-4 w-4" />
                ) : (
                  <Share className="h-4 w-4" />
                )}
                Share
              </Button>
            </div>
          </div>
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
