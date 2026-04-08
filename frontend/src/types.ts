export interface Service {
  id: number;
  title: string;
  category: string;
  description: string;
  startingPrice: number;
  turnaround: string;
}

export interface Testimonial {
  id: number;
  customerName: string;
  neighborhood: string;
  quote: string;
  rating: number;
}

export interface BookingRequest {
  fullName: string;
  email: string;
  phone: string;
  serviceId: number;
  preferredDate: string;
  details: string;
}

export interface BookingResponse {
  id: number;
  message: string;
}
