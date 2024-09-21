import { Flight } from "~/types";

export default defineEventHandler<Promise<Flight[]>>(async (event) => {
  try {
    const response = await fetch(
      "https://api.spacexdata.com/v5/launches/query",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: { upcoming: false },
          options: { page: 1, limit: 30, sort: { date_utc: "desc" } },
        }),
      }
    );
    const data = await response.json();

    return data.docs;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Unexpected error",
    });
  }
});
