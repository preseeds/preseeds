import TokenList from "@components/tokenLists";

export default function Home() {
  return (
    <div className="text-center">
      <div>
        <button className="">Create Token</button>
      </div>
      <div>
        <button className="">How it works</button>
      </div>

      <TokenList />
    </div>
  );
}
