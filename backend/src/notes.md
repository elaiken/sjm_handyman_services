# Backend Notes

This backend uses in-memory arrays for immediate practice, but it also includes SQL schema and interview queries so you can upgrade it to a real database.

## What to Explain in an Interview

- `server.ts` handles HTTP concerns and delegates validation logic.
- `validation.ts` keeps business validation out of route handlers.
- `sql.ts` shows how the current data model maps to relational tables.
- The next production step would be a repository layer that executes SQL with a database driver.

## Strong Next Step

Replace the in-memory `bookings` array with SQLite or PostgreSQL and create:

- `db.ts` for the connection
- `repositories/bookingsRepository.ts` for SQL execution
- `services/bookingsService.ts` for business rules
