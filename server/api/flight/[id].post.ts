import { FlightModel } from "~/server/models/flight.model";

export default defineEventHandler<Promise<{ success: boolean } | undefined>>(
  async (event) => {
    try {
      const flightId = getRouterParam(event, "id");

      const savedFlight = await FlightModel.findById(flightId).exec();

      if (savedFlight) {
        setResponseStatus(event, 200);
        return { success: true };
      }

      const response = await fetch(
        `https://api.spacexdata.com/v5/launches/${flightId}`
      );
      if (!response.ok) {
        throw createError({
          statusCode: 404,
          statusMessage: "Flght not found",
        });
      }
      const flightData = await response.json();

      await FlightModel.insertMany([{ ...flightData, _id: flightId }]);

      setResponseStatus(event, 201);
      return { success: true, flightData };
    } catch (error) {
      console.log(error);
      throw createError({
        statusCode: 500,
        statusMessage: "Unexpected error",
      });
    }
  }
);
