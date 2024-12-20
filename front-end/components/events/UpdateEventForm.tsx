import { useState, useEffect } from "react";
import EventService from "@/services/EventService";
import { useRouter } from "next/router";
import { StatusMessage } from "@types";

interface UpdateEventFormProps {
    eventId: string;
}

const UpdateEventForm: React.FC<UpdateEventFormProps> = ({ eventId }) => {
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [titleError, setTitleError] = useState<string | null>(null);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await EventService.getEventById(eventId);
            const eventData = await response.json();

            setTitle(eventData.title);
            setDescription(eventData.description);
        };

        fetchEvent();
    }, [eventId]);

    const clearErrors = () => {
        setTitleError(null);
        setDescriptionError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let isValid = true;

        if (!title || title.trim() === "") {
            setTitleError("Event title is required");
            isValid = false;
        }

        if (!description || description.trim() === "") {
            setDescriptionError("Event description is required");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        const updatedEvent = { title, description, eventInfos: [] };

        try {
            const response = await EventService.updateEvent(eventId, updatedEvent);

            if (response.ok) {
                setStatusMessages([{ message: "Event updated successfully!", type: "success" }]);
                setTimeout(() => {
                    router.push("/events");
                }, 2000);
            } else {
                setStatusMessages([{ message: "Failed to update event", type: "error" }]);
            }
        } catch (error) {
            setStatusMessages([{ message: "Error occurred while updating event", type: "error" }]);
        }
    };

    return (
        <div className="container mt-5 p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "600px" }}>
            <h2 className="text-center mb-4 fw-bold text-primary">Update Event</h2>

            {statusMessages && (
                <div className="mb-3">
                    <ul className="list-unstyled text-center">
                        {statusMessages.map(({ message, type }, index) => (
                            <li key={index} className={type === "error" ? "text-danger" : "text-success"}>
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label fw-semibold">Event Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`form-control ${titleError ? "is-invalid" : ""}`}
                    />
                    {titleError && <div className="invalid-feedback">{titleError}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Event Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`form-control ${descriptionError ? "is-invalid" : ""}`}
                    />
                    {descriptionError && <div className="invalid-feedback">{descriptionError}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-semibold py-2">
                    Update Event
                </button>
            </form>
        </div>
    );
};

export default UpdateEventForm;