import cors from "cors";
import express from "express";
import { bookings, services, testimonials } from "./data.js";
import type { BookingRequestBody, BookingRecord } from "./types.js";
import { validateBookingPayload } from "./validation.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/services", (_request, response) => {
  response.json(services);
});

app.get("/api/testimonials", (_request, response) => {
  response.json(testimonials);
});

app.get("/api/bookings", (_request, response) => {
  response.json(bookings);
});

app.post("/api/bookings", (request, response) => {
  const payload = request.body as Partial<BookingRequestBody>;
  const errors = validateBookingPayload(payload);

  if (errors.length > 0) {
    response.status(400).json({ errors });
    return;
  }

  const newBooking: BookingRecord = {
    id: bookings.length + 1,
    fullName: payload.fullName!.trim(),
    email: payload.email!.trim(),
    phone: payload.phone!.trim(),
    serviceId: Number(payload.serviceId),
    preferredDate: payload.preferredDate!,
    details: payload.details!.trim(),
    status: "pending",
    createdAt: new Date().toISOString()
  };

  bookings.unshift(newBooking);

  response.status(201).json({
    id: newBooking.id,
    message: `Estimate request received for ${newBooking.fullName}.`
  });
});

app.listen(port, () => {
  console.log(`SJM Handyman Services API listening on http://localhost:${port}`);
});
