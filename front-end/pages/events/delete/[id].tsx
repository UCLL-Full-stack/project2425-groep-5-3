import { useRouter } from "next/router";
import Header from "@/components/header";
import EventService from "@/services/EventService";
import { useState, useEffect } from "react";

const DeleteConfirmationEventPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            setIsLoading(false);
        }
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await EventService.deleteEvent(id as string);
            if (response.status === 200) {
                router.push("/events");
            } else {
                setError("Failed to delete the event.");
            }
        } catch (err) {
            setError("An error occurred while trying to delete the event.");
        }
    };

    const handleCancel = () => {
        router.push("/events");
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <Header />
            <div className="container mt-5 p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4 fw-bold text-danger">Confirm Delete</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <p className="text-center">Are you sure you want to delete this event?</p>
                <div className="d-flex justify-content-around mt-4">
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                    <button className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
};

export default DeleteConfirmationEventPage;
