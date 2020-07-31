import React, {useEffect, useState} from "react";
import {Menu, Input} from "antd";
import "antd/dist/antd.css";
import CheckboxGroup from "./data-entry/checkbox-group";
import {
  AppstoreOutlined,
  PieChartOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
  getBook,
  getCategory,
  getAuthor,
  findBookByOptions,
  findBookByKeyword,
} from "../actions";
import {useMounted} from "../helper/useMounted";

const {SubMenu} = Menu;

const SideBar = () => {
  const {categories, authors} = useSelector((state) => ({
    categories: state.fetchCategory.categories,
    authors: state.fetchAuthor.authors,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    if (categories.length <= 0) dispatch(getCategory());
    if (authors.length <= 0) dispatch(getAuthor());
    // eslint-disable-next-line
  }, []);

  const [category, setCategory] = useState([]);
  const [author, setAuthor] = useState([]);
  const [selectedKey, setSelectedKey] = useState("all");

  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted) {
      dispatch(findBookByOptions(author, category));
      if (selectedKey !== "") setSelectedKey("");
    }
    console.log(
      "CATEGORIES",
      category,
      "\nAUTHORS",
      author,
      "\nKEY",
      selectedKey
    );
  }, [category, author]);

  return (
    <div className="sticky_top">
      <Menu
        selectedKeys={selectedKey}
        defaultOpenKeys={["category"]}
        mode="inline"
        theme="light"
      >
        <Menu.Item
          key="all"
          icon={<PieChartOutlined/>}
          onClick={() => dispatch(getBook())}
        >
          Tất cả sách
        </Menu.Item>
        <SubMenu key="category" icon={<MailOutlined/>} title="Thể loại">
          <CheckboxGroup
            options={categories}
            onChange={(values) => setCategory(values)}
            drawBack={35}
            itemLayout="horizontal"
          />
        </SubMenu>
        <SubMenu
          key="author"
          icon={<AppstoreOutlined/>}
          title="Một số tác giả nổi tiếng"
        >
          <CheckboxGroup
            options={authors}
            onChange={(values) => setAuthor(values)}
            drawBack={35}
            itemLayout="horizontal"
          />
          <Menu.Item key="moreAuthor">Xem thêm tác giả</Menu.Item>
        </SubMenu>
        <Menu.Item key="search">
          <Input.Search
            placeholder="Nhập tên sách hoặc tác giả"
            onSearch={(value) =>
              value.length > 1 && dispatch(findBookByKeyword(value))
            }
            loading={false}
          />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBar;
