import React, {Suspense, lazy} from "react";
// import logo from "./logo.svg";
import "./App.css";
import {Layout, Row, Col} from "antd";
import Navbar from "./component/navbar";
import Product from "./component/product";
import AboutUs from "./component/about-us";
import Container from "./component/container";
import SideBarErrorBoundaries from "./error/side-bar-error-boundaries";
import {Switch, Route} from "react-router-dom";
import AuthorDetail from "./component/author-detail";
import BookDetail from "./component/book-detail";

const SideBar = lazy(() => import(`./component/sidebar`));
const {Header, Footer, Content} = Layout;

function App() {
  return (
    <div className="App" style={{minHeight: "100%"}}>
      <Layout>
        <Header style={{background: "white"}}>
          <Navbar/>
        </Header>
        <Layout>
          <Row>
            <Col flex="250px">
              <SideBarErrorBoundaries>
                <Suspense fallback={<div>Loading...</div>}>
                  <SideBar/>
                </Suspense>
              </SideBarErrorBoundaries>
            </Col>
            <Col flex="auto">
              <Content>
                <Container>
                  <Switch>
                    <Route path="/author/:alias">
                      <AuthorDetail/>
                    </Route>
                    <Route path="/book/:alias">
                      <BookDetail/>
                    </Route>
                    <Route path="/">
                      <Product/>
                    </Route>
                  </Switch>
                </Container>
              </Content>
            </Col>
          </Row>
        </Layout>
        <Footer>
          <AboutUs/>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
