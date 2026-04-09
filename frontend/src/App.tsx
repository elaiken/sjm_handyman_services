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
  "Prompt scheduling and clear communication",
  "Quality workmanship for repairs and installs",
  "Respectful, clean service from start to finish"
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
    title: "Tell Us About the Job",
    description:
      "Share the repair, installation, or maintenance work you need and when you would like service."
  },
  {
    title: "Receive Your Estimate",
    description:
      "We review the request, confirm the details, and follow up with pricing and scheduling options."
  },
  {
    title: "Get It Done Right",
    description:
      "SJM Handyman Services arrives ready to complete the work with care, efficiency, and professionalism."
  }
];

const trustPoints = [
  "Drywall patching, fixture installs, mounting, caulking, and punch-list repairs",
  "Flexible appointment requests for homeowners, rental properties, and small maintenance jobs",
  "Serving local neighborhoods with dependable scheduling and straightforward pricing"
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
        setError("We could not load service information right now.");
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
      setError("Your request could not be submitted. Please try again.");
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
              <span>Reliable repairs, installs, and home upkeep</span>
            </div>
          </div>
          <div className="topbar-links">
            <a href="#services">Services</a>
            <a href="#areas">Service Areas</a>
            <a href="#booking" className="cta-link">
              Request an Estimate
            </a>
          </div>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">Trusted Local Handyman Service</p>
            <h1>Home repairs and installations handled with care.</h1>
            <p className="hero-text">
              SJM Handyman Services helps homeowners and property managers take
              care of the jobs that keep a home safe, functional, and looking
              its best. From repairs and mounting to finish work and routine
              upkeep, every request starts with a clear estimate and dependable
              communication.
            </p>
            <div className="hero-actions">
              <a href="#booking" className="primary-button">
                Book a Visit
              </a>
              <a href="#services" className="secondary-button">
                View Services
              </a>
            </div>

            <div className="hero-strip">
              <div>
                <strong>Fast response</strong>
                <span>for common home repair requests</span>
              </div>
              <div>
                <strong>Clear estimates</strong>
                <span>before work is scheduled</span>
              </div>
              <div>
                <strong>Local service</strong>
                <span>for homes and small property needs</span>
              </div>
            </div>
          </section>

          <aside className="hero-card">
            <p className="card-title">Why homeowners choose SJM</p>
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
                <span>quote response goal</span>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section className="section info-band">
          <div>
            <p className="eyebrow">About SJM</p>
            <h2>Dependable help for the projects that keep a home running well.</h2>
          </div>
          <div className="info-grid">
            <article>
              <h3>Repair Work</h3>
              <p>
                Small to mid-sized repair jobs handled efficiently with
                attention to detail and a clean finish.
              </p>
            </article>
            <article>
              <h3>Installations</h3>
              <p>
                Fixtures, mounting, shelving, and hardware installs completed
                with practical recommendations and dependable workmanship.
              </p>
            </article>
            <article>
              <h3>Maintenance Support</h3>
              <p>
                Ongoing upkeep and punch-list items for homeowners and smaller
                property maintenance needs.
              </p>
            </article>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2>Popular handyman services for everyday home needs.</h2>
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
            <h2>Simple scheduling from first message to finished job.</h2>
            <p className="supporting-copy">
              Every project starts with clear job details, straightforward
              communication, and a plan to get the work completed efficiently.
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
            <h2>Serving local homeowners and nearby communities.</h2>
            <p className="supporting-copy">
              If your project is in or near one of these areas, send the job
              details and requested date to get started.
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
            <p className="eyebrow">Customer Feedback</p>
            <h2>Recent clients value clear communication and quality work.</h2>
            <p className="supporting-copy">
              SJM Handyman Services focuses on making the process smooth from
              estimate to completion.
            </p>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <article className="testimonial-card" key={testimonial.id}>
                <p className="quote">“{testimonial.quote}”</p>
                <p className="customer">
                  {testimonial.customerName}, {testimonial.neighborhood}
                </p>
                <p className="rating">{testimonial.rating}/5</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section trust-band">
          <div className="section-heading">
            <p className="eyebrow">What We Handle</p>
            <h2>Practical services designed for real homes and real maintenance needs.</h2>
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
              <h2>Tell us about the job and preferred timing.</h2>
              <p className="supporting-copy">
                Submit the form with your project details and SJM Handyman
                Services will follow up to confirm the scope and next steps.
              </p>
              <div className="contact-block">
                <span>Typical work:</span>
                <strong>repairs, installs, patching, mounting, and maintenance</strong>
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
