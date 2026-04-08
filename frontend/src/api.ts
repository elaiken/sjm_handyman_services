import type {
  BookingRequest,
  BookingResponse,
  Service,
  Testimonial
} from "./types";

const API_BASE_URL = "http://localhost:4000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getServices(): Promise<Service[]> {
  return request<Service[]>("/services");
}

export function getTestimonials(): Promise<Testimonial[]> {
  return request<Testimonial[]>("/testimonials");
}

export function createBooking(
  payload: BookingRequest
): Promise<BookingResponse> {
  return request<BookingResponse>("/bookings", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
