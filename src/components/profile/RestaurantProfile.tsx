"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/frontend/redux/store";
import { updateUserProfile, updateProfile } from "@/frontend/redux/Slice/UserSlice";
import ImageUpload from "@/components/common/ImageUpload";

export default function RestaurantProfile() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        location: user.location || "",
        workingHours: user.workingHours || "",
        description: user.description || "",
    });

    const handleChangePassword = () => {
        alert("Change Password feature coming soon!");
    };

    const handleEditClick = () => {
        setFormData({
            name: user.name || "",
            phoneNumber: user.phoneNumber || "",
            location: user.location || "",
            workingHours: user.workingHours || "",
            description: user.description || "",
        });
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (user.id) {
            await dispatch(updateUserProfile({ id: user.id, data: formData }));
            setIsEditing(false);
        }
    };

    const handleImageUpdate = (newUrl: string) => {
        dispatch(updateProfile({ avatar: newUrl }));
    };

    return (
        <div className="space-y-6">
            {/* Restaurant Identity */}
            <div className="bg-card shadow rounded-lg p-6 relative border border-border">
                <button
                    onClick={handleEditClick}
                    className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    Edit Profile
                </button>
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

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-card rounded-lg p-6 w-full max-w-md border border-border shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-card-foreground">Edit Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">Restaurant Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">Working Hours</label>
                                <input
                                    type="text"
                                    name="workingHours"
                                    value={formData.workingHours}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 9 AM - 10 PM"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 border border-input rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
