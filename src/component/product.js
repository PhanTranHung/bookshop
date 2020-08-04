import React, {useEffect} from "react";
import "./css/product.css";
import {useDispatch, useSelector} from "react-redux";
import {getBook} from "../actions";
import {Divider, Empty, Result, Button} from "antd";
import {useLocation} from "react-router-dom";
import {Loading3QuartersOutlined} from "@ant-design/icons";
import ListAuthor from "./list-author";
import ListBook from "./list-book";

const Product = (props) => {
  debugger;
  const {author: authors, book: books, isLoading} = useSelector(
    (state) => state.fetchBook
  );
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!location.state) dispatch(getBook());
    // eslint-disable-next-line
  }, []);

  if (isLoading)
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
        {authors && <ListAuthor authors={authors}/>}
      </div>
      <Divider/>
      <div className="scale-item">
        {books && Array.isArray(books) && <ListBook books={books}/>}
      </div>
    </div>
  );
};

export default Product;
