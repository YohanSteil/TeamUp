import express from "express";
import Controller from "../../controllers/sport.controller.js";
import wrapper from "../../middlewares/controller.wrapper.js";
import { verifyToken } from "../../middlewares/jwt.middleware.js";
import isAdmin from "../../middlewares/isAdmin.middleware.js";
import validationMiddleware from "../../middlewares/validationJoi.middleware.js";
import createSchema from "../../schema/sport/sport.create.schema.js";
import updateSchema from "../../schema/sport/sport.update.schema.js";

const router = express.Router();

router.route("/").get(wrapper(Controller.getAll.bind(Controller)));

router.use(verifyToken);

router
  .route("/")
  .post(
    isAdmin,
    validationMiddleware(createSchema, "body"),
    wrapper(Controller.create.bind(Controller))
  );

router
  .route("/:id(\\d+)")
  .get(wrapper(Controller.getOne.bind(Controller)))
  .patch(
    isAdmin,
    validationMiddleware(updateSchema, "body"),
    wrapper(Controller.updateSport.bind(Controller))
  )
  .delete(
    isAdmin,
    wrapper(Controller.delete.bind(Controller))
  );

export default router;
