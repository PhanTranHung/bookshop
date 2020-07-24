import React, { useState } from "react";
import { Menu, Input } from "antd";
import "antd/dist/antd.css";
import CheckboxGroup from "./data-entry/checkbox-group";

import {
  AppstoreOutlined,
  PieChartOutlined,
  MailOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const SideBar = () => {
  const [category, setCategory] = useState(false);
  const [author, setAuthor] = useState(false);

  const options = [
    { label: "Apple", value: "Apple" },
    { label: "Pear", value: "Pear" },
    { label: "Orange", value: "Orange" },
  ];
  return (
    <>
      <Menu
        defaultSelectedKeys={["all"]}
        defaultOpenKeys={["category"]}
        mode="inline"
        theme="light"
      >
        <Menu.Item key="all" icon={<PieChartOutlined />}>
          Tất cả sách
        </Menu.Item>
        <SubMenu key="category" icon={<MailOutlined />} title="Thể loại">
          <CheckboxGroup
            options={options}
            onChange={(values) => setCategory(values)}
            drawBack={35}
            itemLayout="horizontal"
          />
        </SubMenu>
        <SubMenu key="author" icon={<AppstoreOutlined />} title="Tác giả">
          <CheckboxGroup
            options={options}
            onChange={(values) => setAuthor(values)}
            drawBack={35}
            itemLayout="horizontal"
          />
        </SubMenu>
        <Menu.Item key="search">
          <Input.Search
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            loading="false"
          />
        </Menu.Item>
      </Menu>
    </>
  );
};

export default SideBar;
