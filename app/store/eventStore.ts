import { create } from "zustand";

export interface Event {
  _id: string;
  name: string;
  slug: string;
  image: string;
  date: string;
  venue: { name: string };
}

interface EventStore {
  events: Event[];
  setEvents: (events: Event[]) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
}));
