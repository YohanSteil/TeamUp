import ApiError from "../errors/error.js";

export default (schema, requestProperty) => async (req, _, next) => {
  try {
    const data = req[requestProperty];
    await schema.validateAsync(data);
    next();
  } catch (err) {
    if (
      err.details
      && err.details[0].message.includes(
        "La date de l'événement ne peut pas être antérieure à la date actuelle."
      )
    ) {
      return next(
        new ApiError(
          400,
          "La date de l'événement ne peut pas être antérieure à la date actuelle."
        )
      );
    }
    next(new ApiError(400, "Les données envoyées ne sont pas correctes ..."));
  }
};
