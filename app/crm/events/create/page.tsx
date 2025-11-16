"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAllEvents } from "@/app/mockRequest";

interface Ticket {
  name: string;
  price: string;
  quantity: string;
}

interface EventPayload {
  name: string;
  slug: string;
  description: string;
  date: string;
  endDate: string;
  venue: string;
  image: string;
  banner: string;
  lineup: string;
  capacity: string;
  status: string;
  channels: string[];
  tickets: Ticket[];
}

const AVAILABLE_CHANNELS = [
  "Bugece",
  "Biletix",
  "Biletino",
  "Passo",
  "Mobilet",
  "Etkinlik.io",
  "PartyMag",
  "Resident Advisor",
];

export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const [form, setForm] = useState<EventPayload>({
    name: "",
    slug: "",
    description: "",
    date: "",
    endDate: "",
    venue: "",
    image: "",
    banner: "",
    lineup: "",
    capacity: "",
    status: "draft",
    channels: [],
    tickets: [{ name: "", price: "", quantity: "" }],
  });

  function updateField<K extends keyof EventPayload>(key: K, value: EventPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateTicket(index: number, key: keyof Ticket, value: string) {
    setForm((prev) => {
      const updated = [...prev.tickets];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, tickets: updated };
    });
  }

  function addTicket() {
    setForm((prev) => ({
      ...prev,
      tickets: [...prev.tickets, { name: "", price: "", quantity: "" }],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/events/create", {
      method: "POST",
      body: JSON.stringify(form),
    });

    router.push("/crm/events");
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* BASIC INFO */}
        <div className="space-y-3">
          <label className="block font-semibold">Event Name</label>
          <input
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
          />

          <label className="block font-semibold">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
          />

          <label className="block font-semibold">Lineup</label>
          <input
            className="w-full border p-2 rounded"
            value={form.lineup}
            onChange={(e) => updateField("lineup", e.target.value)}
            placeholder="Artist names separated by comma"
          />
        </div>

        {/* DATE */}
        <div className="space-y-3">
          <label className="block font-semibold">Start Date</label>
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
          />

          <label className="block font-semibold">End Date</label>
          <input
            type="datetime-local"
            className="w-full border p-2 rounded"
            value={form.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
          />
        </div>

        {/* VENUE & MEDIA */}
        <div className="space-y-3">
          <label className="block font-semibold">Venue</label>
          <input
            className="w-full border p-2 rounded"
            value={form.venue}
            onChange={(e) => updateField("venue", e.target.value)}
          />

          <label className="block font-semibold">Image URL</label>
          <input
            className="w-full border p-2 rounded"
            value={form.image}
            onChange={(e) => updateField("image", e.target.value)}
          />

          <label className="block font-semibold">Banner URL</label>
          <input
            className="w-full border p-2 rounded"
            value={form.banner}
            onChange={(e) => updateField("banner", e.target.value)}
          />

          <label className="block font-semibold">Capacity</label>
          <input
            className="w-full border p-2 rounded"
            value={form.capacity}
            onChange={(e) => updateField("capacity", e.target.value)}
          />
        </div>

        {/* STATUS */}
        <div>
          <label className="block font-semibold mb-2">Status</label>
          <select
            className="border p-2 rounded"
            value={form.status}
            onChange={(e) => updateField("status", e.target.value)}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* CHANNELS */}
        <div>
          <label className="block font-semibold mb-2">Publish Channels</label>

          <div className="grid grid-cols-2 gap-2">
            {AVAILABLE_CHANNELS.map((channel) => (
              <label key={channel} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.channels.includes(channel)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateField("channels", [...form.channels, channel]);
                    } else {
                      updateField(
                        "channels",
                        form.channels.filter((c) => c !== channel)
                      );
                    }
                  }}
                />
                {channel}
              </label>
            ))}
          </div>
        </div>

        {/* TICKETS */}
        <div>
          <label className="block font-semibold mb-2">Tickets</label>
          {form.tickets.map((ticket, i) => (
            <div key={i} className="border p-3 rounded mb-2 space-y-2">
              <input
                className="w-full border p-2 rounded"
                placeholder="Ticket Name"
                value={ticket.name}
                onChange={(e) => updateTicket(i, "name", e.target.value)}
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Price"
                value={ticket.price}
                onChange={(e) => updateTicket(i, "price", e.target.value)}
              />
              <input
                className="w-full border p-2 rounded"
                placeholder="Quantity"
                value={ticket.quantity}
                onChange={(e) => updateTicket(i, "quantity", e.target.value)}
              />
            </div>
          ))}

          <button
            type="button"
            className="bg-gray-200 px-3 py-1 rounded"
            onClick={addTicket}
          >
            + Add Ticket
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
