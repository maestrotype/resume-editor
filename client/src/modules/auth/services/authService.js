import i18n from "../../../i18n";
const API_URL = process.env.REACT_APP_API_URL;

export const login = async (username, password) => {

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
  localStorage.setItem("avatar", data.avatar);
  return data;
};

export const register = async (formData) => {
    console.log("formData", formData);
    
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    body: formData,
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
  localStorage.removeItem("avatar");
};
