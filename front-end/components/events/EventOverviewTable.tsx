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
            {events && (
                <table className="text-left">
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
                                role="button">
                                <td>{event.title}</td>
                                <td>{event.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default EventOverviewTable;
