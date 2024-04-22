import type { JobOfferCreation } from "../types/Job.type";

export const createJobOffer = async ({
  description,
  courses,
  companyId,
  dateInit,
  dateEnd,
  hours,
  salary,
}: JobOfferCreation) => {
  try {
    const response = await fetch(`http://localhost:8080/job-offers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        courses,
        companyId,
        dateInit,
        dateEnd,
        hours,
        salary,
      }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
