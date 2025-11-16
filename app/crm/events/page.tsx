"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { EventWithMetrics, getAllEvents } from "@/app/mockRequest";

export default function EventsPage() {
  const [events, setEvents] = useState<EventWithMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch delay
    const timeout = setTimeout(() => {
      const allEvents = getAllEvents();
      setEvents(allEvents);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <p className="p-8">Loading events...</p>;
  if (!events.length) return <p className="p-8">No events found.</p>;

  return (
    <div className="p-8">
      {/* Header + Create Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link
          href="/crm/events/create"
          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
        >
          + Create Event
        </Link>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {events.map((event) => {
          const eventDate = new Date(event.date).toLocaleDateString();

          return (
            <Link key={event._id} href={`/crm/events/${event.slug}`}>
              <div className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition">
                <img
                  src={event.image || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={event.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-2">
                  <h2 className="font-semibold">{event.name}</h2>
                  <p className="text-xs text-muted-foreground">
                    {eventDate} • {event.venue?.name || "Unknown venue"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
