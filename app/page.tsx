import TokenList from "@components/tokenLists";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <div className="font-bold text-xl hover:text-blue-600">
        <Link href="/create">[Create Token]</Link>
      </div>
      <div>
        <button className="">How it works</button>
      </div>

      <TokenList />
    </div>
  );
}
