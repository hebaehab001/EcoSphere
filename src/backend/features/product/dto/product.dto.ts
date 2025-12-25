import { Types } from "mongoose";
import { IMenuItem, MenuItemCategory } from "../../restaurant/restaurant.model";
import { IProduct } from "@/types/ProductType";

// Single unified response type - always includes restaurant context
export type ProductResponse = IMenuItem & {
  restaurantId: Types.ObjectId | string;
  restaurantName: string;
};

export const mapResponseToIProduct = (res: ProductResponse): IProduct => {
  const productImg = res.avatar?.url || "";

  return {
    id: `${res._id}`,
    restaurantId: `${res.restaurantId}`,
    shopName: res.restaurantName,
    shopSubtitle: res.subtitle,
    productImg,
    productName: res.title,
    productPrice: res.price,
    productSubtitle: res.subtitle,
    productDescription: "", // res.description is not available in ProductResponse
    availableOnline: res.availableOnline,
    sustainabilityScore: res.sustainabilityScore || 0,
    sustainabilityReason: res.sustainabilityReason,
    category: res.category,
  };
};

export interface CreateProductDTO {
  title: string;
  subtitle: string;
  price: number;
  category: MenuItemCategory;
  avatar?: {
    key: string;
    url?: string;
  };
  availableOnline?: boolean; // Optional - defaults to true in schema
  sustainabilityScore?: number;
  sustainabilityReason?: string;
  category?: string;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;

export interface ProductPageOptions {
  page?: number;
  limit?: number;
  search?: string;
<<<<<<< HEAD
  sort?:
    | "default"
    | "priceLow"
    | "priceHigh"
    | "sustainabilityLow"
    | "sustainabilityHigh";
=======
  sort?: "default" | "priceLow" | "priceHigh" | "price" | "sustainabilityScore";
  sortOrder?: "asc" | "desc";
>>>>>>> 39586735f91437c8f566711397a949c0a1c0c912
  category?: string;
}

export interface PaginatedProductResponse {
  data: ProductResponse[];
  metadata: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
