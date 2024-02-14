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
import Upimages from "./Components/Pages/Upimages";
import ForgotPassword from "./Components/Pages/ForgotPassword";
import Demo from "./Components/Pages/Demo";
import ResetPassword from "./Components/Pages/ResetPassword";
import ErrorPage from "./Components/Pages/ErrorPage";
import StaffList from "./Components/Pages/StaffList";
import ProtectedRoute from "./Components/Pages/ProtectedRoute";

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
              <Route path="/i" element={<Demo />} />
              <Route path="/forgot_Password" element={<ForgotPassword />} />
              <Route path="/reset_Password" element={<ResetPassword />} />
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
        { path: "i", element: <Demo /> },
        { path: "forgot_Password", element: <ForgotPassword /> },
        { path: "reset_Password", element: <ResetPassword /> },
      ],
    },
    {
      path: "dashboard",
      element: <Dashboard />,
      children: [
        { path: "edit/:id", element: <Editprofile /> },
        { path: "changepass", element: <Changepassword /> },
        { path: "listUser", element: <ListUser /> },
        { path: "staff_list", element: <StaffList /> },
        { path: "protect_rout", element: <ProtectedRoute /> },
      ],
    },
    {
      path: "error",
      element: <ErrorPage />,
      children: [{ path: "error", element: <ErrorPage /> }],
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
