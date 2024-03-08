import { Link } from "react-router-dom";

const breakingNewsData = [
  {
    title: "Breaking: Bitcoin price reaches $50,000",
    link: "/news/bitcoin-price-reaches-50000",
  },
  {
    title: "Breaking: Ethereum price reaches $1,000",
    link: "/news/ethereum-price-reaches-1000",
  },
  {
    title: "Breaking: Dogecoin price reaches $1,000",
    link: "/news/dogecoin-price-reaches-1000",
  },
];

const BreakingNewsBar = () => {
  return (
    <div className="mb-5 w-full">
      <div className="container flex max-w-6xl items-center gap-2">
        <div className="flex h-12 w-full items-center bg-background shadow">
          <h1 className="flex h-full w-fit items-center justify-center bg-red-600 px-5 font-medium text-white">
            Breaking
          </h1>

          {/* Breaking News container */}
          <div className="flex h-full w-full items-center justify-center gap-10">
            {breakingNewsData.map((item, index) => (
              <div key={index}>
                <Link to={item.link}>{item.title}</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;
