import React, {useEffect, useState, useRef} from "react";
import {Menu, Input} from "antd";
import CheckboxGroup from "./data-entry/checkbox-group";
import {
  AppstoreOutlined,
  PieChartOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
  getBook,
  getAuthor,
  getCategory,
  getFamousAuthor,
  findBookByOptions,
  findBookByKeyword,
} from "../actions";
import {useMounted} from "../helper/useMounted";
import {useHistory, useLocation} from "react-router-dom";

const SideBar = () => {
  const {categories, authors} = useSelector((state) => ({
    categories: state.fetchCategory.categories,
    authors: state.fetchAuthor.author,
  }));

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (categories.length <= 0) dispatch(getCategory());
    if (authors.length <= 0) dispatch(getFamousAuthor());
    // eslint-disable-next-line
  }, []);

  const [category, setCategory] = useState([]);
  const [author, setAuthor] = useState([]);
  const [selectedKey, setSelectedKey] = useState("all");

  useEffect(() => {
    if (location.state && location.state.category) {
      history.replace(location.pathname);
      setCategory([location.state.category]);
    }
    // eslint-disable-next-line
  }, [location.state]);

  const menuItem = useRef();
  const isMounted = useMounted();
  useEffect(() => {
    if (isMounted)
      if (author.length > 0 || category.length > 0) {
        setSelectedKey(undefined);
        dispatch(findBookByOptions(author, category));
      } else if (!selectedKey) menuItem.current.props.onClick();
    // console.log(
    //   "CATEGORIES",
    //   category,
    //   "\nAUTHORS",
    //   author,
    //   "\nKEY",
    //   selectedKey
    // );
    // eslint-disable-next-line
  }, [category, author]);

  useEffect(() => {
    console.log("redirect");
    if (isMounted && location.pathname !== "/") {
      history.push("/", {waitData: true})
    }
    // eslint-disable-next-line
  }, [category, author, selectedKey]);

  const removeAllCheckBoxAndDispatch = (key, keyword) => {
    if (author.length > 0) setAuthor([]);
    if (category.length > 0) setCategory([]);
    if (key !== selectedKey) {
      setSelectedKey(key);
      // eslint-disable-next-line default-case
      switch (key) {
        case "all":
          return dispatch(getBook());
        case "moreAuthor":
          return dispatch(getAuthor());
      }
    }
    if (key === "search") return dispatch(findBookByKeyword(keyword));
    // console.log("Clicked");
  };

  return (
    <div className="sticky_top">
      <Menu
        selectedKeys={selectedKey}
        defaultOpenKeys={["category"]}
        mode="inline"
        theme="light"
      >
        <Menu.Item
          ref={menuItem}
          key="all"
          icon={<PieChartOutlined/>}
          onClick={(event) => removeAllCheckBoxAndDispatch("all")}
        >
          Tất cả sách
        </Menu.Item>
        <Menu.SubMenu key="category" icon={<MailOutlined/>} title="Thể loại">
          <CheckboxGroup
            options={categories}
            onChange={(values) => setCategory(values)}
            drawBack={35}
            itemLayout="horizontal"
            value={category}
          />
        </Menu.SubMenu>
        <Menu.SubMenu
          key="author"
          icon={<AppstoreOutlined/>}
          title="Một số tác giả nổi tiếng"
        >
          <CheckboxGroup
            options={authors}
            onChange={(values) => setAuthor(values)}
            drawBack={35}
            itemLayout="horizontal"
            value={author}
          />
          <Menu.Item
            key="moreAuthor"
            onClick={() => removeAllCheckBoxAndDispatch("moreAuthor")}
          >
            Xem thêm tác giả
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item
          key="search"
          className="sticky_bottom"
          onClick={() => setSelectedKey("search")}
        >
          <Input.Search
            placeholder="Nhập tên sách hoặc tác giả"
            onSearch={(value) => removeAllCheckBoxAndDispatch("search", value)}
            loading={false}
          />
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideBar;
