import styled from "styled-components";
import { Tumbler } from "./Tumbler";

export const Radio = styled(Tumbler).attrs({ type: "radio" })`
  border-radius: 50%;

  &:after {
    background-color: #fff;
    border-radius: 50%;
    content: "";
    display: block;
    height: 15px;
    width: 15px;
    transition: transform 0.3s ease, opacity 0.2s;

    opacity: 0;
    transform: scale(0.7);
  }
  &:checked {
    &::after {
      opacity: 1;
      transform: scale(0.5);
    }
  }
`;
