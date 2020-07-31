import React, {Suspense, lazy} from "react";
// import logo from "./logo.svg";
import "./App.css";
import {Layout, Row, Col} from "antd";
import Navbar from "./component/navbar";
import Product from "./component/product";
import AboutUs from "./component/about-us";
import Container from "./component/container";
import SideBarErrorBoundaries from "./error/side-bar-error-boundaries";

const SideBar = lazy(() => import((`./component/sidebar`)));
const {Header, Footer, Content} = Layout;

function App() {
  return (
    <div className="App" style={{minHeight: "100%"}}>
      <Layout>
        <Header>
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
                  <Product/>
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
