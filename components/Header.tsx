import * as React from "react";
import styled from "styled-components";
import { Button } from "@geist-ui/react";

const StyledHeader = styled.header`
  box-shadow: inset 0 -1px #eaeaea;
  padding: 0.75rem 0 1rem;

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    & h1 {
      margin: 0;
      font-size: 2.4rem;
    }

    & button {
      overflow: visible;
      & span {
        font-size: 1.5rem;
        transition: all 0.4s ease;
        transform: rotate(0deg);
      }
      &:hover,
      &:focus {
        & span {
          transform: rotate(20deg);
        }
      }
      &:focus:not(:focus-visible) {
        & span {
          transform: rotate(0deg);
        }
      }
      &[data-mode="true"] {
        & span {
          transform: rotate(720deg);
        }
        &:hover,
        &:focus {
          & span {
            transform: rotate(700deg);
          }
        }
        &:focus:not(:focus-visible) {
          & span {
            transform: rotate(720deg);
          }
        }
      }
    }
  }
`;

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [state, setState] = React.useState(false);
  return (
    <StyledHeader>
      <div data-fix-width>
        <h1>Data Dashboard</h1>
        <Button onClick={() => setState(!state)} data-mode={state} type="abort" auto>
          <span role="img" aria-label="unicorn">
            🦄
          </span>
        </Button>
      </div>
    </StyledHeader>
  );
};
