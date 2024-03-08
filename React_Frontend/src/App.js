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
import ForgotPassword from "./Components/Pages/ForgotPassword";
import Demo from "./Components/Pages/Demo";
import ResetPassword from "./Components/Pages/ResetPassword";
import ErrorPage from "./Components/Pages/ErrorPage";
import StaffList from "./Components/Pages/StaffList";
import Dashboardhome from "./Components/Pages/Dashboardhome";
import Department from "./Components/Pages/Department";
import Course from "./Components/Pages/Course";
import Staffcourse from "./Components/Pages/Staffcourse";
import Mycourse from "./Components/Pages/Mycourse";
import Studentscourse from "./Components/Pages/Studentscourse";
import Mystucourse from "./Components/Pages/Mystucourse";

function Apps() {
  const ip = "192.168.236.79";
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
              <Route path="/" element={<Home ip={ip}/>} />
              <Route path="/register" element={<Registration ip={ip}/>} />
              <Route path="/i" element={<Demo />} />
              <Route path="/forgot_Password" element={<ForgotPassword ip={ip}/>} />
              <Route path="/reset_Password" element={<ResetPassword ip={ip}/>} />
            </Routes>
          </Content>
          <Footer className="footer">
            <Footers />
          </Footer>
        </Layout>
      ),
      children: [
        { path: "/", element: <Home ip={ip}/> },
        { path: "register", element: <Registration ip={ip}/> },
        { path: "i", element: <Demo /> },
        { path: "forgot_Password", element: <ForgotPassword ip={ip}/> },
        { path: "reset_Password", element: <ResetPassword ip={ip}/> },
      ],
    },
    {
      path: "dashboard",
      element: <Dashboard ip={ip}/>,
      children: [
        { path: "home", element: <Dashboardhome ip={ip}/> },
        { path: "edit/:id", element: <Editprofile ip={ip}/> },
        { path: "changepass", element: <Changepassword ip={ip}/> },
        { path: "listUser", element: <ListUser ip={ip}/> },
        { path: "staff_list", element: <StaffList ip={ip}/> },
        { path: "dept", element: <Department ip={ip}/> },
        { path: "course", element: <Course ip={ip}/> },
        { path: "staff_course", element: <Staffcourse ip={ip}/> },
        { path: "my_course", element: <Mycourse ip={ip}/> },
        { path: "student_course", element: <Studentscourse ip={ip}/> },
        { path: "my_stu_course", element: <Mystucourse ip={ip}/> },
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
