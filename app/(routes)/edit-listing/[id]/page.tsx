"use client";

import { useUser } from "@clerk/nextjs";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import type { Listing } from "@/types";

import { FileUpload } from "./_components/file-upload";

interface EditListingPageProps {
  params: {
    id: string;
  };
}

const EditListingPage = ({ params }: EditListingPageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [listing, setListing] = useState<Listing>();
  const [images, setImages] = useState<string[]>([]);

  const { toast } = useToast();
  const { user } = useUser();

  const router = useRouter();

  const onSubmit = async (values: Listing) => {
    setIsLoading(true);

    const { data, error } = await supabase
      .from("listing")
      .update(values)
      .eq("id", params.id)
      .select();

    for (const image of images) {
      const file = Date.now().toString();

      const { data, error } = await supabase.storage
        .from("listing_images")
        .upload(`${file}`, image, {
          contentType: `image/${file.split(".").pop()}`,
          upsert: false,
        });

      if (data) {
        toast({
          title: "Success!",
          description: "Your listing images has uploaded.",
        });

        const url = `${process.env.NEXT_PUBLIC_IMAGE_URL}/${file}`;

        const { data, error } = await supabase
          .from("listing_images")
          .insert([{ url, listing_id: params.id }])
          .select();

        if (data) {
          toast({
            title: "Success!",
            description: "Your listing images has saved.",
          });
        }

        if (error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with saving listing images.",
          });
        }
      }

      if (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with uploading listing images.",
        });
      }
    }

    if (data) {
      toast({
        title: "Success!",
        description: "Your listing has updated.",
      });
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with updating listing.",
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    user &&
      (async () => {
        setIsLoading(true);

        const { data } = await supabase
          .from("listing")
          .select("*,listing_images(listing_id,url)")
          .eq("created_by", user?.primaryEmailAddress?.emailAddress)
          .eq("id", params.id);

        if (!data?.length) {
          router.replace("/");
        }

        if (data) {
          setListing(data[0]);
          setType(data[0].type);
        }

        setIsLoading(false);
      })();
  }, [user]);

  return (
    <div className="px-10 md:px-36 mt-28 mb-10">
      <h2 className="font-bold text-2xl">
        Enter some more details about your listing
      </h2>
      <Formik
        initialValues={{
          full_name: user?.fullName,
          profile_image: user?.imageUrl,
        }}
        onSubmit={(values) => onSubmit({ ...values, type })}
      >
        {({ handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-5 border rounded-lg shadow-md grid gap-7 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-slate-500">
                    Do you want to Rent or Sell?
                  </p>
                  <RadioGroup
                    className="flex items-center gap-12"
                    defaultValue={type}
                    onValueChange={(value) => setType(value)}
                  >
                    <RadioGroupItem className="hidden" value="Sell" id="Sell" />
                    <Label
                      htmlFor="Sell"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "text-base px-8 cursor-pointer",
                        type === "Sell" && "border-2 shadow-sm border-primary",
                        isLoading && "pointer-events-none opacity-50"
                      )}
                    >
                      Sell
                    </Label>
                    <RadioGroupItem className="hidden" value="Rent" id="Rent" />
                    <Label
                      htmlFor="Rent"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "text-base px-8 cursor-pointer",
                        type === "Rent" && "border-2 shadow-sm border-primary",
                        isLoading && "pointer-events-none opacity-50"
                      )}
                    >
                      Rent
                    </Label>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-slate-500">
                    What type of property?
                  </p>
                  <Select
                    defaultValue={listing?.property_type}
                    name="property_type"
                    onValueChange={(value) =>
                      setFieldValue("property_type", value)
                    }
                    disabled={isLoading}
                  >
                    <SelectTrigger className="text-base font-medium">
                      <SelectValue placeholder={listing?.property_type} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="cursor-pointer text-base font-medium"
                        value="Single Family House"
                      >
                        Single Family House
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer text-base font-medium"
                        value="Town House"
                      >
                        Town House
                      </SelectItem>
                      <SelectItem
                        className="cursor-pointer text-base font-medium"
                        value="Condo"
                      >
                        Condo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Bedroom (Qty)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="2"
                    defaultValue={listing?.bedroom}
                    name="bedroom"
                    type="number"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Bathroom (Qty)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="2"
                    defaultValue={listing?.bathroom}
                    name="bathroom"
                    type="number"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Parking (Qty)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="2"
                    defaultValue={listing?.parking}
                    name="parking"
                    type="number"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Built In (Sq.Ft)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="1900"
                    defaultValue={listing?.built_in}
                    name="built_in"
                    type="number"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Lot Size (Sq.Ft)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="2000"
                    defaultValue={listing?.lot_size}
                    name="lot_size"
                    type="number"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Area (Sq.Ft)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="1900"
                    defaultValue={listing?.area}
                    name="area"
                    type="number"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Selling Price ($)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="400000"
                    defaultValue={listing?.price}
                    name="price"
                    type="number"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">HOA (Per Mouth) ($)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="500"
                    defaultValue={listing?.hoa}
                    name="hoa"
                    type="number"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Description</p>
                  <Textarea
                    className="text-base font-medium"
                    defaultValue={listing?.description}
                    name="description"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">
                    Upload Property Images
                  </p>
                  <FileUpload
                    setImages={(value) => setImages(value)}
                    imageList={listing?.listing_images}
                  />
                </div>
              </div>
              <div className="flex gap-7 justify-end">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:text-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  Save
                </Button>
                <Button type="submit" disabled={isLoading}>
                  Save & Publish
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListingPage;
