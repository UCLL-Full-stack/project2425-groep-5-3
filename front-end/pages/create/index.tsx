import EventCreationForm from '@/components/events/EventCreationForm';
import Header from '@/components/header';
import EventService from '@/services/EventService';
import Head from 'next/head';
import { useState } from 'react';


const EventForm = () => {
    return (

        <div>
            <Head>
                <title>Create Event</title>
            </Head>
            <Header>
            </Header>
            <EventCreationForm />
        </div>
    );
}

export default EventForm;
