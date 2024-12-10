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
      <main className={styles.main}>
        <span>
          <h1>Welcome!</h1>
        </span>

        <div className={styles.description}>
          <p>
            Event Planner gives users oppertunities of participating an event of their choice. <br />
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;

