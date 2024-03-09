import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const breakingNewsData = [
  {
    title: "News title one",
    link: "/news-title-one",
  },
  {
    title: "News title two",
    link: "/news-title-two",
  },
  {
    title: "News title three",
    link: "/news-title-three",
  },
];

const BreakingNewsBar = () => {
  const [tickerContainerTransVal, setTickerContainerTransVal] = useState(0);
  const tickerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let direction = 1; // Initial direction for scrolling (1 for increment, -1 for decrement)

    const interval = setInterval(() => {
      setTickerContainerTransVal((prev) => {
        // Switch direction when reaching the end or beginning
        if (prev >= (breakingNewsData.length - 1) * 100) {
          direction = -1;
        } else if (prev <= 0) {
          direction = 1;
        }

        // Increment or decrement by 100 based on direction
        return prev + direction * 100;
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="sticky top-0 z-40 mb-5 w-full">
      <div className="container flex max-w-6xl items-center gap-2">
        <div className="flex h-12 w-full items-center overflow-hidden  bg-background shadow">
          <h1 className="flex h-full w-fit items-center justify-center bg-red-600 px-5 font-medium text-white">
            Breaking
          </h1>

          {/* Breaking News container */}
          <div
            ref={tickerContainerRef}
            className="relative z-40 h-full w-full px-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateY(-${tickerContainerTransVal}%)` }}
          >
            {breakingNewsData.map((item, index) => (
              <div key={item.link + "-" + index} className="h-full">
                <Link className=" flex h-12 items-center" to={item.link}>
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBar;
