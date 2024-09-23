const apiUrl = process.env.EXPO_PUBLIC_API_URL;
export const loginService = async (username: string, password: string) => {
  const response = await fetch(`${apiUrl}/api/auth/jwt/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }
  return data; // { access, refresh }
};
