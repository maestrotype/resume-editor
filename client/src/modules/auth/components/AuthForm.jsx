import React, { useState, useContext } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Use value from .env.development
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const AuthForm = ({ isLogin }) => {
  const { t } = useTranslation();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (info) => {

    if (info.file.status === 'done') {
      if (info.file.response.success) {
        setAvatar(info.file.response.avatarPath);
        message.success(t("avatar_upload_success"));
      } else {
        message.error(info.file.response.message || t("avatar_upload_error"));
      }
    } else if (info.file.status === 'error') {
      message.error(t("avatar_upload_error"));
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    
    try {
      const endpoint = isLogin ? 'login' : 'register';
      
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          ...(avatar ? { avatar } : {})
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t("auth_error"));
      }

      if (data.success) {
        localStorage.setItem("token", data.token);
        const userData = {
          username: values.username,
          avatar: data.avatar
        };
        setUser(userData);
        message.success(isLogin ? t("login_success") : t("register_success"));
        navigate("/");
      }
    } catch (err) {
      message.error(err.message || t("auth_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item 
        label={t("username")}
        name="username" 
        rules={[{ required: true, message: t("username_required") }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item 
        label={t("password")}
        name="password" 
        rules={[{ required: true, message: t("password_required") }]}
      >
        <Input.Password />
      </Form.Item>

      {!isLogin && (
        <Form.Item label={t("avatar")}>
          <Upload
            name="avatar"
            action={`${API_URL}/upload/avatar`}
            onChange={handleAvatarChange}
            maxCount={1}
            accept="image/*"
            showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
          >
            <Button icon={<UploadOutlined />}>{t("upload_avatar")}</Button>
          </Upload>
        </Form.Item>
      )}

      <Button type="primary" htmlType="submit" loading={loading} block>
        {isLogin ? t("login") : t("register")}
      </Button>
    </Form>
  );
};

export default AuthForm;
