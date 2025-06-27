import type { Status } from "./PlayerCard";

const PlayerCardWrapper = ({
  children,
  status,
}: {
  children: React.ReactNode;
  status: Status;
}) => (
  <div
    style={{
      border: "1px solid #ccc",
      borderRadius: 6,
      padding: 10,
      width: 180,
      textAlign: "center",
      background: status === "unauthorized" ? "#eee" : "#fff",
      opacity: status === "loading" ? 0.6 : 1,
    }}
  >
    {children}
  </div>
);

export default PlayerCardWrapper;
