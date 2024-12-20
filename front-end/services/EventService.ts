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
  
  const EventService = {
    getAllEvents,
    getEventById,
  };
  
  export default EventService;
  