import { Response } from "express";
import userModel from "../models/user.model";
import { redis } from "../utils/redis";

// GET USER BY ID
export const getUserById = async (id: string, res: Response) => {
  try {
    // First, try to get user from Redis
    // const user = await userModel.findById(id);
    const userJson = await redis.get(id);
    if (userJson) {
      const user = JSON.parse(userJson);
      res.status(201).json({
        success: true,
        user,
      });
    }

    // res.status(201).json({
    //   success: true,
    //   user,
    // });

    // If not in Redis, fetch from database
    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update Redis cache for future requests
    await redis.set(id, JSON.stringify(user));
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching user",
    });
  }
};

// GET ALL USERS
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};
