import * as React from "react";
import { Dot } from "@geist-ui/react";

interface StatusProps {
  status: "Waiting" | "In Progress" | "Completed" | "Cancelled";
}

export const Status: React.FC<StatusProps> = ({ status }) => {
  if (status === "In Progress") {
    return (
      <Dot style={{ marginRight: "20px" }} type="warning">
        In Progress
      </Dot>
    );
  }
  if (status === "Completed") {
    return (
      <Dot style={{ marginRight: "20px" }} type="success">
        Completed
      </Dot>
    );
  }
  if (status === "Cancelled") {
    return (
      <Dot style={{ marginRight: "20px" }} type="error">
        Cancelled
      </Dot>
    );
  }
  return <Dot style={{ marginRight: "20px" }}>Waiting</Dot>;
};
