"use client";

import { UserButton, UserProfile } from "@clerk/nextjs";
import { Building2 } from "lucide-react";

import { UserListing } from "./_components/user-listing";

const UserPage = () => {
  return (
    <div className="flex flex-col mt-28 mb-6 justify-center items-center gap-5">
      <h2 className="font-bold text-2xl">Profile</h2>
      <UserProfile>
        <UserButton.UserProfilePage
          label="My Listing"
          labelIcon={<Building2 className="h-4 w-4" />}
          url="my-listing"
        >
          <UserListing />
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  );
};

export default UserPage;
