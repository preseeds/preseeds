import TokenList from "@components/tokenLists";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <div>
        <Link href="/create">[Create Token]</Link>
      </div>
      <div>
        <button className="">How it works</button>
      </div>

      <TokenList />
    </div>
  );
}
