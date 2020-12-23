import * as React from "react";

export const useTable = () => {
  const [filter, setFilter] = React.useState("");
  const [limit, setLimit] = React.useState<number>(10);
  const [orderProp, setOrderProp] = React.useState("id");
  const [orderDirection, setOrderDirection] = React.useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = React.useState(1);

  return {
    filter,
    setFilter,
    limit,
    setLimit,
    orderProp,
    setOrderProp,
    orderDirection,
    setOrderDirection,
    currentPage,
    setCurrentPage,
  };
};
