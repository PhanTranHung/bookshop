import React, {useEffect} from "react";
import "./css/product.css";
import Card from "./data-entry/card";
import {useDispatch, useSelector} from "react-redux";
import {getBook} from "../actions";
import {Avatar, Divider, Empty, Result, Button} from "antd";
import {UserOutlined, Loading3QuartersOutlined} from "@ant-design/icons";

const Product = (props) => {
  const {authors, books, ...state} = useSelector((state) => state.fetchBook);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBook());
    // eslint-disable-next-line
  }, []);

  if (state.constructing)
    return (
      <Result
        title="Đang tải dữ liệu, vui lòng chờ một chút"
        subTitle="Rất nhiều sách đang sale bạn nhé"
        icon={<Loading3QuartersOutlined spin/>}
        extra={<Button type="primary">Cho tôi xem sách đang giảm giá</Button>}
      />
    );

  if (authors.length <= 0 && books.length <= 0) return <Empty/>;

  return (
    <div className="">
      <div className="scale-item">
        {authors &&
        authors.map((author) => (
          <span key={author.id} className="avatar-item">
              <Avatar
                src={author.cover}
                className="avatar-border self-center"
                size={170}
                icon={<UserOutlined/>}
              />
              <div>{author.name}</div>
            </span>
        ))}
      </div>
      <Divider/>

      <div className="scale-item">
        {books &&
        books.map((book) => (
          <Card
            key={book.id}
            cover={book.cover}
            rate={book.rate}
            title={book.title}
            desc={
              <div className="start-from-right stronger">
                Giá: {book.price}
              </div>
            }
            hoverable
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
