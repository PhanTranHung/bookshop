import React from "react";
import Card from "./data-entry/card";
import { Link } from "react-router-dom";
const ListBook = ({ books, ...props }) => {
  return books.map((book) => (
    <Link key={book.id} to={`/book/${book.id}`}>
      <Card
        cover={book.cover}
        rate={book.rate}
        title={book.title}
        desc={
          <div className="start-from-right stronger">Giá: {book.price}</div>
        }
        hoverable
      />
    </Link>
  ));
};
export default ListBook;
