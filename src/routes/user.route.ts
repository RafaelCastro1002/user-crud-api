import { Router } from "express";
import UserController from "../controllers/UserController";
import { handleValidationErrors } from "../middlewares/commonMiddleware";
import validateUser from "../middlewares/userMiddleware";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(
  "/story",
  validateUser("story"),
  handleValidationErrors,
  userController.story.bind(userController)
);

userRoutes.get("/", userController.all.bind(userController));

userRoutes.get(
  "/:id",
  validateUser("paramUserId"),
  handleValidationErrors,
  userController.index.bind(userController)
);

userRoutes.put(
  "/:id",
  validateUser("update"),
  handleValidationErrors,
  userController.update.bind(userController)
);

userRoutes.delete(
  "/:id",
  validateUser("paramUserId"),
  handleValidationErrors,
  userController.delete.bind(userController)
);

export default userRoutes;
