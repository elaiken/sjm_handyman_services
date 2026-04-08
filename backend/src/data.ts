import type { BookingRecord, Service, Testimonial } from "./types.js";

export const services: Service[] = [
  {
    id: 1,
    title: "Drywall and Patch Repair",
    category: "Interior Repair",
    description: "Small wall damage repaired, sanded, and ready for paint.",
    startingPrice: 120,
    turnaround: "Same week"
  },
  {
    id: 2,
    title: "Fixture Installation",
    category: "Electrical",
    description: "Ceiling fans, light fixtures, and smart-home device installs.",
    startingPrice: 140,
    turnaround: "1 to 2 days"
  },
  {
    id: 3,
    title: "TV Mounting",
    category: "Mounting",
    description: "Secure wall mounting with clean cable-routing recommendations.",
    startingPrice: 95,
    turnaround: "48 hours"
  },
  {
    id: 4,
    title: "Door, Fence, and Gate Tune-Up",
    category: "Exterior",
    description: "Sagging gates, loose boards, and latch issues fixed fast.",
    startingPrice: 180,
    turnaround: "2 to 4 days"
  },
  {
    id: 5,
    title: "Bathroom Recaulking",
    category: "Maintenance",
    description: "Refresh tubs, sinks, and showers to reduce leaks and mildew.",
    startingPrice: 110,
    turnaround: "Next available"
  },
  {
    id: 6,
    title: "Furniture Assembly",
    category: "Assembly",
    description: "Desks, shelving, bed frames, and storage units assembled onsite.",
    startingPrice: 85,
    turnaround: "Same day options"
  },
  {
    id: 7,
    title: "Punch List Repairs",
    category: "Property Upkeep",
    description: "Knock out multiple small fixes in one visit for homeowners or rentals.",
    startingPrice: 160,
    turnaround: "Flexible scheduling"
  },
  {
    id: 8,
    title: "Trim, Shelving, and Hardware Installs",
    category: "Finish Work",
    description: "Mount shelves, replace hardware, and complete small finish carpentry jobs.",
    startingPrice: 130,
    turnaround: "1 to 3 days"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    customerName: "Alyssa Reed",
    neighborhood: "Midtown",
    quote: "Fast, clean, and honest pricing. The wall repair looked brand new.",
    rating: 5
  },
  {
    id: 2,
    customerName: "Marcus Hill",
    neighborhood: "Brookhaven",
    quote: "The booking process was simple and the fixture install was done right the first time.",
    rating: 5
  },
  {
    id: 3,
    customerName: "Sonia Patel",
    neighborhood: "Decatur",
    quote: "The quote turnaround was quick and the communication stayed clear from start to finish.",
    rating: 4
  },
  {
    id: 4,
    customerName: "Devon Ross",
    neighborhood: "Sandy Springs",
    quote: "Exactly the kind of local service experience that makes scheduling painless.",
    rating: 5
  },
  {
    id: 5,
    customerName: "Nia Coleman",
    neighborhood: "East Point",
    quote: "Several small repairs were grouped into one visit and everything felt organized.",
    rating: 5
  }
];

export const bookings: BookingRecord[] = [];
