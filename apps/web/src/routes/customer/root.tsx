import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.onClick(() => {
      navigate(-1);
    });

    WebApp.MainButton.onClick(() => {
      navigate("/customer/new");
    });

    WebApp.ready();
    WebApp.setBackgroundColor("secondary_bg_color");
    WebApp.setHeaderColor("secondary_bg_color");
    document.body.style.backgroundColor = "";
  }, [navigate]);

  return <Outlet />;
};

export default Root;
