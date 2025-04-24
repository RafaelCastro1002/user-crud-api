import { DefaultArgs } from "@prisma/client/runtime/library";
import { Prisma, PrismaClient } from "../../generated/prisma/client";
import { UserDTO } from "../types/user";
const prisma = new PrismaClient();

export default class UserRepository {
  private userModel: Prisma.UserDelegate<
    DefaultArgs,
    Prisma.PrismaClientOptions
  >;

  constructor() {
    this.userModel = prisma.user;
  }

  async createUser(data: UserDTO): Promise<any> {
    // Check if the user already exists
    const existingUser = await this.userModel.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    return await this.userModel.create({
      data: {
        ...data,
      },
    });
  }

  async getUserById(id: string) {
    return await this.userModel.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllUsers(): Promise<any[]> {
    return await this.userModel.findMany();
  }
  async updateUser(id: string, data: UserDTO): Promise<any> {
    const user = await this.userModel.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await this.userModel.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }
  async deleteUser(id: string): Promise<any> {
    const user = await this.userModel.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await this.userModel.delete({
      where: {
        id,
      },
    });
  }
}
