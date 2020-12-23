import * as React from "react";
import { Checkbox as GeistCheckbox } from "@geist-ui/react";
import { useField } from "formik";

import { InputBase } from "./Input";

interface CheckboxProps {
  name: string;
  title: string;
  wide?: boolean;
  size?: "medium" | "small" | "mini" | "large";
  required?: boolean;
  [x: string]: any;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  title,
  wide = false,
  size = "medium",
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  const { value, ...fieldProps } = field;

  return (
    <InputBase data-wide={wide}>
      <GeistCheckbox
        {...fieldProps}
        checked={value}
        onChange={(e) => helpers.setValue(e.target.checked)}
        size={size}
        {...props}
      >
        {title}
      </GeistCheckbox>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </InputBase>
  );
};
