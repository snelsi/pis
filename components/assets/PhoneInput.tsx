import * as React from "react";
import Input from "react-phone-input-2";

import { Field } from "formik";

import { InputBase } from "./Input";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
  wide?: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  title,
  placeholder = "Write your text here",
  wide = false,
  ...props
}) => (
  <Field name={name}>
    {({ field: { onChange, ...fieldProps }, meta }) => (
      <InputBase data-wide={wide}>
        {title && <div className="inputTitle">{title}</div>}
        <Input
          disableDropdown={true}
          placeholder={placeholder}
          inputProps={{
            name,
            "data-error": !!(meta.touched && meta.error),
            required: true,
            ...props,
          }}
          {...fieldProps}
          onChange={(_value, _data, e) => onChange(e)}
          specialLabel={null}
        />
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
      </InputBase>
    )}
  </Field>
);
