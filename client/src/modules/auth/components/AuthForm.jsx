import React, { useState, useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthContext";
import { login, register } from "../services/authService";

const AuthForm = ({ isLogin }) => {
  const { t } = useTranslation();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = isLogin ? await login(values.username, values.password) : await register(values.username, values.password);
      setUser(data);
      message.success(isLogin ? t("login_success") : t("register_success"));
      window.location.href = "/";
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item label={t("username")} name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label={t("password")} name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading} block>
        {isLogin ? t("login") : t("register")}
      </Button>
    </Form>
  );
};

export default AuthForm;
