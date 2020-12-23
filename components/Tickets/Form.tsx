import * as React from "react";
import { Input, TextArea, Select } from "components/assets";
import { SelectClient } from "components/Cars/SelectClient";
import { SelectCar } from "./SelectCar";
import { Status } from "./Status";

export const Form: React.FC = () => (
  <>
    <Select
      name="status"
      title="Ticket Status"
      options={[
        { val: "Waiting", title: <Status status="Waiting" /> },
        { val: "In Progress", title: <Status status="In Progress" /> },
        { val: "Completed", title: <Status status="Completed" /> },
        { val: "Cancelled", title: <Status status="Cancelled" /> },
      ]}
      wide
    />

    <SelectClient fieldName="client_id" />
    <SelectCar fieldName="car_id" />

    <Input
      name="charges"
      title="Charges"
      type="number"
      min={0}
      placeholder="120.00"
      step={0.1}
      wide
    />

    <TextArea
      name="description"
      title="Description"
      placeholder="Write ticket annotations here"
      wide
      required={false}
    />

    <Input name="feedback" title="Client feedback" wide />
  </>
);
