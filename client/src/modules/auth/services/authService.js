import i18n from "../../../i18n";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
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
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("avatar", data.avatar);
      return data;
    } else {
      throw new Error(data.message || i18n.t("auth_error"));
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(i18n.t("server_error"));
    }

    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("avatar", data.avatar);
      return data;
    } else {
      throw new Error(data.message || i18n.t("auth_error"));
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("avatar");
};
