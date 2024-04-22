export const getMyPublishedOffers = async (userId: string) => {
  try {
    const response = await fetch(
      `http://localhost:8080/job-offers/company/${userId}`,
      {
        method: "GET",
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
