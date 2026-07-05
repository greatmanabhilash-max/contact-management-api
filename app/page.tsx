"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [method, setMethod] = useState("GET");
  const [contactId, setContactId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [response, setResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setResponse("");

    try {
      let url = "/api/contacts";
      let options: RequestInit = { method };

      if (method === "GET") {
        if (contactId.trim()) {
          url = `/api/contacts/${encodeURIComponent(contactId.trim())}`;
        }
      } else if (method === "POST") {
        if (!name.trim() || !email.trim() || !phone.trim()) {
          setResponse("Error: name, email, and phone are required for POST");
          setIsLoading(false);
          return;
        }

        options = {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
          }),
        };
      } else if (method === "PUT") {
        if (!contactId.trim()) {
          setResponse("Error: contact ID is required for PUT");
          setIsLoading(false);
          return;
        }

        url = `/api/contacts/${encodeURIComponent(contactId.trim())}`;
        const payload: Record<string, string> = {};
        if (name.trim()) payload.name = name.trim();
        if (email.trim()) payload.email = email.trim();
        if (phone.trim()) payload.phone = phone.trim();

        if (Object.keys(payload).length === 0) {
          setResponse("Error: at least one field (name, email, phone) is required for PUT");
          setIsLoading(false);
          return;
        }

        options = {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        };
      } else if (method === "DELETE") {
        if (!contactId.trim()) {
          setResponse("Error: contact ID is required for DELETE");
          setIsLoading(false);
          return;
        }
        url = `/api/contacts/${encodeURIComponent(contactId.trim())}`;
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setResponse(`Request failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-16 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex max-w-2xl flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">Contact API</p>
          <h1 className="text-3xl font-semibold">Try CRUD actions quickly</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Choose a method and fill in the required fields, then submit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Method
            <select
              value={method}
              onChange={(event) => setMethod(event.target.value)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </label>

          {(method === "GET" || method === "DELETE" || method === "PUT") && (
            <label className="flex flex-col gap-2 text-sm font-medium">
              Contact ID {method === "GET" ? "(optional)" : "(required)"}
              <input
                value={contactId}
                onChange={(event) => setContactId(event.target.value)}
                placeholder="1"
                type="text"
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900"
              />
            </label>
          )}

          {(method === "POST" || method === "PUT") && (
            <>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Name {method === "POST" ? "(required)" : "(optional)"}
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="John Doe"
                  type="text"
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Email {method === "POST" ? "(required)" : "(optional)"}
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="john@example.com"
                  type="email"
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Phone {method === "POST" ? "(required)" : "(optional)"}
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="555-1234"
                  type="tel"
                  className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none dark:border-zinc-700 dark:bg-zinc-900"
                />
              </label>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </form>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-2 text-sm font-semibold">Response</h2>
          <pre className="whitespace-pre-wrap break-words text-sm text-zinc-700 dark:text-zinc-300">
            {response || "No response yet."}
          </pre>
        </div>
      </main>
    </div>
  );
}

