import type { UserInfo } from "../types/User.type";

export const updateUserInfo = async ({
  userId,
  newUserInfo,
}: {
  userId: string;
  newUserInfo: UserInfo;
}) => {
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        birthDate: newUserInfo.birthDate,
        firstName: newUserInfo.firstName,
        lastName: newUserInfo.lastName,
        role: newUserInfo.role,
      }),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
