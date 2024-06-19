import express from "express";
import Controller from "../../controllers/contact.controller.js";
import wrapper from "../../middlewares/controller.wrapper.js";

const router = express.Router();

router.route("/").post(wrapper(Controller.sendContactEmail.bind(Controller)));

export default router;
