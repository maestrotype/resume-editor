import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";

const BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:4000").replace('/api', '');

const ProfileMenu = () => {
    const { t } = useTranslation();
    const { user, logout } = useAuth();

    console.log('[ProfileMenu] Current user data:', user);

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

    const avatarUrl = user?.avatar ? `${BASE_URL}${user.avatar.replace('/api', '')}` : null;
    console.log('[ProfileMenu] Avatar URL:', avatarUrl);

    return (
        <Dropdown overlay={menu} trigger={["click"]}>
            <Avatar 
                size={32}
                icon={!avatarUrl && <UserOutlined />}
                src={avatarUrl}
                style={{ cursor: 'pointer' }}
            />
        </Dropdown>
    );
};

export default ProfileMenu;
