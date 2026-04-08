import { FormEvent, useEffect, useState } from "react";
import { createBooking, getServices, getTestimonials } from "./api";
import type {
  BookingRequest,
  Service,
  Testimonial
} from "./types";

const initialForm: BookingRequest = {
  fullName: "",
  email: "",
  phone: "",
  serviceId: 1,
  preferredDate: "",
  details: ""
};

const reasons = [
  "Fast turnaround for repairs that cannot wait all week",
  "Straightforward estimates with clear job scope",
  "A booking experience that feels dependable on phone, tablet, and desktop"
];

const serviceAreas = [
  "Atlanta",
  "Decatur",
  "Brookhaven",
  "Sandy Springs",
  "Midtown",
  "East Point"
];

const processSteps = [
  {
    title: "Request a Quote",
    description:
      "Homeowners submit the job details, preferred date, and contact info in a single form."
  },
  {
    title: "Review and Confirm",
    description:
      "SJM reviews the request, confirms scope, and provides a clean estimate with scheduling options."
  },
  {
    title: "Get the Job Done",
    description:
      "The work is completed with a focus on communication, punctuality, and a clean finish."
  }
];

const trustPoints = [
  "Responsive communication from estimate to completion",
  "Practical repair work for homes, rentals, and small property needs",
  "Built to scale later into admin dashboards, status tracking, and analytics"
];

