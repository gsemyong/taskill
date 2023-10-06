import { WebApp } from "@grammyjs/web-app";
import { useEffect } from "react";

export const useBackButton = (show: boolean) => {
  useEffect(() => {
    if (show) {
      WebApp.BackButton.show();
    } else {
      WebApp.BackButton.hide();
    }
  }, [show]);
};
