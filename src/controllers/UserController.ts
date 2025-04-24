import { Request, Response } from "express";
import UserRepository from "../repositories/UserRepository";
import { toUserDTO } from "../types/user";

export default class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async story(req: Request, res: Response) {
    try {
      const userDto = toUserDTO(req.body);
      const user = await this.userRepository.createUser(userDto);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async all(req: Request, res: Response) {
    try {
      const users = await this.userRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async index(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await this.userRepository.getUserById(userId);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const userDto = toUserDTO(req.body);
      const user = await this.userRepository.updateUser(userId, userDto);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      await this.userRepository.deleteUser(userId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}
