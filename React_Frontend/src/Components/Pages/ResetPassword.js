import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [data, setData] = useState();

  const sessiondata = sessionStorage.getItem("forgotdata");

  useEffect(() => {
    if (sessiondata) {
      const datas = sessiondata ? JSON.parse(sessiondata) : {};
      setData(datas);
      console.log("reset_session:", datas);
    }
  }, [sessiondata]);

  const navigate = useNavigate();

  window.onbeforeunload = function () {
    sessionStorage.clear();
  };
  window.onpopstate = function () {
    sessionStorage.clear();
    navigate("/");
  };
  const error = "Access Denied to Reset the Password";

  useEffect(() => {
    if (!sessiondata) {
      navigate("/error");
    }
  }, [!sessiondata]);

  if (sessiondata) {
    return (
      <div>
        <h1>ResetPassword {data?.email}</h1>
      </div>
    );
  }
}

export default ResetPassword;
