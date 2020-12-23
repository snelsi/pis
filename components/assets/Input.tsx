import * as React from "react";
import styled from "styled-components";

import { Field } from "formik";

export const InputBase = styled.label`
  & .inputTitle {
    margin-bottom: 8px;
  }
  & input,
  & input.form-control,
  & textarea,
  & select {
    background: none;
    border-radius: 4px;
    border: 1px solid var(--color-cool-gray-3);
    display: block;
    transition: var(--transition-ease);
    font-size: 16px;
    line-height: 20px;
    outline: none;
    padding: 12px 20px;
    width: 100%;

    &::placeholder {
      color: var(--color-cool-gray-4);
    }

    &:hover,
    &:focus {
      border: 1px solid var(--color-blue-400);
    }

    &[data-error="true"] {
      border-color: var(--color-red-400);
    }
  }

  & textarea {
    min-height: 60px;
    height: 120px;
    max-height: 400px;
    resize: vertical;
  }

  & .error {
    color: red;
    margin-top: 8px;
  }
`;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  title?: string;
  wide?: boolean;
}

export const Input: React.FC<InputProps> = ({
  name,
  title,
  type = "text",
  placeholder = "Write your text here",
  wide = false,
  ...props
}) => (
  <Field name={name}>
    {({ field, meta }) => (
      <InputBase data-wide={wide}>
        {title && <div className="inputTitle">{title}</div>}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          required
          data-error={!!(meta.touched && meta.error)}
          {...props}
          {...field}
        />
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
      </InputBase>
    )}
  </Field>
);
