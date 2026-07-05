This is a [Next.js](https://nextjs.org) project for a simple contact management API with a basic CRUD UI.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## UI Usage

The homepage includes a simple form to test CRUD operations:

- Choose a method: `GET`, `POST`, `PUT`, or `DELETE`
- Enter a contact ID for `GET`, `PUT`, or `DELETE`
- Fill in the contact fields for `POST` or `PUT`
- Click `Submit` to send the request
- View the API response in the response panel

## API Endpoints

The API endpoints are available under `pages/api/contacts`:

- `GET /api/contacts` - list all contacts
- `POST /api/contacts` - create a new contact
- `GET /api/contacts/[id]` - retrieve a contact by id
- `PUT /api/contacts/[id]` - update a contact by id
- `DELETE /api/contacts/[id]` - delete a contact by id

The API uses an in-memory store and will reset when the server restarts.

## Project Structure

- `app/page.tsx` - CRUD UI page
- `pages/api/contacts/index.ts` - create/list contacts
- `pages/api/contacts/[id].ts` - get/update/delete a specific contact
- `lib/contacts.ts` - in-memory contact storage

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
