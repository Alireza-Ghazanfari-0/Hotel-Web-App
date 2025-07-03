import { LoaderIcon } from "react-hot-toast";

function Loader() {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <span>Loading Data </span>{" "}
      <span>
        <LoaderIcon style={{ width: "1.5rem", height: "1.5rem" }} />
      </span>
    </div>
  );
}

export default Loader;
