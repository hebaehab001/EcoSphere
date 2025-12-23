import { injectable } from "tsyringe";
import { DBInstance } from "@/backend/config/dbConnect";
import { RestaurantModel, IRestaurant } from "../restaurant/restaurant.model";
import mongoose from "mongoose";
import {
  ProductResponse,
  CreateProductDTO,
  UpdateProductDTO,
  PaginatedProductResponse,
  ProductPageOptions,
} from "./dto/product.dto";
import { PipelineStage } from "mongoose";

export interface IProductRepository {
  findAllProducts(
    options?: ProductPageOptions
  ): Promise<PaginatedProductResponse>;
  findProductById(productId: string): Promise<ProductResponse | null>;
  findProductsByRestaurantId(
    restaurantId: string,
    options?: ProductPageOptions
  ): Promise<PaginatedProductResponse | ProductResponse[]>;
  addProduct(
    restaurantId: string,
    productData: CreateProductDTO
  ): Promise<IRestaurant | null>;
  updateProduct(
    restaurantId: string,
    productId: string,
    productData: UpdateProductDTO
  ): Promise<IRestaurant | null>;
  deleteProduct(
    restaurantId: string,
    productId: string
  ): Promise<IRestaurant | null>;
  addProductReview(productId: string, review: any): Promise<IRestaurant | null>;
  // Category filtering methods for AI chatbot
  getProductsByCategory(
    category: string,
    limit?: number
  ): Promise<ProductResponse[]>;
  getProductCategoryCounts(): Promise<{ category: string; count: number }[]>;
  // Analytics methods for AI chatbot
  getTopProductsByRating(limit?: number): Promise<ProductResponse[]>;
  getCheapestProducts(limit?: number): Promise<ProductResponse[]>;
  getTotalProductCount(): Promise<number>;
  getMostSustainableProducts(limit?: number): Promise<ProductResponse[]>;
}

@injectable()
export class ProductRepository implements IProductRepository {
  async findAllProducts(
    options?: ProductPageOptions
  ): Promise<PaginatedProductResponse> {
    await DBInstance.getConnection();

    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "title",
      sortOrder = "asc",
    } = options ?? {};

    const skip = (page - 1) * limit;

    const SORT_FIELDS_MAP: Record<string, string> = {
      title: "title",
      price: "price",
      rating: "itemRating",
    };

    const sortField = SORT_FIELDS_MAP[sortBy] || "title";
    const sortDirection = sortOrder === "desc" ? -1 : 1;

