import * as React from "react";

import { Field } from "formik";

import { InputBase } from "./Input";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  title: string;
  wide?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  name,
  title,
  placeholder = "Write your text here",
  wide = false,
  ...props
}) => (
  <Field name={name}>
    {({ field, meta }) => (
      <InputBase data-wide={wide}>
        {title && <div className="inputTitle">{title}</div>}
        <textarea placeholder={placeholder} required {...field} {...props} />
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
      </InputBase>
    )}
  </Field>
);
