import type { RequestOfCourse } from "../types/Course.type";

export const requestCourse = async ({
  courseType,
  description,
  companyId,
}: RequestOfCourse) => {
  try {
    const response = await fetch(`http://localhost:8080/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseType,
        description,
        companyId,
      }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
