/* eslint comma-dangle: ["error", "never"] */

import express from "express";
import Controller from "../../controllers/events.controller.js";
import wrapper from "../../middlewares/controller.wrapper.js";
import createSchema from "../../schema/event/event.create.schema.js";
import updateSchema from "../../schema/event/event.update.schema.js";
import validationMiddleware from "../../middlewares/validationJoi.middleware.js";
import { verifyToken } from "../../middlewares/jwt.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(wrapper(Controller.getAllEvent.bind(Controller)))
  .post(
    verifyToken,
    validationMiddleware(createSchema, "body"),
    wrapper(Controller.create.bind(Controller))
  );
router
  .route("/:id(\\d+)")
  .get(wrapper(Controller.getEventDetails.bind(Controller)))

  // UPDATE EVENT
  .patch(
    verifyToken,
    validationMiddleware(updateSchema, "body"),
    wrapper(Controller.update.bind(Controller))
  )

  // ROUTE DELETE EVENT
  .delete(verifyToken, wrapper(Controller.deleteEvent.bind(Controller)));

// PARTICIPATION D'UN USER A UN EVENT
router
  .route("/:eventId/join")
  .post(
    verifyToken,
    wrapper(Controller.addUserToEvent.bind(Controller))
  )

  .delete(
    verifyToken,
    wrapper(Controller.deleteUserToEvent.bind(Controller))
  );

// ROUTE GET LATEST 20 EVENTS FROM HOMEPAGE
router.route("/lastest").get(wrapper(Controller.getLatest.bind(Controller)));

// SEARCH EVENT
router.route("/search").get(wrapper(Controller.searchEvent.bind(Controller)));
// example : http://localhost:3000/events/search?address=ville&date=2024-04-17&level=2&sport=5

export default router;
