import * as React from "react";
import styled from "styled-components";
import { Button, Modal, Input, Spinner } from "@geist-ui/react";
import { useField } from "formik";
import { X } from "@geist-ui/react-icons";

import { Car as ICar } from "interfaces";
import useDebounce from "scripts/useDebounce";
import { useCar } from "components/Cars/useCar";
import { useCars } from "components/Cars/useCars";
import { InputBase } from "components/assets/Input";

const CarWrapper = styled.div`
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

  & .car-placeholder {
    color: var(--color-cool-gray-4);
  }
  & .car-data {
    text-align: start;
    & .car-numbers {
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

interface CarProps extends React.HTMLAttributes<HTMLDivElement> {
  car: ICar;
  placeholder?: string;
  onClick?: () => void;
  onClear?: () => void;
  [x: string]: any;
}
const Car: React.FC<CarProps> = ({
  car,
  placeholder = "Car placeholder",
  onClick,
  onClear,
  ...props
}) => (
  <CarWrapper {...props}>
    <button className="base-select" type="button" onClick={onClick}>
      <div className="car-data">
        {car?.name ? (
          <div className="car-name">{car.name}</div>
        ) : (
          <div className="car-placeholder">{placeholder}</div>
        )}
        {car?.numbers && <div className="car-numbers">{car.numbers}</div>}
      </div>
    </button>
    {car && onClear && (
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
  </CarWrapper>
);

interface SelectCarProps {
  fieldName?: string;
}

export const SelectCar: React.FC<SelectCarProps> = ({ fieldName = "car_id" }) => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");
  const [field, meta, helpers] = useField(fieldName);

  const debouncedFilter = useDebounce(filter, 250);
  const carId = field?.value;

  const { car, loading } = useCar(carId);
  const { cars } = useCars({ filter: `%${debouncedFilter}%` });

  return (
    <>
      <InputBase data-wide>
        <div className="inputTitle">Client</div>
        <Car
          car={car}
          onClick={() => setOpen(true)}
          onClear={() => helpers.setValue(null)}
          data-show-border
          placeholder="Select a car"
        />
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
      </InputBase>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Title style={{ display: "block", textAlign: "start", justifyContent: "start" }}>
          Assigned car
        </Modal.Title>
        <Modal.Subtitle
          style={{
            display: "block",
            textAlign: "start",
            justifyContent: "start",
            textTransform: "none",
          }}
        >
          Select car to assign ticket to
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

            {!cars?.length && loading && <Spinner />}
            {cars?.map((car) => (
              <Car
                car={car}
                onClick={() => {
                  helpers.setValue(car.id);
                  setOpen(false);
                }}
                key={car.id}
              />
            ))}
          </Grid>
        </Modal.Content>
      </Modal>
    </>
  );
};
