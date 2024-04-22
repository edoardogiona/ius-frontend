export const getUserInfo = async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};
