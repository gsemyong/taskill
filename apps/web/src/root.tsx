import { trpc } from "./lib/trpc";

const Root = () => {
  trpc.hello.useQuery();

  return <div>Hello!</div>;
};

export default Root;
