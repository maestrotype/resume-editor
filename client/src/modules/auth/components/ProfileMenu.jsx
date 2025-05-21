import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const ProfileMenu = () => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();

    const menu = (
        <Menu>
            {user ? (
                <>
                    <Menu.Item key="profile" icon={<UserOutlined />}>
                        {t("profile")}: {user.username}
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
                        {t("logout")}
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item key="login">
                        <a href="/login">{t("login")}</a>
                    </Menu.Item>
                    <Menu.Item key="register">
                        <a href="/register">{t("register")}</a>
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={["click"]}>
            {user?.avatar ? (
                <Avatar src={user.avatar} className="avatar" />
            ) : (
                <Avatar icon={<UserOutlined />} className="avatar" />
            )}
        </Dropdown>
    );
};

export default ProfileMenu;
