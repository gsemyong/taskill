import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";

export const useBackButton = ({
  show,
  onClick,
}:
  | {
      show: true;
      onClick: () => void;
    }
  | {
      show: false;
      onClick?: undefined;
    }) => {
  useEffect(() => {
    if (show) {
      WebApp.BackButton.onClick(onClick);
      WebApp.BackButton.show();
    } else {
      WebApp.BackButton.hide();
    }

    return () => {
      if (show) {
        WebApp.BackButton.offClick(onClick);
      }
    };
  }, [onClick, show]);
};
