import * as React from "react";
import { Table } from "components/Table";
import { useTable } from "components/useTable";
import { useCars } from "./useCars";
import { useDeleteCar } from "./useDeleteCar";
import { CreateCarModal } from "./CreateCarModal";
import { EditCarModal } from "./EditCarModal";

interface CarsProps {}

export const Cars: React.FC<CarsProps> = () => {
  const tableProps = useTable();
  const [selectedCar, setSelectedCar] = React.useState(null);

  const { cars, total, loading, error, refetch } = useCars({
    filter: `%${tableProps.filter}%`,
    limit: tableProps.limit,
    offset: (tableProps.currentPage - 1) * tableProps.limit,
    orderProp: tableProps.orderProp,
    orderDirection: tableProps.orderDirection,
  });
  const [deleteCar] = useDeleteCar({ afterDelete: refetch });
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeEditModalForm = () => setSelectedCar(null);
  const openModalForm = () => setModalOpen(true);
  const closeModalForm = () => setModalOpen(false);

  const carsData = React.useMemo(() => {
    if (!cars) return null;
    return cars.map((car) => ({
      ...car,
      id: car.id,
      air_condition: car.air_condition ? "+" : "-",
      updated_at: new Date(car.updated_at).toLocaleString(),
    }));
  }, [cars]);

  return (
    <>
      <Table
        title="Cars"
        description="Table of cars and related customers that came for maintenance. Uniquely identified by the field id and numbers. The owner_id field refers to client id from the clients table."
        {...tableProps}
        data={carsData}
        total={total}
        error={error}
        loading={loading}
        columns={[
          { prop: "id", type: "sort" },
          { prop: "numbers", type: "sort" },
          { prop: "name", type: "sort" },
          { prop: "owner_id", label: "ownerId", type: "sort" },
          { prop: "color", type: "sort" },
          { prop: "year", type: "sort" },
          { prop: "miles", type: "sort" },
          { prop: "comment", type: "sort" },
          { prop: "air_condition", label: "Air Condition", type: "sort" },
          { prop: "updated_at", label: "Last Modified", type: "sort" },
        ]}
        filterPlaceholder="Porsche Taycan"
        onEdit={setSelectedCar}
        onDelete={deleteCar}
        onAddNew={openModalForm}
        onRefetch={refetch}
      />

      <EditCarModal car={selectedCar} open={!!selectedCar} closeModal={closeEditModalForm} />
      <CreateCarModal open={modalOpen} closeModal={closeModalForm} />
    </>
  );
};
