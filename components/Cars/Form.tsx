import * as React from "react";
import { Input, TextArea, Checkbox } from "components/assets";
import { SelectClient } from "./SelectClient";

interface FormProps {}

export const Form: React.FC<FormProps> = () => (
  <>
    <Input name="numbers" title="Numbers" placeholder="AA 1234 BB" wide />
    <Input name="name" title="Name" placeholder="Toyota Prima" wide />
    <SelectClient />
    <Input name="color" title="Color" placeholder="Gray" wide />
    <Input
      name="year"
      title="Year"
      type="number"
      placeholder="2016"
      min={1900}
      max={2099}
      step={1}
      wide
    />
    <Input name="miles" title="Miles" type="number" min={0} placeholder="40000" step={0.1} wide />

    <TextArea
      name="comment"
      title="Comment"
      placeholder="Write your annotations here"
      wide
      required={false}
    />

    <Checkbox name="air_condition" title="Air Condition" wide required={false} />
  </>
);
