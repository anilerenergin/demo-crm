"use client";

import { useParams } from "next/navigation";
import EventDetailContent from "./EventDetailContent";

export default function EventDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;

  return <EventDetailContent slug={slug} />;
}