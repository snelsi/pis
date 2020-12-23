import * as React from "react";
import styled from "styled-components";
import { useField } from "formik";
import { Select as GeistSelect } from "@geist-ui/react";

import { InputBase } from "./Input";

const StyledBase = styled(InputBase)`
  & .select {
    border-radius: 4px;
    border: 1px solid var(--color-cool-gray-3);
    padding: 12px 20px;
    width: 100%;
  }
`;

interface SelectProps {
  name: string;
  title: string;
  wide?: boolean;
  placeholder?: string;
  options: { val: string; title: string | React.ReactElement }[];
}

export const Select: React.FC<SelectProps> = ({
  name,
  title,
  placeholder = "Choose one",
  wide = false,
  options,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { value, ...fieldProps } = field;

  return (
    <StyledBase data-wide={wide}>
      {title && <div className="inputTitle">{title}</div>}
      <GeistSelect
        placeholder={placeholder}
        value={value}
        {...fieldProps}
        {...props}
        onChange={(val) => helpers.setValue(val)}
        width="100%"
      >
        {options.map((option) => (
          <GeistSelect.Option value={option.val} key={option.val}>
            {option.title}
          </GeistSelect.Option>
        ))}
      </GeistSelect>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </StyledBase>
  );
};
