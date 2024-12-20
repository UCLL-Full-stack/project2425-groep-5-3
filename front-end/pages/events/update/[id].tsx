import { useRouter } from "next/router";
import UpdateEventForm from "@/components/events/UpdateEventForm";
import Header from "@/components/header";

const UpdateEventPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h1 className="mb-4 text-center">Update Event</h1>
                {id && <UpdateEventForm eventId={id as string} />}
            </div>
        </>
    );
};

export default UpdateEventPage;
