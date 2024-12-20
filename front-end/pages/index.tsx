import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import UserOverviewTable from "@/components/users/UserOverviewTable";
import { User } from "@/types";

const Home: React.FC = () => {

  const { t } = useTranslation("common");
  const exampleUsers: Array<User> = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "guest", password: "guest123", role: "guest" },
    { username: "participant", password: "participant123", role: "participant" },
  ];

  return (
    <>
      <Head>
        <title>Event Planner</title>
        <meta name="description" content="Event Planner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center py-5">
        <section className="text-center">
          <h1 className="display-3 text-primary">Welcome to event planner!</h1>
          <UserOverviewTable users={exampleUsers} />
        </section>
      </main>
    </>
  );
};



export default Home;

