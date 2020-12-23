import * as React from "react";
import styled from "styled-components";
import {
  Table as GeistTable,
  Spinner,
  Pagination,
  Input,
  Button,
  Text,
  Select,
} from "@geist-ui/react";
import { Plus, ChevronDown, ChevronUp, Edit, X, RefreshCw } from "@geist-ui/react-icons";
import { ApolloError } from "@apollo/client";

const TableWrapper = styled.div`
  margin-bottom: min(8vw, 92px);
  overflow: hidden;
  width: 100%;

  & .table-header {
    align-items: center;
    display: flex;
    margin-bottom: 1em;

    & > div.header-text {
      & > * {
        display: inline-block;
      }
      & .total {
        margin-left: 0.5em;
      }
    }
    & * {
      margin-top: 0;
      margin-bottom: 0;
    }

    & .spinner {
      margin-left: 0.5em;
    }
  }

  & .description {
    max-width: 640px;
    opacity: 0.9;
    margin-bottom: 1.5em;
  }

  & .table-actions {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;

    & .add-new-btn {
      margin-left: auto;
    }
    & .refetch-btn {
      margin-left: auto;
      padding: 0 0.85rem;
      & + .add-new-btn {
        margin-left: 0;
      }
    }

    @media (max-width: 640px) {
      & > * {
        width: 100%;

        & .input-container {
          width: 100%;
        }
        &.select {
          max-width: none;
        }
      }
    }
  }

  & .table-frame {
    overflow: auto;
    margin-top: 20px;
    margin-bottom: 20px;

    @media (max-width: 640px) {
      width: 100%;
    }
    & th button {
      text-align: start;
      padding: 0;
      width: 100%;
    }
    & tr {
      cursor: pointer;
      & .row-actions {
        opacity: 0;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        & button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1rem;
        }

        @media (hover: none) {
          opacity: 1;
        }
      }

      & .cell {
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        min-height: 0;
        margin: 0.5em 0;
      }
      &:hover {
        & .row-actions {
          opacity: 1;
          & .delete-button {
            &:hover {
              color: #e00;
            }
          }
        }
      }
    }
  }
`;

const SortColumn = ({ prop, label = null, handleTabClick, orderProp, orderDirection }) => (
  <GeistTable.Column prop={prop}>
    <Button onClick={() => handleTabClick(prop)} type="abort" auto>
      {label || prop}
      {prop === orderProp &&
        (orderDirection === "asc" ? <ChevronDown size={16} /> : <ChevronUp size={16} />)}
    </Button>
  </GeistTable.Column>
);

interface TableProps {
  title: string | React.ReactElement;
  description?: string | React.ReactElement;
  data:
    | {
        id: number;
        [prop: string]: any;
      }[]
    | null;
  total: number;
  error: ApolloError;
  loading: boolean;
  columns: { prop: string; label?: string; type?: "sort" | "action" }[];
  filter: string;
  filterName?: string;
  filterPlaceholder: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  orderProp: string;
  setOrderProp: React.Dispatch<React.SetStateAction<string>>;
  orderDirection: "asc" | "desc";
  setOrderDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  onDelete?: (id: number) => void;
  onEdit?: (row: { id: number; [prop: string]: any }) => void;
  onAddNew?: () => void;
  onRefetch?: () => void;
}

export const Table: React.FC<TableProps> = ({
  title,
  description,
  data,
  total,
  error,
  loading,
  columns,
  filter,
  filterPlaceholder,
  setFilter,
  limit,
  setLimit,
  orderProp,
  setOrderProp,
  orderDirection,
  setOrderDirection,
  currentPage,
  setCurrentPage,
  onDelete,
  onEdit,
  onAddNew,
  onRefetch,
  filterName = "name",
}) => {
  const totalPages = React.useMemo(() => Math.ceil(total / limit), [total, limit]);

  const tableData = React.useMemo(() => {
    if (!data) return null;
    return data.map((row) => ({
      ...row,
      _actions: (
        // eslint-disable-next-line
        <div className="row-actions" onClick={(e) => e.stopPropagation()}>
          {onEdit ? (
            <Button onClick={() => onEdit(row)} type="abort" auto className="edit-button">
              <Edit size={18} />
            </Button>
          ) : undefined}
          {onDelete ? (
            <Button onClick={() => onDelete(row.id)} type="abort" auto className="delete-button">
              <X size={18} />
            </Button>
          ) : undefined}
        </div>
      ),
    }));
  }, [data]);

  const handleTabClick = (name: string) => {
    if (orderProp !== name) {
      setOrderProp(name);
      setOrderDirection("asc");
    } else {
      setOrderDirection((state) => (state === "asc" ? "desc" : "asc"));
    }
  };

  return (
    <TableWrapper>
      <div data-fix-width>
        <div className="table-header">
          <div className="header-text">
            <h3>{title}</h3>
            {typeof total === "number" && (
              <Text type="secondary" className="total">
                {total}
              </Text>
            )}
          </div>
          {loading && <Spinner size="medium" />}
        </div>
        {error && <Text type="error">{error.message}</Text>}

        {description && (
          <Text p className="description">
            {description}
          </Text>
        )}

        <div className="table-actions">
          <Input
            placeholder={filterPlaceholder}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            label={filterName}
          />
          <Select value={String(limit)} onChange={(val) => setLimit(Number(val))}>
            <Select.Option value="5">5 rows</Select.Option>
            <Select.Option value="10">10 rows</Select.Option>
            <Select.Option value="20">20 rows</Select.Option>
            <Select.Option value="25">25 rows</Select.Option>
            <Select.Option value="50">50 rows</Select.Option>
            <Select.Option value="100">100 rows</Select.Option>
          </Select>

          {onRefetch && (
            <Button auto onClick={onRefetch} icon={<RefreshCw />} className="refetch-btn" />
          )}
          {onAddNew && (
            <Button
              auto
              onClick={onAddNew}
              icon={<Plus />}
              type="secondary-light"
              className="add-new-btn"
            >
              Add new
            </Button>
          )}
        </div>
      </div>
      <div className="table-frame" data-fix-width>
        <GeistTable
          data={tableData}
          onRow={(row) => {
            onEdit?.(row);
          }}
        >
          {columns.map((column) => {
            if (column.type === "sort") {
              return (
                <SortColumn
                  {...column}
                  handleTabClick={handleTabClick}
                  orderProp={orderProp}
                  orderDirection={orderDirection}
                  key={column.prop}
                />
              );
            }
            return <GeistTable.Column {...column} key={column.prop} />;
          })}
          {(onEdit || onDelete) && <GeistTable.Column prop="_actions" />}
        </GeistTable>
      </div>
      {typeof totalPages === "number" && totalPages > 1 && (
        <div data-fix-width>
          <Pagination count={totalPages} page={currentPage} onChange={setCurrentPage} />
        </div>
      )}
    </TableWrapper>
  );
};
