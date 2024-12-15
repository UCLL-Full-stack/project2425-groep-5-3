import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="description" content="Event Planner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center py-5">
        <section className="text-center">
          <h1 className="display-3 text-primary">Welcome to Event Planner!</h1>
          <p className="lead text-muted">
            Event Planner gives users opportunities to participate in events of their choice.
          </p>
        </section>
      </main>
    </>
  );
};

export default Home;

