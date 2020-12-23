import * as React from "react";
import dayjs from "dayjs";
import { Table } from "components/Table";
import { useTable } from "components/useTable";
import { useClients } from "./useClients";
import { useDeleteClient } from "./useDeleteClient";
import { CreateClientModal } from "./CreateClientModal";
import { EditClientModal } from "./EditClientModal";

interface ClientsProps {}

export const Clients: React.FC<ClientsProps> = () => {
  const tableProps = useTable();
  const [selectedClient, setSelectedClient] = React.useState(null);

  const { clients, total, loading, error, refetch } = useClients({
    filter: `%${tableProps.filter}%`,
    limit: tableProps.limit,
    offset: (tableProps.currentPage - 1) * tableProps.limit,
    orderProp: tableProps.orderProp,
    orderDirection: tableProps.orderDirection,
  });
  const [deleteClient] = useDeleteClient({ afterDelete: refetch });
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeEditModalForm = () => setSelectedClient(null);
  const openModalForm = () => setModalOpen(true);
  const closeModalForm = () => setModalOpen(false);

  const clientsData = React.useMemo(() => {
    if (!clients) return null;
    return clients.map((client) => ({
      ...client,
      id: client.id,
      birthday: dayjs(client.birthday).toLocaleString(),
      birthday_timestamp: client.birthday,
      updated_at: dayjs(client.updated_at).toLocaleString(),
    }));
  }, [clients]);

  return (
    <>
      <Table
        title="Clients"
        {...tableProps}
        data={clientsData}
        total={total}
        error={error}
        loading={loading}
        columns={[
          { prop: "id", type: "sort" },
          { prop: "name", type: "sort" },
          { prop: "phone", type: "sort" },
          { prop: "email", type: "sort" },
          { prop: "sex", type: "sort" },
          { prop: "comment", type: "sort" },
          { prop: "birthday", type: "sort" },
          { prop: "updated_at", label: "Last Modified", type: "sort" },
        ]}
        filterPlaceholder="Ivan Ivanov"
        onEdit={setSelectedClient}
        onDelete={deleteClient}
        onAddNew={openModalForm}
        onRefetch={refetch}
      />

      <EditClientModal
        client={
          selectedClient
            ? { ...selectedClient, birthday: selectedClient.birthday_timestamp }
            : selectedClient
        }
        open={!!selectedClient}
        closeModal={closeEditModalForm}
      />
      <CreateClientModal open={modalOpen} closeModal={closeModalForm} />
    </>
  );
};
