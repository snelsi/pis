import * as React from "react";
import { Formik, Form } from "formik";
import { Modal } from "@geist-ui/react";

import { FormWrapper } from "components/assets";

interface SubmitResponse {
  ok: boolean;
  res?: any;
}
interface ModalFormProps {
  initialValues?: object;
  title: string | React.ReactElement;
  subTitle: string | React.ReactElement;
  onClose: () => void;
  onSubmit: (values: object) => Promise<SubmitResponse>;
  validate?: (values: object) => object;
  open: boolean;
  confirmText?: string | React.ReactElement;
}

export const ModalForm: React.FC<ModalFormProps> = ({
  initialValues = {},
  title,
  subTitle,
  onClose,
  onSubmit,
  validate,
  open,
  confirmText = "Save",
  children,
}) => {
  return (
    <Modal open={open} onClose={onClose} width="28rem">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const { ok } = await onSubmit(values);
          if (ok) {
            resetForm();
            onClose();
          }

          setSubmitting(false);
        }}
        validateOnBlur={false}
      >
        {({ isSubmitting }) => (
          <FormWrapper>
            <Modal.Title style={{ display: "block", textAlign: "start", justifyContent: "start" }}>
              {title}
            </Modal.Title>
            <Modal.Subtitle
              style={{
                display: "block",
                textAlign: "start",
                justifyContent: "start",
                textTransform: "none",
              }}
            >
              {subTitle}
            </Modal.Subtitle>
            <Form autoComplete="off">
              {children}
              <Modal.Action passive onClick={onClose}>
                Cancel
              </Modal.Action>
              <Modal.Action htmlType="submit" loading={isSubmitting}>
                {confirmText}
              </Modal.Action>
            </Form>
          </FormWrapper>
        )}
      </Formik>
    </Modal>
  );
};
