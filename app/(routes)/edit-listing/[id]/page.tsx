"use client";

import { useUser } from "@clerk/nextjs";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Listing } from "@/types";

interface EditListingPageProps {
  params: {
    id: string;
  };
}

const EditListingPage = ({ params }: EditListingPageProps) => {
  const { toast } = useToast();
  const { user } = useUser();

  const router = useRouter();

  const onSubmit = async (values: Listing) => {
    const { data, error } = await supabase
      .from("listing")
      .update(values)
      .eq("id", params.id)
      .select();

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
        description: "There was a problem with your request.",
      });
    }
  };

  useEffect(() => {
    user &&
      (async () => {
        const { data } = await supabase
          .from("listing")
          .select()
          .eq("created_by", user?.primaryEmailAddress?.emailAddress)
          .eq("id", params.id);

        if (!data?.length) {
          router.replace("/");
        }
      })();
  }, [user]);

  return (
    <div className="px-10 md:px-36 mt-28 mb-10">
      <h2 className="font-bold text-2xl">
        Enter some more details about your listing
      </h2>
      <Formik
        initialValues={{ type: "Sell", property_type: "" }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-5 border rounded-lg shadow-md grid gap-7 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-slate-500">
                    Do you want to Rent or Sell?
                  </p>
                  <div className="flex items-center gap-12">
                    <div className="flex items-center space-x-2">
                      <Button
                        className={cn(
                          "text-base px-8",
                          values.type === "Sell" &&
                            "border-2 shadow-sm border-primary"
                        )}
                        variant="outline"
                        onClick={() => setFieldValue("type", "Sell")}
                        type="button"
                      >
                        Sell
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        className={cn(
                          "text-base px-8",
                          values.type === "Rent" &&
                            "border-2 shadow-sm border-primary"
                        )}
                        variant="outline"
                        onClick={() => setFieldValue("type", "Rent")}
                        type="button"
                      >
                        Rent
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-slate-500">
                    What type of property?
                  </p>
                  <Select
                    name="property_type"
                    onValueChange={(value) => (values.property_type = value)}
                  >
                    <SelectTrigger className="text-base font-medium">
                      <SelectValue />
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
                    name="bedroom"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Bathroom (Qty)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="2"
                    name="bathroom"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Parking (Qty)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="2"
                    name="parking"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Built In (Sq.Ft)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="1900"
                    name="built_in"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Lot Size (Sq.Ft)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="2000"
                    name="lot_size"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Area (Sq.Ft)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="1900"
                    name="area"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Selling Price ($)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="400000"
                    name="price"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">HOA (Per Mouth) ($)</p>
                  <Input
                    className="text-base font-medium"
                    placeholder="500"
                    name="hoa"
                    type="number"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-10">
                <div className="flex flex-col gap-2">
                  <p className="text-lg text-gray-500">Description</p>
                  <Textarea
                    className="text-base font-medium"
                    name="description"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex gap-7 justify-end">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:text-primary"
                  type="submit"
                >
                  Save
                </Button>
                <Button type="submit">Save & Publish</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListingPage;
