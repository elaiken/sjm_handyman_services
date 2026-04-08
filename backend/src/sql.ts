export const schemaSql = `
CREATE TABLE services (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  starting_price INTEGER NOT NULL,
  turnaround TEXT NOT NULL
);

CREATE TABLE testimonials (
  id INTEGER PRIMARY KEY,
  customer_name TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5)
);

CREATE TABLE bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_id INTEGER NOT NULL,
  preferred_date TEXT NOT NULL,
  details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id)
);
`;

export const interviewQueries = {
  listServices: `
    SELECT id, title, category, description, starting_price, turnaround
    FROM services
    ORDER BY category, title;
  `,
  listTestimonials: `
    SELECT id, customer_name, neighborhood, quote, rating
    FROM testimonials
    ORDER BY rating DESC, id DESC;
  `,
  createBooking: `
    INSERT INTO bookings (
      full_name,
      email,
      phone,
      service_id,
      preferred_date,
      details
    ) VALUES (?, ?, ?, ?, ?, ?);
  `,
  bookingsByStatus: `
    SELECT id, full_name, email, phone, service_id, preferred_date, status, created_at
    FROM bookings
    WHERE status = ?
    ORDER BY created_at DESC;
  `
};
