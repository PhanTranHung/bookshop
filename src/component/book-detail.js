import React, { useEffect } from "react";
import {
  Button,
  Col,
  Divider,
  InputNumber,
  Rate,
  Result,
  Row,
  Space,
} from "antd";
import Container from "./container";
import {Link, useParams, useHistory} from "react-router-dom";
import {Box} from "./data-entry/box";
import {useDispatch, useSelector} from "react-redux";
import {clearData, getBookDetail, initBook} from "../actions";
import {Loading3QuartersOutlined} from "@ant-design/icons";

const BookDetail = ({...props}) => {
  const {alias} = useParams();
  const {book, error, isLoading} = useSelector((state) => state.fetchBook);
  const dispatch = useDispatch();

  // console.log("BOOK", book);

  useEffect(() => {
    if (book) dispatch(clearData(initBook))
    if (alias) dispatch(getBookDetail(alias));
    // eslint-disable-next-line
  }, []);

  if (!alias)
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    );

  if (isLoading)
    return (
      <Result
        title="Đang tải dữ liệu, vui lòng chờ một chút"
        subTitle="Rất nhiều sách đang sale bạn nhé"
        icon={<Loading3QuartersOutlined spin/>}
        extra={<Button type="primary">Cho tôi xem sách đang giảm giá</Button>}
      />
    );

  if (error)
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      />
    );

  return (
    <div style={{ background: "white" }}>
      <Row>
        <Col span={10}>
          <Container>
            <img
              className="card-cover"
              alt="product-item"
              src={book.image ? book.image : "/doraemon.jpg"}
            />
          </Container>
        </Col>
        <Col span={14}>
          <Container>
            <div style={{textAlign: "left"}}>
              <div>
                <h2>{book.name}</h2>
              </div>
              <div>
                <Rate
                  className="elastic"
                  allowHalf
                  value={book.rate}
                  disabled
                />
              </div>
              <div>
                <Space size="large" align="baseline" direction="horizontal">
                  <span>Tác giả:</span>
                  {book.author &&
                  book.author.map((author) => (
                    <Link key={author.alias} to={`/author/${author.alias}`}>
                      {author.name}
                    </Link>
                  ))}
                </Space>
              </div>
              <div>
                <Space size="large" align="baseline" direction="horizontal">
                  <span>Thể loại:</span>
                  {book.category &&
                  book.category.map((category) => (
                    <Link
                      key={category.alias}
                      to={{
                        pathname: "/",
                        state: {category: category.id},
                      }}
                    >
                      {category.name}
                    </Link>
                  ))}
                </Space>
              </div>
              <Divider/>
              <div>
                <Box
                  border="1px solid #d9f8ff"
                  background="#e5ffff"
                  height="40px"
                >
                  <div>
                    <span>
                      Miễn phí giao hàng (tối đa 88k)cho đơn hàng từ 250k.
                    </span>
                    <Link to={`/somewhere`}>Xem chi tiết</Link>
                  </div>
                </Box>
                <Box>
                  <h2 style={{color: "red"}}>{book.price} đ</h2>
                </Box>
                <Box>
                  <h6>Số lượng</h6>
                  <Box>
                    <Space size="middle">
                      <InputNumber
                        min={1}
                        max="100"
                        defaultValue={1}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                      />
                      <Button size="large" type="primary" danger>
                        Mua ngay
                      </Button>
                    </Space>
                  </Box>
                </Box>
              </div>
            </div>
          </Container>
        </Col>
      </Row>
      <Container>
        <div>Mô tả sản phẩm</div>
        <div>{book.describe}</div>
      </Container>
    </div>
  );
};

export default BookDetail;
