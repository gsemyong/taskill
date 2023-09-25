import { Button } from "./components/ui/button";
import { trpc } from "./lib/trpc";

const Root = () => {
  trpc.hello.useQuery();

  return (
    <div className="w-full h-full">
      <h1 className="text-5xl font-black">Hello</h1>
      <Button>Hello, world!</Button>
    </div>
  );
};

export default Root;
