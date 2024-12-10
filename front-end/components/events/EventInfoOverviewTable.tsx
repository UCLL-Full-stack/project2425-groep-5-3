import React from "react";
import { Event, EventInfos } from "@types";

type Props = {
    event: Event;
};

const EventInfoOverviewTable: React.FC<Props> = ({
    event
}: Props) => {
    return (
        <>
            {event && (
                <table className="text-left">
                    <thead>
                        <tr>
                            <th scope="col">Category</th>
                            <th scope="col">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {event.eventInfos && event.eventInfos.map((eventInfo, index) => (
                            <tr key={index}>
                                <td>{eventInfo.category}</td>
                                <td>{eventInfo.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default EventInfoOverviewTable;
