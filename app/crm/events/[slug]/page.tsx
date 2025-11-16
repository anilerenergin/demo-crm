"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { getAllEvents, EventWithMetrics } from "@/app/mockRequest";
import { useMemo } from "react";
import { useParams } from "next/navigation";
const COLORS = ["#8884d8", "#82ca9d", "#facc15", "#FF8042", "#FFBB28"];

interface GuestMetrics {
  totalGuests: number;
  vipGuests: number;
  newUsers: number;
  returningUsers: number;
  genderSplit: { name: string; value: number }[];
}

interface TicketMetrics {
  channel: string;
  sold: number;
}

interface DailyGuests {
  date: string;
  guests: number;
}

interface Promoter {
  id: string;
  name: string;
  totalGuests: number;
  maleGuests: number;
  femaleGuests: number;
}

interface Guest {
  id: string;
  name: string;
  age: number;
  gender: string;
  ticketType: string;
  promoter: string;
}

export default function EventDetailPage() {

  const params = useParams();
  const slug = params?.slug;
  // Find event from mock data
  const event: EventWithMetrics | undefined = useMemo(
    () => getAllEvents().find((e) => e.slug === slug),
    [slug]
  );

  if (!event) return <p className="p-8">Event not found.</p>;

  // Mock metrics based on event
  const guestMetrics: GuestMetrics = {
    totalGuests: event.guests,
    vipGuests: Math.floor(event.guests * 0.2),
    newUsers: Math.floor(event.guests * 0.55),
    returningUsers: Math.floor(event.guests * 0.45),
    genderSplit: [
      { name: "Men", value: Math.floor(event.guests * 0.6) },
      { name: "Women", value: Math.floor(event.guests * 0.4) },
    ],
  };

  const ticketMetrics: TicketMetrics[] = [
    { channel: "Website", sold: Math.floor(event.guests * 0.4) },
    { channel: "App", sold: Math.floor(event.guests * 0.3) },
    { channel: "Box Office", sold: Math.floor(event.guests * 0.3) },
  ];

  const dailyGuests: DailyGuests[] = Array.from({ length: 7 }, (_, i) => ({
    date: `Nov ${7 + i}`,
    guests: Math.floor(Math.random() * 50) + 10,
  }));

  const promoters: Promoter[] = [
    { id: "1", name: "Alice", totalGuests: 40, maleGuests: 25, femaleGuests: 15 },
    { id: "2", name: "Bob", totalGuests: 30, maleGuests: 15, femaleGuests: 15 },
    { id: "3", name: "Charlie", totalGuests: 20, maleGuests: 12, femaleGuests: 8 },
  ];

  const guests: Guest[] = Array.from({ length: event.guests }, (_, i) => ({
    id: `g${i}`,
    name: `Guest ${i + 1}`,
    age: Math.floor(Math.random() * 40) + 18,
    gender: Math.random() > 0.5 ? "Male" : "Female",
    ticketType: Math.random() > 0.7 ? "VIP" : "Regular",
    promoter: ["Alice", "Bob", "Charlie"][Math.floor(Math.random() * 3)],
  }));

  const ticketChartData = ticketMetrics.map((t) => ({ name: t.channel, value: t.sold }));

  const ageBuckets = [
    { ageRange: "18-25", count: guests.filter((g) => g.age >= 18 && g.age <= 25).length },
    { ageRange: "26-35", count: guests.filter((g) => g.age >= 26 && g.age <= 35).length },
    { ageRange: "36-45", count: guests.filter((g) => g.age >= 36 && g.age <= 45).length },
    { ageRange: "46+", count: guests.filter((g) => g.age >= 46).length },
  ];

  return (
    <ScrollArea className="p-8 space-y-8">
      {/* Event Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-4 items-center">
          {event.image && (
            <img
              src={event.image}
              alt={event.name}
              className="w-48 h-28 rounded-lg object-cover shadow-lg"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{event.name}</h1>
            <p className="text-muted-foreground">
              {event.venue?.name || "Unknown venue"} • {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Guests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{guestMetrics.totalGuests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>VIP Guests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{guestMetrics.vipGuests}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{guestMetrics.newUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Returning Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{guestMetrics.returningUsers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Daily Guests */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Invited Guest</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dailyGuests}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="guests" stroke="#8884d8" name="Guests" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tickets Sold */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets Sold by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={ticketChartData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {ticketChartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender Split */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Gender Split</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={guestMetrics.genderSplit}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {guestMetrics.genderSplit.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ageBuckets}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageRange" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Promoters Table */}
      <Card>
        <CardHeader>
          <CardTitle>Promoters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promoter</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Guests</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Male</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Female</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {promoters.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-2">{p.name}</td>
                    <td className="px-4 py-2">{p.totalGuests}</td>
                    <td className="px-4 py-2">{p.maleGuests}</td>
                    <td className="px-4 py-2">{p.femaleGuests}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Guests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Guests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promoter</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {guests.map((g) => (
                  <tr key={g.id}>
                    <td className="px-4 py-2">{g.name}</td>
                    <td className="px-4 py-2">{g.age}</td>
                    <td className="px-4 py-2">{g.gender}</td>
                    <td className="px-4 py-2">{g.ticketType}</td>
                    <td className="px-4 py-2">{g.promoter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
