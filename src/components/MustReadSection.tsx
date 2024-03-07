import Post from "./Post";
import Section from "./Section";

const MustReadSection = () => {
  return (
    <div className="container my-20 max-w-6xl">
      <Section title="Must Read" href="/must-read">
        <Post mode="large" />
        <Post mode="large" />
        <Post mode="large" />
        <Post mode="small" />
        <Post mode="small" />
        <Post mode="small" />
      </Section>
    </div>
  );
};

export default MustReadSection;
