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
            {event && event.eventInfos && event.eventInfos.length > 0 ? (
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th scope="col" style={{ width: '25%' }}>Category</th>
                            <th scope="col" style={{ width: '75%' }}>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {event.eventInfos.map((eventInfo, index) => (
                            <tr key={index}>
                                <td>{eventInfo.category}</td>
                                <td>{eventInfo.location}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center text-muted">No event details available.</p>
            )}
        </>
    );
};

export default EventInfoOverviewTable;
