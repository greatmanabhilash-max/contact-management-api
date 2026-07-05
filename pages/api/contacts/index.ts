import type { NextApiRequest, NextApiResponse } from "next";
import { contacts, Contact, nextContactId } from "../../../lib/contacts";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(200).json(contacts);
  }

  if (req.method === "POST") {
    const { name, email, phone } = req.body as Partial<Contact>;

    if (
      !name ||
      !email ||
      !phone ||
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof phone !== "string"
    ) {
      return res.status(400).json({ error: "name, email, and phone are required" });
    }

    const newContact: Contact = {
      id: nextContactId(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };

    contacts.push(newContact);

    return res.status(201).json(newContact);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
};

export default handler;
