import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";

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

  window.onbeforeunload = function() {
    sessionStorage.clear();
  };
  

  if (sessiondata) {
    return (
      <div>
        <h1>ResetPassword {data?.email}</h1>
      </div>
    );
  } else {
    return <ErrorPage />;
  }
}

export default ResetPassword;
