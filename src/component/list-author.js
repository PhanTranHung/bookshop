import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom"

const ListAuthor = ({ authors, ...props }) => {
  return authors.map((author) => (
    <span key={author.id} className="avatar-item">
      <Link to={`/author/${author.id}`}>
        <Avatar
          src={author.cover}
          className="avatar-border self-center"
          size={170}
          icon={<UserOutlined />}
        />
      <div>{author.name}</div>
      </Link>
    </span>
  ));
};
export default ListAuthor;
