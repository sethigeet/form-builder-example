import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="text-2xl">Home page</h1>
      <Link href="/form">
        <button className="m-5 rounded-lg bg-blue-900 p-5 text-white">Go to FORM</button>
      </Link>
    </div>
  );
};

export default Home;
