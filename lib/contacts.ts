export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Demo Contact",
    email: "demo@example.com",
    phone: "123-456-7890",
  },
];

export const findContact = (id: string) => contacts.find((contact) => contact.id === id);

export const nextContactId = () => {
  const numericIds = contacts.map((contact) => Number(contact.id)).filter(Number.isFinite);
  const nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : 1;
  return String(nextId);
};
