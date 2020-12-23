import * as React from "react";
import styled from "styled-components";
import { Radio } from "components/assets";

interface CellProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: {
    name: string;
    value: string;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  };
  id: string;
  title: string;
}
export const Cell: React.FC<CellProps> = ({
  field: { value, ...fieldProps },
  id,
  title,
  ...props
}) => (
  <Container data-checked={id === value}>
    <Radio value={id} checked={id === value} {...fieldProps} {...props} type="radio" />
    <span className="cellLabel">{title}</span>
  </Container>
);

const Container = styled.label`
  align-items: center;
  border: 1px solid var(--color-cool-gray-3);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition: all var(--transition-ease);
  padding: 12px;
  width: 100%;

  :hover,
  :focus-within {
    border-color: var(--color-blue-500);
  }

  &[data-checked="true"] {
    border-color: #3056de;
  }

  & span {
    margin-top: 4px;
    font-size: 0.9em;
  }
`;
