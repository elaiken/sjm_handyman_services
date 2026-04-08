import type { BookingRequestBody } from "./types.js";

export function validateBookingPayload(
  payload: Partial<BookingRequestBody>
): string[] {
  const errors: string[] = [];

  if (!payload.fullName?.trim()) {
    errors.push("Full name is required.");
  }

  if (!payload.email?.includes("@")) {
    errors.push("A valid email is required.");
  }

  if (!payload.phone?.trim()) {
    errors.push("Phone is required.");
  }

  if (!payload.serviceId || Number.isNaN(payload.serviceId)) {
    errors.push("A valid service is required.");
  }

  if (!payload.preferredDate?.trim()) {
    errors.push("Preferred date is required.");
  }

  if (!payload.details?.trim() || payload.details.trim().length < 10) {
    errors.push("Details must be at least 10 characters.");
  }

  return errors;
}
