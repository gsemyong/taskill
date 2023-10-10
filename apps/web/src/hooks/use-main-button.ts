import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";
import colors from "tailwindcss/colors";

export function useMainButton({
  show,
  onClick,
  text,
  danger,
}:
  | {
      show: boolean;
      text: string;
      onClick: () => void;
      danger?: boolean;
    }
  | {
      show: false;
      text?: string;
      onClick?: () => void;
      danger?: boolean;
    }) {
  useEffect(() => {
    if (show) {
      WebApp.MainButton.setText(text);
      if (danger) {
        WebApp.MainButton.setParams({
          color: colors.rose["500"],
        });
      } else {
        WebApp.MainButton.setParams({
          color: WebApp.themeParams.button_color,
        });
      }
      WebApp.MainButton.onClick(onClick);
      WebApp.MainButton.show();
    } else {
      WebApp.MainButton.hide();
    }

    return () => {
      if (show) {
        WebApp.MainButton.offClick(onClick);
      }
    };
  }, [danger, onClick, show, text]);
}
