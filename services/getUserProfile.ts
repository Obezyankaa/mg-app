export const getUserProfile = async (accessToken: string, username: string) => {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const response = await fetch(
    `${apiUrl}/api/users/info-profile/${username}/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error("Ошибка загрузки профиля");
  }
  return data; // данные профиля пользователя
};
