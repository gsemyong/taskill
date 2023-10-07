import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";

export function useMainButton({
  show,
  onClick,
  text,
}:
  | {
      show: true;
      text: string;
      onClick: () => void;
    }
  | {
      show: false;
      text?: undefined;
      onClick?: undefined;
    }) {
  useEffect(() => {
    if (show) {
      WebApp.MainButton.setText(text);
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
  }, [onClick, show, text]);
}
