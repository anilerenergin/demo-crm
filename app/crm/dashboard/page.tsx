"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import LatestEvents from "@/components/latestevents";

const venues = [
  { id: "venue-1", name: "EvenMatch Lounge" },
  { id: "venue-2", name: "Sky Club" },
];

// Generate rich mock daily data
const generateDailyData = () => {
  const data = [];
  for (let i = 0; i < 14; i++) {
    data.push({
      date: `Nov ${i + 1}`,
      guestsAdded: Math.floor(Math.random() * 50) + 10,
      guestsVisited: Math.floor(Math.random() * 200) + 50,
      promotersActive: Math.floor(Math.random() * 30) + 5,
      ticketsSold: Math.floor(Math.random() * 150) + 20,
    });
  }
  return data;
};

// Generate metrics
const generateMetrics = (dailyData: any[]) => {
  // Age distribution
  const ageBuckets = [
    { ageRange: "18-25", count: Math.floor(Math.random() * 50) + 10 },
    { ageRange: "26-35", count: Math.floor(Math.random() * 50) + 10 },
    { ageRange: "36-45", count: Math.floor(Math.random() * 50) + 10 },
    { ageRange: "46+", count: Math.floor(Math.random() * 30) + 5 },
  ];

  // Ticket channels
  const ticketChannels = [
    { name: "App", value: Math.floor(Math.random() * 80) + 20 },
    { name: "Website", value: Math.floor(Math.random() * 50) + 10 },
    { name: "Box Office", value: Math.floor(Math.random() * 30) + 5 },
  ];

  // Gender split
  const genderSplit = [
    { name: "Men", value: Math.floor(Math.random() * 60) + 20 },
    { name: "Women", value: Math.floor(Math.random() * 60) + 20 },
  ];

  // Most crowded days
  const mostCrowdedDays = [...dailyData]
    .sort((a, b) => b.guestsVisited - a.guestsVisited)
    .slice(0, 5)
    .map((d) => ({ date: d.date, guestsVisited: d.guestsVisited }));

  return { ageBuckets, ticketChannels, genderSplit, mostCrowdedDays };
};

export default function DashboardPage() {
  const [selectedVenue, setSelectedVenue] = useState(venues[0]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 14)),
    to: new Date(),
  });

  const [dailyData, setDailyData] = useState(generateDailyData());
  const [metrics, setMetrics] = useState(generateMetrics(dailyData));

  const statsToday = dailyData[dailyData.length - 1];

  const handleVenueChange = (id: string) => {
    const venue = venues.find((v) => v.id === id);
    if (venue) {
      setSelectedVenue(venue);
      const newDailyData = generateDailyData();
      setDailyData(newDailyData);
      setMetrics(generateMetrics(newDailyData));
    }
  };

  const COLORS = ["#82ca9d", "#8884d8", "#facc15", "#FF8042", "#FFBB28"];

  return (
    <ScrollArea className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">CRM Dashboard</h1>
          <p className="text-muted-foreground">
            Manage guests, promoters, passes, and ticket channels per venue.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[280px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from
                  ? dateRange.to
                    ? `${format(dateRange.from, "LLL dd, y")} - ${format(
                        dateRange.to,
                        "LLL dd, y"
                      )}`
                    : format(dateRange.from, "LLL dd, y")
                  : "Pick a date range"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <select
            value={selectedVenue.id}
            onChange={(e) => handleVenueChange(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Separator />

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Guests Added", value: statsToday.guestsAdded, desc: "New today" },
          { title: "Guests Visited", value: statsToday.guestsVisited, desc: "Today" },
          { title: "Promoters Active", value: statsToday.promotersActive, desc: "Active promoters" },
          { title: "Tickets Sold", value: statsToday.ticketsSold, desc: "Today" },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
              <CardDescription>{stat.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Daily Activity Chart */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Daily Activity</CardTitle>
          <CardDescription>
            Guests added, visits, promoters active, tickets sold
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="guestsAdded"
                stroke="#8884d8"
                name="Guests Added"
                activeDot={{ r: 8 }}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="guestsVisited"
                stroke="#f472b6"
                name="Guests Visited"
                activeDot={{ r: 8 }}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="promotersActive"
                stroke="#82ca9d"
                name="Promoters Active"
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="ticketsSold"
                stroke="#facc15"
                name="Tickets Sold"
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Guest Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={metrics.ageBuckets}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ageRange" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tickets by Channel */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={metrics.ticketChannels}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                  animationDuration={1500}
                >
                  {metrics.ticketChannels.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gender Split */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Split</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={metrics.genderSplit}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                  animationDuration={1500}
                >
                  {metrics.genderSplit.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Most Crowded Days */}
        <Card>
          <CardHeader>
            <CardTitle>Most Crowded Days</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={metrics.mostCrowdedDays}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="guestsVisited" fill="#f472b6" animationDuration={1500} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <LatestEvents />
    </ScrollArea>
  );
}
