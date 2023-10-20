import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";
import { orange } from "@radix-ui/colors";

export function useMainButton({
  show,
  onClick,
  text,
  color,
}:
  | {
      show: true;
      text: string;
      onClick: () => void;
      color?: string;
    }
  | {
      show: false;
      text?: string;
      onClick?: () => void;
      color?: string;
    }) {
  useEffect(() => {
    if (show) {
      WebApp.MainButton.setText(text);
      WebApp.MainButton.onClick(onClick);
      if (color) {
        WebApp.MainButton.setParams({
          color,
        });
      } else {
        WebApp.MainButton.setParams({
          color: orange.orange10,
        });
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
  }, [color, onClick, show, text]);
}
