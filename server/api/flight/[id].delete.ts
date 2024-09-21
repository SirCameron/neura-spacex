import { FlightModel } from "~/server/models/flight.model";

export default defineEventHandler<Promise<{ success: boolean } | undefined>>(
  async (event) => {
    try {
      const flightId = getRouterParam(event, "id");

      await FlightModel.deleteOne({ id: flightId });

      return { success: true };
    } catch (error) {
      console.log(error);
      throw createError({
        statusCode: 500,
        statusMessage: "Unexpected error",
      });
    }
  }
);
