import Head from "next/head";
import styled from "styled-components";
import { Tickets } from "components/Tickets/Tickets";
import { Cars } from "components/Cars/Cars";
import { Clients } from "components/Clients/Clients";
import { Header } from "components/Header";

const Main = styled.main`
  padding: min(15vw, 80px) 0;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Data Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Main>
        <Tickets />
        <Clients />
        <Cars />
      </Main>
    </div>
  );
}
