"use client";

import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Star } from "lucide-react";

interface Promoter {
  id: string;
  name: string;
  guestsToday: number;
  guestsTotal: number;
  genderSplit: { men: number; women: number };
}

// Mock data
const generatePromotersData = (): Promoter[] => {
  const names = ["John D.", "Sarah L.", "Mike R.", "Anna K.", "Tom B.", "Lara P.", "David S."];
  return names.map((name, index) => {
    const guestsToday = Math.floor(Math.random() * 30) + 5;
    const men = Math.floor(guestsToday * Math.random());
    const women = guestsToday - men;
    return {
      id: `promoter-${index}`,
      name,
      guestsToday,
      guestsTotal: Math.floor(Math.random() * 200) + guestsToday,
      genderSplit: { men, women },
    };
  });
};

export default function PromotersPage() {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setPromoters(generatePromotersData());
  }, []);

  const filteredPromoters = promoters.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollArea className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Promoters</h1>
          <p className="text-muted-foreground">Manage promoters and track guest activity</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 items-center">
          <Input
            placeholder="Search promoters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="min-w-[240px] shadow-sm rounded-md"
          />
          <Button variant="default" className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
            <Plus className="h-4 w-4" /> Add Promoter
          </Button>
          <Button variant="default" className="flex items-center gap-2 bg-yellow-500 text-white hover:bg-yellow-600">
            <Star className="h-4 w-4" /> Add VIP
          </Button>
        </div>
      </div>

      {/* Card Table */}
      <Card className="shadow-2xl bg-gradient-to-br from-white to-gray-50 rounded-xl">
        <CardHeader>
          <CardTitle>Promoters Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[600px]">
            <Table className="min-w-full bg-white rounded-lg shadow-sm overflow-hidden">
              <TableHeader className="bg-gray-100">
                <TableRow>
                  <TableHead>Promoter</TableHead>
                  <TableHead>Guests Today</TableHead>
                  <TableHead>Gender Split</TableHead>
                  <TableHead>Total Guests</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromoters.map((promoter) => (
                  <TableRow
                    key={promoter.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <TableCell className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold shadow-lg">
                        {promoter.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      {promoter.name}
                    </TableCell>
                    <TableCell className="font-medium">{promoter.guestsToday}</TableCell>
                    <TableCell className="flex gap-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">M: {promoter.genderSplit.men}</Badge>
                      <Badge variant="secondary" className="bg-pink-100 text-pink-800">F: {promoter.genderSplit.women}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{promoter.guestsTotal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
