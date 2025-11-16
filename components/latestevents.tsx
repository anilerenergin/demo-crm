"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EventWithMetrics, getAllEvents } from "@/app/mockRequest";

export default function LatestEvents() {
  const [events, setEvents] = useState<EventWithMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetch delay
    const timeout = setTimeout(() => {
      const allEvents = getAllEvents();
      // Get latest 5 events by date
      const latest5 = allEvents
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
      setEvents(latest5);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <p className="p-4">Loading latest events...</p>;
  if (!events.length)
    return (
      <p className="p-4 text-red-500">
        ❌ No recent events found.
      </p>
    );

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Latest 5 Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <Link key={event._id} href={`/events/${event.slug}`}>
              <div className="flex items-center gap-4 p-3 border rounded-lg hover:shadow-md transition">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <div className="font-semibold">{event.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.date).toLocaleDateString()} • {event.venue?.name}
                  </div>
                  <div className="flex gap-4 text-xs text-gray-600 mt-1">
                    <span>Check-ins: {event.checkIns}</span>
                    <span>Guests: {event.guests}</span>
                    <span>Conv: {event.conversion}%</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
