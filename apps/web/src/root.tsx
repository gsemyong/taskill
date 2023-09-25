import { Button } from "./components/ui/button";
import { trpc } from "./lib/trpc";

const Root = () => {
  const { data } = trpc.hello.useQuery();

  return (
    <div className="w-full h-full">
      <h1 className="text-5xl font-black">Hello</h1>
      <Button>Hello, {data?.text}!</Button>
    </div>
  );
};

export default Root;
