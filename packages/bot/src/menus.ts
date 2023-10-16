import { Menu } from "@grammyjs/menu";
import { env } from "./env";

export const appsMenu = new Menu("apps-menu")
  .webApp("Customer dashboard", `${env.WEB_APP_URL}/customer`)
  .row()
  .webApp("Tasker dashboard", `${env.WEB_APP_URL}/tasker`)
  .row();