function App() {
  const [services, setServices] = useState<Service[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<BookingRequest>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadHomePageData() {
      try {
        setIsLoading(true);
        const [serviceData, testimonialData] = await Promise.all([
          getServices(),
          getTestimonials()
        ]);
        setServices(serviceData);
        setTestimonials(testimonialData);
        setForm((current) => ({
          ...current,
          serviceId: serviceData[0]?.id ?? 1
        }));
      } catch {
        setError("Could not load the application data.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadHomePageData();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await createBooking(form);
      setSuccessMessage(response.message);
      setForm({
        ...initialForm,
        serviceId: services[0]?.id ?? 1
      });
    } catch {
      setError("Booking request failed. Check the backend and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <nav className="topbar">
          <div className="brand">
            <span className="brand-mark">SJM</span>
            <div>
              <p>SJM Handyman Services</p>
              <span>Repairs, installs, upkeep, and reliable turnaround</span>
            </div>
          </div>
          <div className="topbar-links">
            <a href="#services">Services</a>
            <a href="#areas">Service Areas</a>
            <a href="#booking" className="cta-link">
              Book a Visit
            </a>
          </div>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">SJM Handyman Services</p>
            <h1>Home repairs and installs without the usual scheduling friction.</h1>
            <p className="hero-text">
              This build gives SJM Handyman Services a modern, mobile-friendly
              booking site while giving you a project that demonstrates React,
              TypeScript, Node, API design, validation, and SQL-backed thinking.
            </p>
            <div className="hero-actions">
              <a href="#booking" className="primary-button">
                Request an Estimate
              </a>
              <a href="#stack" className="secondary-button">
                View Project Stack
              </a>
            </div>

            <div className="hero-strip">
              <div>
                <strong>Same-week</strong>
                <span>availability on common repairs</span>
              </div>
              <div>
                <strong>Mobile-first</strong>
                <span>design for real customer traffic</span>
              </div>
              <div>
                <strong>Full-stack</strong>
                <span>frontend, API, and SQL story</span>
              </div>
            </div>
          </section>

          <aside className="hero-card">
            <p className="card-title">Why this site works</p>
            <ul>
              {reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
            <div className="stat-row">
              <div>
                <strong>6</strong>
                <span>service areas highlighted</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>quote response target</span>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section id="stack" className="section info-band">
          <div>
            <p className="eyebrow">Project Value</p>
            <h2>Client-ready presentation with interview-ready architecture.</h2>
          </div>
          <div className="info-grid">
            <article>
              <h3>Typed UI State</h3>
              <p>
                React components manage typed service, testimonial, and booking
                data with clean loading and submit states.
              </p>
            </article>
            <article>
              <h3>Validation Flow</h3>
              <p>
                The booking form mirrors real full-stack work: collect input,
                validate it, send it, and handle success or failure clearly.
              </p>
            </article>
            <article>
              <h3>SQL Thinking</h3>
              <p>
                The backend includes relational schema design so you can explain
                how the app grows into a production system.
              </p>
            </article>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2>Popular jobs homeowners want to price and schedule quickly.</h2>
          </div>

          {isLoading ? (
            <p className="status-message">Loading services...</p>
          ) : (
            <div className="service-grid">
              {services.map((service) => (
                <article className="service-card" key={service.id}>
                  <p className="service-category">{service.category}</p>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-meta">
                    <span>From ${service.startingPrice}</span>
                    <span>{service.turnaround}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="section split-layout">
          <div>
            <p className="eyebrow">How It Works</p>
            <h2>A booking flow you can explain in both business and technical terms.</h2>
            <p className="supporting-copy">
              Good portfolio projects do more than look clean. They show an
              end-to-end user journey with state changes, API communication, and
              persistence-friendly data structures.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article className="process-card" key={step.title}>
                <span className="process-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="areas" className="section split-layout">
          <div>
            <p className="eyebrow">Service Areas</p>
            <h2>Built for local search and fast trust-building.</h2>
            <p className="supporting-copy">
              Local businesses need simple, specific signals. Service areas make
              the site feel real, help the content read naturally, and give you
              more realistic client data to structure.
            </p>
          </div>

          <div className="areas-panel">
            {serviceAreas.map((area) => (
              <span className="area-chip" key={area}>
                {area}
              </span>
            ))}
          </div>
        </section>

        <section className="section split-layout">
          <div>
            <p className="eyebrow">Customer Trust</p>
            <h2>Testimonials come from the API so the UI is driven by data.</h2>
            <p className="supporting-copy">
              This gives you a clear interview talking point about fetch
              lifecycles, serialization, and how static-looking sections still
              benefit from backend structure.
            </p>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.id}>
                <p className="quote">“{testimonial.quote}”</p>
                <p className="customer">
                  {testimonial.customerName}, {testimonial.neighborhood}
                </p>
                <p className="rating">Rating: {testimonial.rating}/5</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section trust-band">
          <div className="section-heading">
            <p className="eyebrow">Built for Growth</p>
            <h2>This can become a real business platform, not just a landing page.</h2>
          </div>
          <div className="trust-grid">
            {trustPoints.map((point) => (
              <article className="trust-card" key={point}>
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="booking" className="section booking-section">
          <div className="booking-panel">
            <div>
              <p className="eyebrow">Request an Estimate</p>
              <h2>Send the details once and let SJM take it from there.</h2>
              <p className="supporting-copy">
                This form is intentionally useful for practice. You can later add
                database persistence, admin views, email notifications, and job
                status updates without changing the core contract.
              </p>
              <div className="contact-block">
                <span>Typical work:</span>
                <strong>repairs, installs, patching, maintenance</strong>
              </div>
            </div>

            <form className="booking-form" onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  value={form.fullName}
                  onChange={(event) =>
                    setForm({ ...form, fullName: event.target.value })
                  }
                  placeholder="Jordan Blake"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm({ ...form, email: event.target.value })
                  }
                  placeholder="jordan@email.com"
                  required
                />
              </label>

              <label>
                Phone
                <input
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  placeholder="(555) 111-2244"
                  required
                />
              </label>

              <label>
                Service
                <select
                  value={form.serviceId}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      serviceId: Number(event.target.value)
                    })
                  }
                >
                  {services.map((service) => (
                    <option value={service.id} key={service.id}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Preferred Date
                <input
                  type="date"
                  value={form.preferredDate}
                  onChange={(event) =>
                    setForm({ ...form, preferredDate: event.target.value })
                  }
                  required
                />
              </label>

              <label>
                Job Details
                <textarea
                  value={form.details}
                  onChange={(event) =>
                    setForm({ ...form, details: event.target.value })
                  }
                  placeholder="Describe the repair, install, or maintenance request."
                  rows={5}
                  required
                />
              </label>

              <button className="primary-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Send Request"}
              </button>

              {error ? <p className="status-error">{error}</p> : null}
              {successMessage ? (
                <p className="status-success">{successMessage}</p>
              ) : null}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
