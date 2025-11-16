"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Plus } from "lucide-react";

interface Event {
  id: string;
  name: string;
  date: string;
  totalGuests: number;
}

interface Guest {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  ticketType: "VIP" | "Regular";
  event: string;
  promoter: string;
}

const COLORS = ["#82ca9d", "#8884d8", "#facc15", "#FF8042", "#FFBB28", "#00C49F"];

// Mock data
const upcomingEvents: Event[] = [
  { id: "e1", name: "EvenMatch Lounge Party", date: "Nov 22", totalGuests: 120 },
  { id: "e2", name: "Sky Club Night", date: "Nov 23", totalGuests: 80 },
  { id: "e3", name: "VIP Lounge Gathering", date: "Nov 24", totalGuests: 50 },
];

const guests: Guest[] = Array.from({ length: 150 }, (_, i) => ({
  id: `g${i}`,
  name: `Guest ${i + 1}`,
  age: Math.floor(Math.random() * 40) + 18,
  gender: Math.random() > 0.5 ? "Male" : "Female",
  ticketType: Math.random() > 0.7 ? "VIP" : "Regular",
  event: upcomingEvents[Math.floor(Math.random() * upcomingEvents.length)].name,
  promoter: ["Alice", "Bob", "Charlie"][Math.floor(Math.random() * 3)],
}));

export default function GuestsPage() {
  // Aggregate data
  const genderDist = [
    { name: "Male", value: guests.filter((g) => g.gender === "Male").length },
    { name: "Female", value: guests.filter((g) => g.gender === "Female").length },
  ];

  const ageBuckets = [
    { ageRange: "18-25", count: guests.filter((g) => g.age >= 18 && g.age <= 25).length },
    { ageRange: "26-35", count: guests.filter((g) => g.age >= 26 && g.age <= 35).length },
    { ageRange: "36-45", count: guests.filter((g) => g.age >= 36 && g.age <= 45).length },
    { ageRange: "46+", count: guests.filter((g) => g.age >= 46).length },
  ];

  const ticketTypeDist = [
    { name: "VIP", value: guests.filter((g) => g.ticketType === "VIP").length },
    { name: "Regular", value: guests.filter((g) => g.ticketType === "Regular").length },
  ];

  const promotersDist = [
    { name: "Alice", value: guests.filter((g) => g.promoter === "Alice").length },
    { name: "Bob", value: guests.filter((g) => g.promoter === "Bob").length },
    { name: "Charlie", value: guests.filter((g) => g.promoter === "Charlie").length },
  ];

  return (
    <ScrollArea className="p-8 space-y-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Guests</h1>
        <Button variant="default" className="flex items-center space-x-2">
          <Plus className="w-4 h-4" /> <span>Add Guest</span>
        </Button>
      </div>

      {/* Upcoming Events Guest Numbers */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Event Guests</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={upcomingEvents}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalGuests" fill="#82ca9d" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gender Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Gender Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={genderDist}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
                animationDuration={1000}
              >
                {genderDist.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value} guests`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Age Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Age Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageBuckets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ageRange" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Ticket Type Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket Types</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ticketTypeDist}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                label
                animationDuration={1000}
              >
                {ticketTypeDist.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value} guests`, name]} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Promoter Contribution */}
      <Card>
        <CardHeader>
          <CardTitle>Guests per Promoter</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={promotersDist}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#facc15" animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Guests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Guests</CardTitle>
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
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Promoter</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {guests.slice(0, 20).map((g) => (
                  <tr key={g.id}>
                    <td className="px-4 py-2">{g.name}</td>
                    <td className="px-4 py-2">{g.age}</td>
                    <td className="px-4 py-2">{g.gender}</td>
                    <td className="px-4 py-2">{g.ticketType}</td>
                    <td className="px-4 py-2">{g.event}</td>
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
