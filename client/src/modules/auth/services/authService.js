import i18n from "../../../i18n";
const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {

    console.log("API URL:", API_URL);

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorMessage = response.status === 401
      ? i18n.t("auth_error")
      : i18n.t("server_error");
    throw new Error(errorMessage);
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  return data;
};

export const register = async (username, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorMessage = response.status === 400
      ? i18n.t("register_failed")
      : i18n.t("server_error");
    throw new Error(errorMessage);
  }

  const data = await response.json();
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
