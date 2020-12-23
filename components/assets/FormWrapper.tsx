import styled from "styled-components";

export const FormWrapper = styled.div`
  text-align: start;
  & form {
    margin-top: 1em;
    display: grid;
    gap: 16px;
    text-align: start;

    @media (min-width: 640px) {
      grid-template-columns: 1fr 1fr;

      & *[data-wide="true"] {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }

    & > .error {
      color: red;
    }

    & > label:last-of-type {
      margin-bottom: 14px;
    }

    & .actions {
      margin-top: 14px;
      display: flex;

      & .action-back {
        background: none;
        color: var(--color-gray-5);
        box-shadow: none !important;

        &:hover {
          color: var(--color-gray-8);
        }
        &:disabled {
          opacity: 0;
        }
      }
    }

    & .aside-note {
      color: rgba(0, 0, 0, 0.65);
    }
  }

  & .formPrevSteps {
    display: none;
  }
`;
