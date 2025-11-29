"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/frontend/redux/store";
import { updateUserProfile } from "@/frontend/redux/Slice/UserSlice";

export default function CustomerProfile() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        birthDate: user.birthDate || "",
        gender: user.gender || "",
    });

    const handleChangePassword = () => {
        alert("Change Password feature coming soon!");
    };

    const handleEditClick = () => {
        setFormData({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phoneNumber: user.phoneNumber || "",
            address: user.address || "",
            birthDate: user.birthDate || "",
            gender: user.gender || "",
        });
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (user.id) {
            await dispatch(updateUserProfile({ id: user.id, data: formData }));
            setIsEditing(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-card shadow rounded-lg p-6 relative border border-border">
                <button
                    onClick={handleEditClick}
                    className="absolute top-6 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    Edit Profile
                </button>
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-2xl text-muted-foreground">
                                {user.firstName?.[0]}
                                {user.lastName?.[0]}
                            </span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-card-foreground">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-muted-foreground">Customer</p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg inline-block">
                        <span className="font-semibold">EcoPoints:</span> {user.points || 0}
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-card shadow rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4 text-card-foreground">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-card-foreground">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-medium text-card-foreground">{user.phoneNumber || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium text-card-foreground">{user.address || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Birth Date</p>
                        <p className="font-medium text-card-foreground">{user.birthDate || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Gender</p>
                        <p className="font-medium capitalize text-card-foreground">{user.gender || "N/A"}</p>
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

            {/* My Favorites */}
            <div className="bg-card shadow rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4 text-card-foreground">My Favorites</h2>
                {user.favoritesIds && user.favoritesIds.length > 0 ? (
                    <p className="text-muted-foreground">
                        You have {user.favoritesIds.length} favorite restaurant(s).
                    </p>
                ) : (
                    <p className="text-muted-foreground">No favorites yet.</p>
                )}
            </div>

            {/* My Cart */}
            <div className="bg-card shadow rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4 text-card-foreground">My Cart</h2>
                {user.cart && user.cart.length > 0 ? (
                    <p className="text-muted-foreground">
                        You have {user.cart.length} item(s) in your cart.
                    </p>
                ) : (
                    <p className="text-muted-foreground">Your cart is empty.</p>
                )}
            </div>

            {/* Order History */}
            <div className="bg-card shadow rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4 text-card-foreground">Order History</h2>
                {user.paymentHistory && user.paymentHistory.length > 0 ? (
                    <p className="text-muted-foreground">
                        You have {user.paymentHistory.length} past order(s).
                    </p>
                ) : (
                    <p className="text-muted-foreground">No orders yet.</p>
                )}
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-card rounded-lg p-6 w-full max-w-md border border-border shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-card-foreground">Edit Profile</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-card-foreground mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-card-foreground mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    />
                                </div>
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
                                <label className="block text-sm font-medium text-card-foreground mb-1">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">Birth Date</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={formData.birthDate}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-card-foreground mb-1">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
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
