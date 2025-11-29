"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/frontend/redux/store";
import { updateProfile } from "@/frontend/redux/Slice/UserSlice";
import ImageUpload from "@/components/common/ImageUpload";

export default function RestaurantProfile() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();

    const handleChangePassword = () => {
        alert("Change Password feature coming soon!");
    };

    const handleImageUpdate = (newUrl: string) => {
        dispatch(updateProfile({ avatar: newUrl }));
    };

    return (
        <div className="space-y-6">
            {/* Restaurant Identity */}
            <div className="bg-card shadow rounded-lg p-6 border border-border">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <ImageUpload
                            currentImageUrl={user.avatar}
                            onImageUpdate={handleImageUpdate}
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-card-foreground">{user.name || "Restaurant Name"}</h1>
                        <p className="text-muted-foreground">Restaurant</p>
                    </div>
                </div>
            </div>

            {/* Restaurant Information */}
            <div className="bg-card shadow rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4 text-card-foreground">Restaurant Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium text-card-foreground">{user.location || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-medium text-card-foreground">{user.phoneNumber || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Working Hours</p>
                        <p className="font-medium text-card-foreground">{user.workingHours || "N/A"}</p>
                    </div>
                    <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p className="font-medium text-card-foreground">
                            {user.description || "No description available."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Security */}
            <div className="bg-card shadow rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4 text-card-foreground">Security</h2>
                <button
                    onClick={handleChangePassword}
                    className="bg-destructive text-destructive-foreground px-6 py-2 rounded-lg hover:bg-destructive/90 transition"
                >
                    Change Password
                </button>
            </div>
        </div>
    );
}
