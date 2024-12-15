import React from "react";
import { Event } from "@types";

type Props = {
    events: Array<Event>;
    selectEvent: (event: Event) => void;
};

const EventOverviewTable: React.FC<Props> = ({
    events,
    selectEvent,
}: Props) => {
    return (
        <>
            {events && events.length > 0 ? (
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
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
