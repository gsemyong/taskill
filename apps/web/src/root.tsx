import { useEffect } from "react";
import { Button } from "./components/ui/button";
import { trpc } from "./lib/trpc";
import { WebApp } from "@grammyjs/web-app";

const Root = () => {
  const { data } = trpc.hello.useQuery();

  useEffect(() => {
    WebApp.expand();
  }, []);

  return (
    <div className="w-full h-full">
      <h1 className="text-5xl font-black">Hello</h1>
      <Button>Hello, {data?.text}!</Button>
    </div>
  );
};

export default Root;
