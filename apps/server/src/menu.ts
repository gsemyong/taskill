import { Menu } from "@grammyjs/menu";

export const appsMenu = new Menu("apps-menu")
  .webApp(
    "Customer dashboard",
    "https://elegant-corgi-obviously.ngrok-free.app/customer"
  )
  .row()
  .webApp(
    "Tasker dashboard",
    "https://elegant-corgi-obviously.ngrok-free.app/tasker"
  )
  .row();
