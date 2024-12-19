import EventInfoOverviewTable from "@/components/events/EventInfoOverviewTable";
import EventOverviewTable from "@/components/events/EventOverviewTable";
import EventService from "@/services/EventService";
import Header from "@components/header";
import { Event } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Events: React.FC = () => {
    const [events, setEvents] = useState<Array<Event>>();
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const getEvents = async () => {
        const response = await EventService.getAllEvents();
        console.log("API Response:", response.status); // Log response
        const events = await response.json();
        setEvents(events);
    }

    useEffect(() => {
        getEvents();
    },
        []
    );

    return (
        <>
            <Head>
                <title>Events</title>
            </Head>
            <Header>
            </Header>
            <main className="container mt-4">
                <h1 className="text-center mb-4 text-primary">Events</h1>
                <section>
                    {events && (
                        <EventOverviewTable events={events} selectEvent={setSelectedEvent} />

                    )}
                    {selectedEvent && (
                        <div>
                            <h2>Additional info of following event :  {selectedEvent?.title}</h2>
                            <EventInfoOverviewTable event={selectedEvent} />
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};
export default Events