    const pipeline: PipelineStage[] = [
      { $unwind: "$menus" },
      {
        $project: {
          _id: "$menus._id",
          restaurantId: "$_id",
          restaurantName: "$name",
          title: "$menus.title",
          subtitle: "$menus.subtitle",
          price: "$menus.price",
          avatar: "$menus.avatar",
          availableOnline: "$menus.availableOnline",
          sustainabilityScore: "$menus.sustainabilityScore",
          sustainabilityReason: "$menus.sustainabilityReason",
          itemRating: "$menus.itemRating",
        },
      },
      {
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { subtitle: { $regex: search, $options: "i" } },
          ],
        },
      },
      { $sort: { [sortField]: sortDirection } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: limit }],
        },
      },
    ];

    const result = await RestaurantModel.aggregate(pipeline).exec();

    const data = result[0]?.data || [];
    const total = result[0]?.metadata[0]?.total || 0;

    console.log(
      "[findAllProducts] Page sample:",
      data.length > 0
        ? {
            productId: data[0]._id?.toString(),
            productName: data[0].title,
            hasAvatar: !!data[0].avatar,
          }
        : "No products found"
    );

    return {
      data,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findProductById(productId: string): Promise<ProductResponse | null> {
    await DBInstance.getConnection();
    const result = await RestaurantModel.aggregate<ProductResponse>([
      { $unwind: "$menus" },
      { $match: { "menus._id": new mongoose.Types.ObjectId(productId) } },
      {
        $project: {
          _id: "$menus._id",
          restaurantId: "$_id",
          restaurantName: "$name",
          title: "$menus.title",
          subtitle: "$menus.subtitle",
          price: "$menus.price",
          avatar: "$menus.avatar",
          availableOnline: "$menus.availableOnline",
          sustainabilityScore: "$menus.sustainabilityScore",
          sustainabilityReason: "$menus.sustainabilityReason",
          itemRating: "$menus.itemRating",
        },
      },
    ]).exec();

    return result[0] || null;
  }

  async findProductsByRestaurantId(
    restaurantId: string,
    options?: ProductPageOptions
  ): Promise<PaginatedProductResponse> {
    await DBInstance.getConnection();

    const {
      page = 1,
      limit = 10,
      search = "",
      sortBy = "title",
      sortOrder = "asc",
    } = options ?? {};

    const skip = (page - 1) * limit;

    const SORT_FIELDS_MAP: Record<string, string> = {
      title: "title",
      price: "price",
      rating: "itemRating",
    };

    const sortField = SORT_FIELDS_MAP[sortBy] || "title";
    const sortDirection = sortOrder === "desc" ? -1 : 1;

    const pipeline: PipelineStage[] = [
      { $match: { _id: new mongoose.Types.ObjectId(restaurantId) } },
      { $unwind: "$menus" },
      {
        $project: {
          _id: "$menus._id",
          restaurantId: "$_id",
          restaurantName: "$name",
          title: "$menus.title",
          subtitle: "$menus.subtitle",
          price: "$menus.price",
          avatar: "$menus.avatar",
          availableOnline: "$menus.availableOnline",
          sustainabilityScore: "$menus.sustainabilityScore",
          sustainabilityReason: "$menus.sustainabilityReason",
          itemRating: "$menus.itemRating",
        },
      },
      {
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { subtitle: { $regex: search, $options: "i" } },
            // Add description if it exists in the schema, though subtitle seems to be the one used for description in this context
          ],
        },
      },
      { $sort: { [sortField]: sortDirection } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [{ $skip: skip }, { $limit: limit }],
        },
      },
    ];

    const result = await RestaurantModel.aggregate(pipeline).exec();
    const data = result[0]?.data || [];
    const total = result[0]?.metadata[0]?.total || 0;

    return {
      data,
      metadata: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async addProduct(
    restaurantId: string,
    productData: CreateProductDTO
  ): Promise<IRestaurant | null> {
    await DBInstance.getConnection();
    return await RestaurantModel.findByIdAndUpdate(
      restaurantId,
      {
        $push: { menus: productData },
      },
      { new: true, runValidators: true }
    ).exec();
  }

  async updateProduct(
    restaurantId: string,
    productId: string,
    productData: UpdateProductDTO
  ): Promise<IRestaurant | null> {
    await DBInstance.getConnection();

    const updateQuery: Record<string, any> = {};
    for (const [key, value] of Object.entries(productData)) {
      updateQuery[`menus.$.${key}`] = value;
    }

    return await RestaurantModel.findOneAndUpdate(
      { _id: restaurantId, "menus._id": productId },
      { $set: updateQuery },
      { new: true }
    ).exec();
  }

  async deleteProduct(
    restaurantId: string,
    productId: string
  ): Promise<IRestaurant | null> {
    await DBInstance.getConnection();
    return await RestaurantModel.findByIdAndUpdate(
      restaurantId,
      {
        $pull: { menus: { _id: productId } },
      },
      { new: true }
    ).exec();
  }

  async addProductReview(
    productId: string,
    review: any
  ): Promise<IRestaurant | null> {
    await DBInstance.getConnection();
    return await RestaurantModel.findOneAndUpdate(
      { "menus._id": productId },
      {
        $push: { "menus.$.itemRating": review },
      },
      { new: true }
    ).exec();
  }

  // Category filtering methods for AI chatbot
  async getProductsByCategory(
    category: string,
    limit: number = 10
  ): Promise<ProductResponse[]> {
    await DBInstance.getConnection();

    const pipeline: PipelineStage[] = [
      { $unwind: "$menus" },
      { $match: { "menus.category": category } },
      {
        $addFields: {
          avgRating: {
            $cond: [
              { $gt: [{ $size: { $ifNull: ["$menus.itemRating", []] } }, 0] },
              { $avg: "$menus.itemRating.rate" },
              0,
            ],
          },
        },
      },
      { $sort: { avgRating: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: "$menus._id",
          restaurantId: "$_id",
          restaurantName: "$name",
          title: "$menus.title",
          subtitle: "$menus.subtitle",
          price: "$menus.price",
          category: "$menus.category",
          avatar: "$menus.avatar",
          avgRating: 1,
          sustainabilityScore: "$menus.sustainabilityScore",
          availableOnline: "$menus.availableOnline",
          itemRating: "$menus.itemRating",
        },
      },
    ];

    return await RestaurantModel.aggregate(pipeline).exec();
  }

  async getProductCategoryCounts(): Promise<
    { category: string; count: number }[]
  > {
    await DBInstance.getConnection();

    const result = await RestaurantModel.aggregate([
      { $unwind: "$menus" },
      {
        $group: {
          _id: "$menus.category",
          count: { $count: {} },
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]).exec();

    return result;
  }

  //Analytics methods for AI chatbot
  async getTopProductsByRating(limit: number = 10): Promise<ProductResponse[]> {
    await DBInstance.getConnection();

    const pipeline: PipelineStage[] = [
      { $unwind: "$menus" },
      {
        $addFields: {
          avgRating: {
            $cond: [
              { $gt: [{ $size: { $ifNull: ["$menus.itemRating", []] } }, 0] },
              { $avg: "$menus.itemRating.rate" },
              0,
            ],
          },
        },
      },
      { $match: { avgRating: { $gt: 0 } } }, // Only products with ratings
      { $sort: { avgRating: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: "$menus._id",
          restaurantId: "$_id",
          restaurantName: "$name",
          title: "$menus.title",
          subtitle: "$menus.subtitle",
          price: "$menus.price",
          avgRating: 1,
          sustainabilityScore: "$menus.sustainabilityScore",
          category: "$menus.category",
          avatar: "$menus.avatar",
          itemRating: "$menus.itemRating",
        },
      },
    ];

    return await RestaurantModel.aggregate(pipeline).exec();
  }

  async getCheapestProducts(limit: number = 10): Promise<ProductResponse[]> {
    await DBInstance.getConnection();

    const pipeline: PipelineStage[] = [
      { $unwind: "$menus" },
      { $sort: { "menus.price": 1 } },
      { $limit: limit },
      {
        $project: {
          _id: "$menus._id",
          restaurantId: "$_id",
          restaurantName: "$name",
          title: "$menus.title",
          subtitle: "$menus.subtitle",
          price: "$menus.price",
          category: "$menus.category",
          avatar: "$menus.avatar",
          availableOnline: "$menus.availableOnline",
          itemRating: "$menus.itemRating",
        },
      },
    ];

    return await RestaurantModel.aggregate(pipeline).exec();
  }

  async getMostSustainableProducts(
    limit: number = 10
  ): Promise<ProductResponse[]> {
    await DBInstance.getConnection();

    const pipeline: PipelineStage[] = [
      { $unwind: "$menus" },
      {
        $match: {
          "menus.sustainabilityScore": { $exists: true, $ne: null, $gt: 0 },
        },
      },
      { $sort: { "menus.sustainabilityScore": -1 } },
      { $limit: limit },
      {
        $project: {
          _id: "$menus._id",
          restaurantId: "$_id",
          restaurantName: "$name",
          title: "$menus.title",
          subtitle: "$menus.subtitle",
          price: "$menus.price",
          sustainabilityScore: "$menus.sustainabilityScore",
          sustainabilityReason: "$menus.sustainabilityReason",
          category: "$menus.category",
          avatar: "$menus.avatar",
          itemRating: "$menus.itemRating",
        },
      },
    ];

    return await RestaurantModel.aggregate(pipeline).exec();
  }

  async getTotalProductCount(): Promise<number> {
    await DBInstance.getConnection();

    const result = await RestaurantModel.aggregate([
      { $unwind: "$menus" },
      { $count: "total" },
    ]).exec();

    return result[0]?.total || 0;
  }
}
