import * as React from "react";
import dayjs from "dayjs";
import { Table } from "components/Table";
import { useTable } from "components/useTable";
import { useTickets } from "./useTickets";
import { useDeleteTicket } from "./useDeleteTicket";
import { CreateTicketModal } from "./CreateTicketModal";
import { EditTicketModal } from "./EditTicketModal";
import { Status } from "./Status";

interface TicketsProps {}

export const Tickets: React.FC<TicketsProps> = () => {
  const tableProps = useTable();
  const [selectedTicket, setSelectedTicket] = React.useState(null);

  const { tickets, total, loading, error, refetch } = useTickets({
    filter: `%${tableProps.filter}%`,
    limit: tableProps.limit,
    offset: (tableProps.currentPage - 1) * tableProps.limit,
    orderProp: tableProps.orderProp,
    orderDirection: tableProps.orderDirection,
  });
  const [deleteTicket] = useDeleteTicket({ afterDelete: refetch });
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeEditModalForm = () => setSelectedTicket(null);
  const openModalForm = () => setModalOpen(true);
  const closeModalForm = () => setModalOpen(false);

  const ticketsData = React.useMemo(() => {
    if (!tickets) return null;
    return tickets.map((ticket) => ({
      ...ticket,
      id: ticket.id,
      updated_at: dayjs(ticket.updated_at).toLocaleString(),
      status: <Status status={ticket.status} />,
      status_value: ticket.status,
    }));
  }, [tickets]);

  return (
    <>
      <Table
        title="Tickets"
        {...tableProps}
        data={ticketsData}
        total={total}
        error={error}
        loading={loading}
        columns={[
          { prop: "id", type: "sort" },
          { prop: "car_id", type: "sort" },
          { prop: "client_id", type: "sort" },
          { prop: "charges", type: "sort" },
          { prop: "description", type: "sort" },
          { prop: "feedback", type: "sort" },
          { prop: "status", type: "sort" },
          { prop: "updated_at", label: "Last Modified", type: "sort" },
        ]}
        filterName="description"
        filterPlaceholder="Engine repair"
        onEdit={setSelectedTicket}
        onDelete={deleteTicket}
        onAddNew={openModalForm}
        onRefetch={refetch}
      />

      <EditTicketModal
        ticket={selectedTicket}
        open={!!selectedTicket}
        closeModal={closeEditModalForm}
      />
      <CreateTicketModal open={modalOpen} closeModal={closeModalForm} />
    </>
  );
};
