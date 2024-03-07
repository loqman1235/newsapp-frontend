import Post from "./Post";
import Section from "./Section";

const LatestPostsSection = () => {
  return (
    <div className="container my-20 max-w-6xl">
      <Section title="Latest News" href="/news">
        <Post mode="large" />
        <Post mode="large" />
        <Post mode="large" />
        <Post mode="large" />
        <Post mode="small" />
        <Post mode="small" />
        <Post mode="small" />
        <Post mode="small" />
      </Section>
    </div>
  );
};

export default LatestPostsSection;
