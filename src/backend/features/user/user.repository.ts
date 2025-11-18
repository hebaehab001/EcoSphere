import { injectable } from "tsyringe";
import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@/generated/prisma/client";
import { Omit } from "@prisma/client/runtime/library";

export interface IUserRepository {
  getAll(): Promise<Omit<User, "password">[]>;
  getById(id: string): Promise<Omit<User, "password"> | null>;
  updateById(
    id: string,
    data: Prisma.UserUpdateInput
  ): Promise<Omit<User, "password"> | null>;
  deleteById(id: string): Promise<Omit<User, "password"> | null>;
}

@injectable()
class UserRepository {
  async getAll(): Promise<Omit<User, "password">[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        phoneNumber: true,
        address: true,
        avatar: true,
        birthDate: true,
        createdAt: true,
        favoritesIds: true,
        points: true,
        role: true,
        gender: true,
      },
    });
  }
  async getById(id: string): Promise<Omit<User, "password"> | null> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        phoneNumber: true,
        address: true,
        avatar: true,
        birthDate: true,
        createdAt: true,
        favoritesIds: true,
        points: true,
        role: true,
        gender: true,
      },
    });
  }

  async updateById(
    id: string,
    data: Prisma.UserUpdateInput
  ): Promise<Omit<User, "password"> | null> {
    const user = await this.getById(id);
    if (!user) {
      return null;
    }
    return await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        phoneNumber: true,
        address: true,
        avatar: true,
        birthDate: true,
        createdAt: true,
        favoritesIds: true,
        points: true,
        role: true,
        gender: true,
      },
    });
  }

  async deleteById(id: string): Promise<Omit<User, "password"> | null> {
    return await prisma.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
        phoneNumber: true,
        address: true,
        avatar: true,
        birthDate: true,
        createdAt: true,
        favoritesIds: true,
        points: true,
        role: true,
        gender: true,
      },
    });
  }
}

export default UserRepository;
