import express from "express";
import Controller from "../../controllers/contact.controller.js";
import wrapper from "../../middlewares/controller.wrapper.js";
import validationMiddleware from "../../middlewares/validationJoi.middleware.js";
import createSchema from "../../schema/contact/contact.create.schema.js";

const router = express.Router();

router.route("/").post(
//   validationMiddleware(createSchema, "body"),
  wrapper(Controller.sendContactEmail.bind(Controller))
);

export default router;
