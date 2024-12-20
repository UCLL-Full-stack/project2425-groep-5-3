import EventService from "@/services/EventService";
import { StatusMessage, User } from "@types";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


const CreateEventForm: React.FC = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [titleError, setTitleError] = useState<string | null>(null);
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);


    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}");

        if (user.role === "admin") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    if (isAdmin === null) {
        return <p>Loading...</p>;
    }

    if (isAdmin === false) {
        return (
            <div className="container mt-5 p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "400px" }}>
                <h2 className="text-center mb-4 fw-bold text-primary">Create Event</h2>
                <div className="alert alert-danger text-center" role="alert">
                    You do not have permission to create events.
                </div>
            </div>
        );
    }



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

    const handleSubmit = async (event) => {
        event.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        const eventData = {
            title,
            description,
            eventInfos: [],
        };

        const response = await EventService.createEvent(eventData);
        console.log(response.status);
        if (response.status === 200) {
            console.log(response.status);
            setStatusMessages([{ message: `Event Created successfully. Redirecting to event overview...`, type: "success" }]);

            const addedEvent = await response.json();
            sessionStorage.setItem("addedEvent", JSON.stringify(addedEvent));

            setTimeout(() => {
                router.push("/events");
            }, 2000);
        } else if (response.status === 401) {
            setStatusMessages([{ message: `Login failed. You are not authorized`, type: "error" }]);
        }
    };

    return (
        <div className="container mt-5 p-4 border rounded shadow-sm bg-white" style={{ maxWidth: "400px" }}>
            <h2 className="text-center mb-4 fw-bold text-primary">Create Event</h2>

            {/* Status messages */}
            {statusMessages && (
                <div className="mb-3">
                    <ul className="list-unstyled text-center">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames("fw-semibold", {
                                    "text-danger": type === "error",
                                    "text-success": type === "success",
                                })}
                            >
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
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEventForm;
