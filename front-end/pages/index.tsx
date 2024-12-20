import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Home: React.FC = () => {

  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="Event Planner" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center py-5">
        <section className="text-center">
          <h1 className="display-3 text-primary">{t('welcome')}</h1>
          <p className="lead text-muted">
            {t('home.description')}
          </p>
        </section>
      </main>
    </>
  );
};



export default Home;

