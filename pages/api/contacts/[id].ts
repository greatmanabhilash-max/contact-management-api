import type { NextApiRequest, NextApiResponse } from "next";
import { contacts, findContact, Contact } from "../../../lib/contacts";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const contactId = Array.isArray(id) ? id[0] : id;

  if (!contactId) {
    return res.status(400).json({ error: "Contact id is required" });
  }

  const contact = findContact(contactId);

  if (req.method === "GET") {
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }
    return res.status(200).json(contact);
  }

  if (req.method === "PUT") {
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const { name, email, phone } = req.body as Partial<Contact>;
    const updatedFields: Partial<Contact> = {};

    if (typeof name === "string" && name.trim()) {
      updatedFields.name = name.trim();
    }
    if (typeof email === "string" && email.trim()) {
      updatedFields.email = email.trim();
    }
    if (typeof phone === "string" && phone.trim()) {
      updatedFields.phone = phone.trim();
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: "At least one field (name, email, phone) is required to update" });
    }

    Object.assign(contact, updatedFields);
    return res.status(200).json(contact);
  }

  if (req.method === "DELETE") {
    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const index = contacts.findIndex((item) => item.id === contactId);
    contacts.splice(index, 1);
    return res.status(200).json({ message: "Contact deleted" });
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
};

export default handler;
