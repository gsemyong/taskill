import { hexToRgb } from "@/lib/utils";
import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export const Root = () => {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    WebApp.setBackgroundColor("secondary_bg_color");
    WebApp.setHeaderColor("secondary_bg_color");
    document.body.style.backgroundColor = "";

    const inlineStyle = document.documentElement.getAttribute("style");
    const hexColorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;
    const updatedInlineStyle = inlineStyle!.replace(hexColorRegex, (match) => {
      return hexToRgb(match)!;
    });

    document.body.setAttribute("style", updatedInlineStyle);
  }, []);

  return <Outlet />;
};
