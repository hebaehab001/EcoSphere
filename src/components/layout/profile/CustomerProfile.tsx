"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/frontend/redux/store";
import {
  updateUserProfile,
  updateProfile,
} from "@/frontend/redux/Slice/UserSlice";
import ImageUpload from "@/components/layout/common/ImageUpload";
import OrderHistoryEmptyState from "./OrderHistoryEmptyState";
import { Edit, Eye, EyeOff } from "lucide-react";
import { ChangePasswordSchema } from "@/frontend/schema/profile.schema";
import { changeUserPassword, getUserData } from "@/frontend/api/Users";
import { getUserOrders } from "@/frontend/api/Orders";
import { User } from "@/types/UserTypes";
import { IOrder } from "@/backend/features/orders/order.model";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const OrderHistoryComponent = ({ user }: { user: User }) => {
  const t = useTranslations("Profile.customer.orderHistory");
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">{t("loading")}</div>;
  }

  // If no orders found from API (or empty array)
  if (!orders || orders.length === 0) {
    return <OrderHistoryEmptyState />;
  }

  return (
    <div className="bg-card shadow rounded-lg p-6 border border-border">
      <h2 className="text-xl font-semibold mb-4 text-card-foreground">
        {t("title")}
      </h2>
      <p className="text-muted-foreground mb-4">
        {t("orderCount", { count: orders.length })}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">{t("orderId")}</th>
              <th className="px-4 py-3">{t("date")}</th>
              <th className="px-4 py-3">{t("total")}</th>
              <th className="px-4 py-3 rounded-tr-lg">{t("status")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr
                key={order._id?.toString()}
                className="hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 py-3 font-mono font-medium">
                  {order._id?.toString().slice(-8).toUpperCase()}
                </td>
                <td className="px-4 py-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 font-semibold">
                  ${order.orderPrice.toFixed(2)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : order.status === "canceled"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function CustomerProfile({
  id,
  role,
}: {
  id: string;
  role: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  /* Translations */
  const tCommon = useTranslations("Profile.common");
  const tStates = useTranslations("Profile.states");
  const tToasts = useTranslations("Profile.toasts");
  const tSecurity = useTranslations("Profile.security");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData<User>(
          id,
          role,
          "firstName lastName email phoneNumber address birthDate gender points avatar role"
        );
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, role]);

  if (loading)
    return <div className="p-6 text-center">{tStates("loading")}</div>;
  if (!user)
    return <div className="p-6 text-center">{tStates("notFound")}</div>;

  const validatePassword = (data: typeof passwordData) => {
    const result = ChangePasswordSchema.safeParse(data);
    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        currentPassword: formatted.currentPassword?._errors[0] || "",
        newPassword: formatted.newPassword?._errors[0] || "",
        confirmPassword: formatted.confirmPassword?._errors[0] || "",
      });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChangePassword = async () => {
    setTouched({
      currentPassword: true,
      newPassword: true,
      confirmPassword: true,
    });

    if (!validatePassword(passwordData)) {
      return;
    }

    try {
      const response = await changeUserPassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      if (response.success) {
        toast.success(tToasts("passwordChanged"));
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
        setTouched({
          currentPassword: false,
          newPassword: false,
          confirmPassword: false,
        });
      }
    } catch (error) {
      console.error("Failed to change password", error);
      toast.error(tToasts("passwordChangeFailed"));
    }
  };

  const handleEditClick = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      birthDate: user.birthDate,
      gender: user.gender,
    });
    setIsEditing(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...passwordData, [name]: value };
    setPasswordData(newData);
    setTouched((prev) => ({ ...prev, [name]: true }));
    validatePassword(newData);
  };

  const handleSave = async () => {
    if (user._id) {
      await dispatch(
        updateUserProfile({ id: user._id, data: formData as any })
      );
      setIsEditing(false);
    }
  };

  const handleImageUpdate = (newUrl: string) => {
    dispatch(updateProfile({ avatar: newUrl }));
  };

  return (
    <div className="space-y-6">
      {/* Main Profile Section */}
      <div className="bg-card shadow rounded-lg p-6 border border-border relative">
        {/* Edit Button - Top Right */}
        <button
          onClick={handleEditClick}
          className="absolute top-6 right-6 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
          title={tCommon("editProfile")}
        >
          <Edit className="w-5 h-5" />
        </button>

        <div className="flex flex-col xl:flex-row items-start gap-8">
          {/* Left Side: Identity */}
          <div className="flex flex-col gap-6 w-full xl:w-auto xl:min-w-[350px]">
            <div className="flex items-center gap-6">
              <ImageUpload
                currentImageUrl={user.avatar?.url}
                onImageUpdate={handleImageUpdate}
              />
              <div className="flex flex-col gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-card-foreground">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-muted-foreground">Customer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider (Visible on XL screens) */}
          <div className="hidden xl:block w-px bg-border self-stretch"></div>

          {/* Right Side: Personal Information */}
          <div className="flex-1 w-full">
            <h2 className="text-xl font-semibold mb-4 text-card-foreground">
              {tCommon("personalInformation")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {tCommon("email")}
                </p>
                <p className="font-medium text-card-foreground">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {tCommon("phoneNumber")}
                </p>
                <p className="font-medium text-card-foreground">
                  {user.phoneNumber || tCommon("na")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {tCommon("address")}
                </p>
                <p className="font-medium text-card-foreground">
                  {user.address || tCommon("na")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {tCommon("birthDate")}
                </p>
                <p className="font-medium text-card-foreground">
                  {user.birthDate || tCommon("na")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {tCommon("gender")}
                </p>
                <p className="font-medium capitalize text-card-foreground">
                  {user.gender || tCommon("na")}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {tCommon("ecoPoints")}
                </p>
                <p className="font-medium text-card-foreground">
                  {user.points || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-card shadow rounded-lg p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4 text-card-foreground">
          {tSecurity("title")}
        </h2>
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">
              {tSecurity("currentPassword")}
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange}
                className="myInput pr-12"
                placeholder={tSecurity("currentPasswordPlaceholder")}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPasswords.current ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {touched.currentPassword && errors.currentPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.currentPassword}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">
              {tSecurity("newPassword")}
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                className={`myInput pr-12 ${
                  !passwordData.currentPassword
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                placeholder={tSecurity("newPasswordPlaceholder")}
                disabled={!passwordData.currentPassword}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {touched.newPassword && errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">
              {tSecurity("confirmPassword")}
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                className={`myInput pr-12 ${
                  !passwordData.newPassword
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                placeholder={tSecurity("confirmPasswordPlaceholder")}
                disabled={!passwordData.newPassword}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPasswords.confirm ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            onClick={handleChangePassword}
            className={`mt-8 myBtnPrimary w-full ${
              !passwordData.confirmPassword ||
              passwordData.newPassword !== passwordData.confirmPassword
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={
              !passwordData.confirmPassword ||
              passwordData.newPassword !== passwordData.confirmPassword
            }
          >
            {tSecurity("changePassword")}
          </button>
        </div>
      </div>

      {/* Order History */}
      {role === "customer" && <OrderHistoryComponent user={user} />}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 w-full max-w-md border border-border shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-card-foreground">
              {tCommon("editProfile")}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-1">
                    {tCommon("firstName")}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-1">
                    {tCommon("lastName")}
                  </label>
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
                <label className="block text-sm font-medium text-card-foreground mb-1">
                  {tCommon("phoneNumber")}
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">
                  {tCommon("address")}
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">
                  {tCommon("birthDate")}
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-1">
                  {tCommon("gender")}
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">{tCommon("selectGender")}</option>
                  <option value="male">{tCommon("male")}</option>
                  <option value="female">{tCommon("female")}</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-input rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition"
              >
                {tCommon("cancel")}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
              >
                {tCommon("saveChanges")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
