"use client";

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Star, Clock, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { IShop } from "@/types/ShopTypes";
import { getAverageRating } from "../ShopSection";
import BasicAnimatedWrapper from "../../common/BasicAnimatedWrapper";

// Dynamically import the map component to avoid SSR issues
const BranchMap = dynamic(() => import("./ShopMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-border flex items-center justify-center bg-muted">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
});

const ShopDetailsCard = ({ shop }: { shop: IShop }) => {
  const t = useTranslations("ShopDetails.card");
  const [showMap, setShowMap] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [searchedPhone, setSearchedPhone] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // Function to search for phone number online
  const searchPhoneNumber = async () => {
    setIsSearching(true);
    setSearchError(null);

    try {
      // Call your backend API to search for the shop's phone number
      const response = await fetch(
        `/api/search-phone?shopName=${encodeURIComponent(shop.name)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch phone number");
      }

      const data = await response.json();

      if (data.phoneNumber) {
        setSearchedPhone(data.phoneNumber);
      } else {
        setSearchError("Phone number not found online");
      }
    } catch (error) {
      console.error("Error searching phone number:", error);
      setSearchError("Unable to search at this time. Please try again later.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="">
      <BasicAnimatedWrapper className="flex flex-col gap-10 my-30 w-full">
        <div className="flex flex-col justify-center items-center md:flex-row gap-10 w-full">
          {/* shop image */}
          <div className="relative shadow-lg rounded-lg  ">
            <Image
              width={600}
              height={400}
              src={shop.avatar?.url ?? "/shop-img.jpg"}
              alt={shop.name}
              className="w-[500px] rounded-lg "
            />
            {/* top right decorative SVG */}
            <div className="w-[30%] h-[30%] absolute -top-[6%] -right-[6%]  ">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1 1"
                xmlns="http://www.w3.org/2000/svg"
                className="text-background drop-shadow-lg "
              >
                <path
                  d="M0 0H0.479167C0.766667 0 1 0.233333 1 0.520833V1H0.520833C0.233333 1 0 0.766667 0 0.479167V0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="w-[20%] h-[20%] absolute top-0 right-0 ">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 1 1"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary "
              >
                <path
                  d="M0 0H0.479167C0.766667 0 1 0.233333 1 0.520833V1H0.520833C0.233333 1 0 0.766667 0 0.479167V0Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* bottom left decorative SVG */}
            <div className="max-w-[50%] max-h-[30%] absolute -bottom-[3%] -left-[5%] rounded-full bg-background p-4 drop-shadow-lg ">
              {/* shop data */}
              <div className="bg-primary rounded-full px-4 py-2 w-full text-center flex items-center  gap-4">
                <Image
                  src="/store img/avatar.jpg"
                  alt="shop icon"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h1 className="text-lg font-bold text-foreground">
                    {shop.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* shop details */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Shop name and cuisine */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {shop.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(+getAverageRating(shop))
                        ? "fill-primary text-primary"
                        : "fill-none text-primary"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({getAverageRating(shop).toFixed(1)})
              </span>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">
                {t("workingHours")}
              </span>
              <span className="text-muted-foreground">{shop.workingHours}</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">{t("about")}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {shop.description}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setShowMap(!showMap);
                  setShowContact(false); // Close contact when opening map
                }}
                className="flex-1 bg-primary text-primary-foreground p-3 rounded-full transition duration-400 hover:scale-102 flex justify-center items-center text-lg gap-2 hover:outline-2 hover:outline-primary hover:outline-offset-4 cursor-pointer"
              >
                <MapPin className="w-5 h-5" />
                {t("visitShop")}
              </button>
              <button
                onClick={() => {
                  setShowContact(!showContact);
                  setShowMap(false); // Close map when opening contact
                }}
                className="flex-1 bg-primary text-primary-foreground p-3 rounded-full transition duration-400 hover:scale-102 flex justify-center items-center text-lg gap-2 hover:outline-2 hover:outline-primary hover:outline-offset-4 cursor-pointer"
                aria-label="Contact shop"
              >
                <Phone className="w-5 h-5" />
                {t("contact")}
              </button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out w-full ${
            showContact ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {showContact && (
            <div className="w-full p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-muted-foreground min-w-[100px]">
                    Phone:
                  </span>
                  <a
                    href={`tel:${shop.phoneNumber}`}
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    {shop.phoneNumber}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Branch Map - Shows all shop/restaurant locations */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out w-full ${
            showMap ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {showMap && <BranchMap shopName={shop.name} />}
        </div>
      </BasicAnimatedWrapper>
    </section>
  );
};

export default ShopDetailsCard;
