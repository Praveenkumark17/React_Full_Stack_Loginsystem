import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Home from "./Components/Pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";
import Registration from "./Components/Pages/Registration";
import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import Footers from "./Components/Layout/Footers";
import Dashboard from "./Components/Pages/Dashboard";
import Editprofile from "./Components/Pages/Editprofile";
import Changepassword from "./Components/Pages/Changepassword";
import ListUser from "./Components/Pages/ListUser";

function Apps() {
  let routes = useRoutes([
    {
      path: "/",
      element: (
        <Layout className="layout">
          <Header className="header">
            <Navbar />
          </Header>
          <Content className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          </Content>
          <Footer className="footer">
            <Footers />
          </Footer>
        </Layout>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "register", element: <Registration /> },
      ],
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        { path: "edit/:id", element: <Editprofile /> },
        { path: "changepass", element: <Changepassword /> },
        { path: "listUser", element: <ListUser /> },
      ],
    },
  ]);

  return routes;
}

function App() {
  return (
    <Router>
      <Apps />
    </Router>
  );
}

export default App;
