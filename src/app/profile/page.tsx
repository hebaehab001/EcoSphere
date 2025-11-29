"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/frontend/redux/store";
import CustomerProfile from "@/components/profile/CustomerProfile";
import OrganizerProfile from "@/components/profile/OrganizerProfile";
import RestaurantProfile from "@/components/profile/RestaurantProfile";

export default function ProfilePage() {
  const user = useSelector((state: RootState) => state.user);

  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {user.role === "customer" && <CustomerProfile />}
        {user.role === "organizer" && <OrganizerProfile />}
        {(user.role === "restaurant" || user.role === "shop") && (
          <RestaurantProfile />
        )}
      </div>
    </div>
  );
}
