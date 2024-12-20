import React from "react";
import { Event } from "@types";
import UpdateEventForm from "./UpdateEventForm";
import { useRouter } from "next/router";

type Props = {
    events: Array<Event>;
    selectEvent: (event: Event) => void;
};

const EventOverviewTable: React.FC<Props> = ({
    events,
    selectEvent,
}: Props) => {
    const router = useRouter();

    const handleUpdateClick = (eventId: string) => {
        router.push(`/events/update/${eventId}`);
    };

    const handleDeleteClick = (eventId: string) => {
        router.push(`/events/delete/${eventId}`);
    };

    return (
        <>
            {events && events.length > 0 ? (
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr
                                key={index}
                                onClick={() => selectEvent(event)}
                                role="button"
                                className="cursor-pointer"
                                aria-label={`Select event: ${event.title}`}
                            >
                                <td>{event.title}</td>
                                <td>{event.description}</td>
                                <td><button
                                    className="btn btn-primary btn-sm me-2"
                                    onClick={() => handleUpdateClick(String(event.id))}
                                >
                                    Update
                                </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteClick(String(event.id))}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-muted">No events available.</p>
            )}
        </>
    );
};

export default EventOverviewTable;
