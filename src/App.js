import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { Layout } from "antd";
import SideBar from "./component/sidebar";
import Navbar from "./component/navbar";
import Product from "./component/product";
import AboutUs from "./component/about-us";
import Container from "./component/container";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App" style={{ minHeight: "100%" }}>
      <Layout>
        <Header>
          <Navbar />
        </Header>
        <Layout>
          <Sider collapsible collapsedWidth="0" width="250">
            <SideBar />
          </Sider>
          <Content>
            <Container>
              <Product />
            </Container>
          </Content>
        </Layout>
        <Footer>
          <AboutUs />
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
