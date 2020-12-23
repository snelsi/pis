import * as React from "react";
import styled from "styled-components";
import { Button, Modal, Input, Spinner } from "@geist-ui/react";
import { useField } from "formik";
import { X } from "@geist-ui/react-icons";

import { Client as IClient } from "interfaces";
import useDebounce from "scripts/useDebounce";
import { useClient } from "components/Clients/useClient";
import { useClients } from "components/Clients/useClients";
import { InputBase } from "components/assets/Input";

const ClientWrapper = styled.div`
  border: none;
  border-radius: 4px;
  position: relative;
  width: 100%;

  & .base-select {
    align-items: center;
    background: none;
    border: none;
    border-radius: inherit;
    cursor: pointer;
    display: flex;
    height: 48px;
    padding: 8px 16px;
    transition: all 0.2s ease-out;
    width: 100%;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  & .clear-button {
    align-items: center;
    display: flex;
    justify-content: center;
    position: absolute;
    top: 4px;
    right: 0;
    opacity: 0;
    z-index: 1;

    & svg {
      height: 18px;
      width: 18px;
    }
  }
  &:hover .clear-button {
    opacity: 1;
  }

  &[data-show-border] .base-select {
    border: 1px solid var(--color-cool-gray-3);
  }

  & .client-placeholder {
    color: var(--color-cool-gray-4);
  }
  & .client-data {
    text-align: start;
    & .client-phone {
      font-size: 12px;
      line-height: 16px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 8px;
  padding: 1em 0;

  & .input-container {
    margin-bottom: 1em;
    width: 100%;
  }
`;

interface ClientProps extends React.HTMLAttributes<HTMLDivElement> {
  client: IClient;
  placeholder?: string;
  onClick?: () => void;
  onClear?: () => void;
  [x: string]: any;
}
const Client: React.FC<ClientProps> = ({
  client,
  placeholder = "Client placeholder",
  onClick,
  onClear,
  ...props
}) => (
  <ClientWrapper {...props}>
    <button className="base-select" type="button" onClick={onClick}>
      <div className="client-data">
        {client?.name ? (
          <div className="client-name">{client.name}</div>
        ) : (
          <div className="client-placeholder">{placeholder}</div>
        )}
        {client?.phone && <div className="client-phone">{client.phone}</div>}
      </div>
    </button>
    {client && onClear && (
      <Button
        className="clear-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClear();
        }}
        type="abort"
        auto
      >
        <X />
      </Button>
    )}
  </ClientWrapper>
);

interface SelectClientProps {
  fieldName?: string;
}

export const SelectClient: React.FC<SelectClientProps> = ({ fieldName = "owner_id" }) => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [field, meta, helpers] = useField(fieldName);

  const debouncedFilter = useDebounce(filter, 250);
  const ownerId = field?.value;

  const { client: owner, loading } = useClient(ownerId);
  const { clients } = useClients({ filter: `%${debouncedFilter}%` });

  return (
    <>
      <InputBase data-wide>
        <div className="inputTitle">Client</div>
        <Client
          client={owner}
          onClick={() => setOpen(true)}
          data-show-border
          placeholder="Select an owner"
          onClear={() => helpers.setValue(null)}
        />
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
      </InputBase>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Title style={{ display: "block", textAlign: "start", justifyContent: "start" }}>
          Assigned client
        </Modal.Title>
        <Modal.Subtitle
          style={{
            display: "block",
            textAlign: "start",
            justifyContent: "start",
            textTransform: "none",
          }}
        >
          Select client to assign car to
        </Modal.Subtitle>
        <Modal.Content style={{ minHeight: "65vh" }}>
          <Grid>
            <Input
              placeholder="Search"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
            />

            {!clients?.length && loading && <Spinner />}
            {clients?.map((client) => (
              <Client
                client={client}
                onClick={() => {
                  helpers.setValue(client.id);
                  setOpen(false);
                }}
                key={client.id}
              />
            ))}
          </Grid>
        </Modal.Content>
      </Modal>
    </>
  );
};
