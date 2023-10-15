import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";
import colors from "tailwindcss/colors";

export function useMainButton({
  show,
  onClick,
  text,
  danger,
  progress,
}:
  | {
      show: true;
      text: string;
      onClick: () => void;
      danger?: boolean;
      progress?: boolean;
    }
  | {
      show: false;
      text?: string;
      onClick?: () => void;
      danger?: boolean;
      progress?: boolean;
    }) {
  useEffect(() => {
    if (show) {
      WebApp.MainButton.setText(text);
      WebApp.MainButton.onClick(onClick);
      if (danger) {
        WebApp.MainButton.setParams({
          color: colors.rose["500"],
        });
      } else {
        WebApp.MainButton.setParams({
          color: WebApp.themeParams.button_color,
        });
      }
      if (progress) {
        WebApp.MainButton.showProgress();
      } else {
        WebApp.MainButton.hideProgress();
      }
      WebApp.MainButton.show();
    } else {
      WebApp.MainButton.hide();
    }

    return () => {
      if (show) {
        WebApp.MainButton.offClick(onClick);
      }
    };
  }, [danger, progress, onClick, show, text]);
}
