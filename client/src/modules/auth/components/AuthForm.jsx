import React, { useState, useContext } from "react";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import AuthContext from "../context/AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

const AuthForm = ({ isLogin }) => {
  const { t } = useTranslation();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = async (info) => {
    const formData = new FormData();
    formData.append("avatar", info.file.originFileObj);

    try {
      const res = await fetch(`${API_URL}/api/avatar`, {
        method: "POST",
        body: formData,
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid content type");
      }

      const data = await res.json();
      setAvatar(data.avatarPath);
      console.log("Аватар успешно загружен:", data.avatarPath);
    } catch (error) {
      console.error("Ошибка при загрузке аватара", error);
      message.error("Не удалось загрузить аватар");
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          avatar,
        }),
      });

      const data = await res.json();
      message.success("Успешная регистрация!");
      console.log("Регистрация:", data);
    } catch (err) {
      console.error("Ошибка регистрации:", err);
      message.error("Ошибка при регистрации");
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
      {!isLogin && (
        <Form.Item label={t("avatar")} name="avatar">
          <Upload
            name="avatar"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleAvatarChange}
            fileList={
              avatar
                ? [
                    {
                      uid: "-1",
                      name: avatar.split("/").pop(),
                      status: "done",
                      url: `${API_URL}${avatar}`,
                    },
                  ]
                : []
            }
            maxCount={1}
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
