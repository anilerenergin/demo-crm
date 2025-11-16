import { getAllEvents } from "@/app/mockRequest";
import EventDetailClient from "./EventDetailClient";

// Add this function for static generation
export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  return <EventDetailClient />;
}