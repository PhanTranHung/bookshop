import React from "react";
import { Collapse } from "antd";
import Card from "./data-entry/card";

const books = {
  cover: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
  rate: "3.5",
  title: "Đời sống pháp luật",
  price: "15.000",
  author: "Trịnh Công Sơn",
};
const Product = (props) => {
  return (
    <div className="scale-item">
      <Card
        cover={books.cover}
        rate={books.rate}
        title={books.title}
        desc={
          <div className="start-from-right stronger">Giá: {books.price}</div>
        }
        hoverable
      />
    </div>
  );
};

export default Product;
