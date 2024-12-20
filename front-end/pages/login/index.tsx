import Head from "next/head";
import Header from "@components/header";
import UserLoginForm from "@components/users/UserLoginForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import UserOverviewTable from "@/components/users/UserOverviewTable";
import { User } from "@/types";


const Login: React.FC = () => {

    const exampleUsers: Array<User> = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "guest", password: "guest123", role: "guest" },
        { username: "participant", password: "participant123", role: "participant" },
    ];
    return (
        <>
            <Head>
                <title>User Signup</title>
            </Head>
            <Header />
            <main>
                <section className="d-flex flex-column justify-content-center align-items-center">
                    <UserLoginForm />
                    <UserOverviewTable users={exampleUsers} />
                </section>

            </main>
        </>
    );
};


export default Login;
