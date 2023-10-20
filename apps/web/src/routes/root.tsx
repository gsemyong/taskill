import { WebApp } from "@grammyjs/web-app";
import { useThemeContext } from "@radix-ui/themes";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { mauve, mauveDark } from "@radix-ui/colors";

export const Root = () => {
  const theme = useThemeContext();

  useEffect(() => {
    WebApp.setHeaderColor(
      theme.appearance === "dark" ? mauveDark.mauve1 : mauve.mauve1,
    );
    WebApp.setBackgroundColor(
      theme.appearance === "dark" ? mauveDark.mauve1 : mauve.mauve1,
    );
    if (theme.appearance === "dark") document.body.classList.add("dark");
    document.body.setAttribute("style", "");
    WebApp.ready();
    WebApp.expand();
  }, [theme]);

  return <Outlet />;
};
