# Backend Notes

The current backend uses in-memory arrays for service, testimonial, and booking
data. This keeps deployment simple while the site content and booking flow are
being finalized.

## Current Responsibilities

- `server.ts` defines the API routes.
- `validation.ts` validates booking requests before they are accepted.
- `sql.ts` contains a draft relational schema for future database integration.

## Next Backend Upgrade

When the project is ready for persistent storage, replace the in-memory
`bookings` array with SQLite or PostgreSQL and add:

- `db.ts` for the database connection
- `repositories/bookingsRepository.ts` for queries
- `services/bookingsService.ts` for booking rules
