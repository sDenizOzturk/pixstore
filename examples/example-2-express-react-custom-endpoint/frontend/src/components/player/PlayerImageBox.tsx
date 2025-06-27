import type { Status } from "./PlayerCard";

const PlayerImageBox = ({
  imageUrl,
  status,
  alt,
}: {
  imageUrl: string;
  status: Status;
  alt: string;
}) => {
  if (imageUrl)
    return (
      <img
        src={imageUrl}
        alt={alt}
        style={{ width: 100, height: 100, objectFit: "cover" }}
      />
    );
  if (status === "loading")
    return (
      <div
        style={{
          width: 100,
          height: 100,
          background: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        Loading...
      </div>
    );
  return (
    <div
      style={{
        width: 100,
        height: 100,
        background: "#e1e1e1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#888",
        margin: "auto",
      }}
    >
      No Image
    </div>
  );
};

export default PlayerImageBox;
