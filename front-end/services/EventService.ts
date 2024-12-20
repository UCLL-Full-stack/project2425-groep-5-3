const getAllEvents = async () => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser'))?.token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    });
  };
  
  const getEventById = (eventId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/${eventId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    });
  }

  const createEvent = (event: { title: string, description: string, eventInfos: any[] }) => {
    const token = JSON.parse(sessionStorage.getItem('loggedInUser'))?.token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/events", {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(event),
    });
};

const updateEvent = (eventId: string, updatedEvent: { title: string, description: string, eventInfos: any[] }) => {
  const token = JSON.parse(sessionStorage.getItem('loggedInUser'))?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/${eventId}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedEvent),
  });
};

const deleteEvent = (eventId: string) => {
  const token = JSON.parse(sessionStorage.getItem('loggedInUser'))?.token;
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/${eventId}`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
  });
};
  
  const EventService = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
  };
  
  export default EventService;
  