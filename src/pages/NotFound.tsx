import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <h1 className="text-8xl font-extrabold tracking-tighter">404 :(</h1>
      <p className="text-xl text-muted-foreground">
        Page Not Found.{" "}
        <Link className="text-primary" to="/">
          Go Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
