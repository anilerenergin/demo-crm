import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Search } from "lucide-react";

const contacts = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "555-1234" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "555-5678" },
  { id: 3, name: "Charlie Davis", email: "charlie@example.com", phone: "555-8765" },
];

export default function CRMPage() {
  return (
    <div className="p-8 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">CRM Dashboard</h1>
        <Button variant="default">
          <UserPlus className="mr-2 h-4 w-4" /> Add Contact
        </Button>
      </header>

      <div className="flex mb-4">
        <Input
          placeholder="Search contacts..."
          className="w-full max-w-sm"
        />
        <Button className="ml-2">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contacts.map(contact => (
          <Card key={contact.id}>
            <CardHeader>
              <h2 className="text-lg font-semibold">{contact.name}</h2>
            </CardHeader>
            <CardContent className="space-y-1">
              <p>Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
