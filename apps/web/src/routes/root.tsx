import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Root = () => {
  const navigate = useNavigate();

  useEffect(() => {
    WebApp.BackButton.onClick(() => {
      if (
        window.location.pathname.startsWith("/tasker/discover") ||
        window.location.pathname.startsWith("/customer/new")
      ) {
        navigate(-2);
      } else {
        navigate(-1);
      }
    });

    WebApp.MainButton.onClick(() => {
      if (window.location.pathname.startsWith("/customer")) {
        navigate("/customer/new");
      }

      if (window.location.pathname.startsWith("/tasker")) {
        navigate("/tasker/discover");
      }
    });

    WebApp.ready();
    WebApp.setBackgroundColor("secondary_bg_color");
    WebApp.setHeaderColor("secondary_bg_color");
    document.body.style.backgroundColor = "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Outlet />;
};

export default Root;
