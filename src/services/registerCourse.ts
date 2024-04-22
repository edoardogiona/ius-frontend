import type { CourseCreation } from "../types/Course.type";

export const registerCourse = async ({
  title,
  description,
  offers,
  teacherId,
  opportunities,
  duration,
}: CourseCreation) => {
  try {
    const response = await fetch(`http://localhost:8080/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        offers,
       teacherId,
        opportunities,
        duration,
      }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
