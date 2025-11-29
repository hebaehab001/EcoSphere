"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/frontend/redux/store";

export default function OrganizerProfile() {
    const user = useSelector((state: RootState) => state.user);

    const handleChangePassword = () => {
        alert("Change Password feature coming soon!");
    };

    const handleRenewSubscription = () => {
        alert("Renew Subscription feature coming soon!");
    };

    return (
        <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-card shadow rounded-lg p-6 border border-border">
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
                        <p className="text-muted-foreground">Organizer</p>
                    </div>
                </div>
            </div>

            {/* Subscription Management */}
            <div className="bg-card shadow rounded-lg p-6 border border-border">
                <h2 className="text-xl font-semibold mb-4 text-card-foreground">Subscription Management</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Expiry Date</p>
                        <p className="font-medium text-card-foreground">{user.subscriptionPeriod || "N/A"}</p>
                    </div>
                    <button
                        onClick={handleRenewSubscription}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                    >
                        Renew Subscription
                    </button>
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
        </div>
    );
}
