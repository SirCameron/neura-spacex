import { FlightModel } from "~/server/models/flight.model";
import { Flight } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const flights = await FlightModel.find().exec();

    return flights;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Unexpected error",
    });
  }
});
