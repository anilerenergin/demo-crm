"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SliderRange, SliderThumb, SliderTrack } from "@radix-ui/react-slider";

interface Notification {
  id: number;
  title: string;
  message: string;
  segment: string;
  sentCount: number;
  interactions: number;
  conversionRate: string;
  date: string;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "VIP Women Night",
    message: "Join our exclusive women's night at EvenMatch Lounge!",
    segment: "Women, Age 18-25",
    sentCount: 45,
    interactions: 28,
    conversionRate: "62%",
    date: "2025-11-10",
  },
  {
    id: 2,
    title: "Premium Users Check-in",
    message: "Premium users, check-in now and enjoy Live Match!",
    segment: "Premium, Frequent Visitors",
    sentCount: 30,
    interactions: 18,
    conversionRate: "60%",
    date: "2025-11-08",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("All");
  const [ageRange, setAgeRange] = useState([18, 30]);
  const [frequent, setFrequent] = useState(false);
  const [premium, setPremium] = useState(false);

  const handleSendNotification = () => {
    if (!title || !message) return;

    let segments: string[] = [];
    if (gender !== "All") segments.push(gender);
    segments.push(`Age ${ageRange[0]}-${ageRange[1]}`);
    if (frequent) segments.push("Frequent Visitors");
    if (premium) segments.push("Premium Users");

    const sentCount = Math.floor(Math.random() * 100) + 10;
    const interactions = Math.floor(sentCount * (0.4 + Math.random() * 0.4));
    const conversionRate = `${Math.round((interactions / sentCount) * 100)}%`;

    const newNotification: Notification = {
      id: notifications.length + 1,
      title,
      message,
      segment: segments.join(", "),
      sentCount,
      interactions,
      conversionRate,
      date: new Date().toLocaleDateString(),
    };

    setNotifications([newNotification, ...notifications]);
    setTitle("");
    setMessage("");
    setGender("All");
    setAgeRange([18, 30]);
    setFrequent(false);
    setPremium(false);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Notifications</h1>

      {/* Send Notification Form */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium">Send Notification</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            placeholder="Notification Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          {/* Gender Radio */}
          <div className="space-y-1">
            <Label>Gender</Label>
            <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-4">
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="All" id="gender-all" />
                <Label htmlFor="gender-all">All</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="Women" id="gender-women" />
                <Label htmlFor="gender-women">Women</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="Men" id="gender-men" />
                <Label htmlFor="gender-men">Men</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Age Slider */}
          <div className="space-y-2">
            <Label>Age Range: {ageRange[0]} - {ageRange[1]}</Label>
            <Slider
              value={ageRange}
              onValueChange={setAgeRange}
              max={60}
              min={18}
              step={1}
              className="w-full"
            >
              <SliderTrack>
                <SliderRange />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </div>

          {/* Checkboxes */}
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="frequent"
                checked={frequent}
                onCheckedChange={(val) => setFrequent(!!val)}
              />
              <Label htmlFor="frequent">Frequent Visitors</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="premium"
                checked={premium}
                onCheckedChange={(val) => setPremium(!!val)}
              />
              <Label htmlFor="premium">Premium Users</Label>
            </div>
          </div>

          <Button onClick={handleSendNotification}>Send Notification</Button>
        </CardContent>
      </Card>

      {/* Past Notifications */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Past Notifications</h2>
        <ScrollArea className="h-[400px]">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Segment</th>
                <th className="p-3 text-left">Sent</th>
                <th className="p-3 text-left">Interactions</th>
                <th className="p-3 text-left">Conversion Rate</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr key={n.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{n.title}</td>
                  <td className="p-3">
                    <Badge>{n.segment}</Badge>
                  </td>
                  <td className="p-3">{n.sentCount}</td>
                  <td className="p-3">{n.interactions}</td>
                  <td className="p-3">{n.conversionRate}</td>
                  <td className="p-3">{n.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </div>
  );
}
