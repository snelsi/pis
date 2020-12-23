import * as React from "react";
import styled from "styled-components";

const Fieldset = styled.fieldset`
  border: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
  & .grid {
    margin-top: 8px;
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr 1fr;
  }
`;

import { Cell } from "components/assets";
import { useField } from "formik";

interface SexProps {}

export const Sex: React.FC<SexProps> = () => {
  const [field, , helpers] = useField("sex");

  return (
    <Fieldset data-wide>
      <legend>Sex</legend>
      <div className="grid">
        <Cell id="Male" title="Male" field={field} onChange={() => helpers.setValue("Male")} />
        <Cell
          id="Female"
          title="Female"
          field={field}
          onChange={() => helpers.setValue("Female")}
        />
      </div>
    </Fieldset>
  );
};
