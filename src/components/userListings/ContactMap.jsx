import React from "react";
import { FiPhone } from "react-icons/fi";

const ContactCard = ({ contact }) => (
  <div className="max-w-sm w-[90%] md:w-96 bg-white rounded-xl shadow-xl p-6">
    <h2 className="text-2xl font-semibold mb-2">{contact.title}</h2>
    <p className="text-sm text-gray-600 mb-4">{contact.subtitle}</p>

    {/* Phone */}
    <a
      href={`tel:${contact.phone}`}
      className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full shadow hover:bg-gray-200 mb-6"
    >
      <FiPhone className="text-lg" />
      <span>{contact.phone}</span>
    </a>

    {/* Hours */}
    <ul className="text-sm text-gray-700 space-y-2">
      {contact.hours.map((h) => (
        <li key={h.day} className="flex justify-between">
          <span>{h.day}:</span>
          <span className="font-medium">{h.hours}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ContactMap = () => {
  const contact = {
    title: "Get in Touch",
    subtitle: "Contact our Sales Department",
    phone: "+971524847862",
    hours: [
      { day: "Monday", hours: "9:00–13:00" },
      { day: "Tuesday", hours: "9:00–13:00" },
      { day: "Wednesday", hours: "9:00–13:00" },
      { day: "Thursday", hours: "9:00–13:00" },
      { day: "Friday", hours: "9:00–13:00" },
      { day: "Saturday", hours: "9:00–13:00" },
      { day: "Sunday", hours: "CLOSED" },
    ],
    mapUrl: "https://www.google.com/maps/embed?...",
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh]">
      {/* Map */}
      <iframe
        title="Office location"
        src={contact.mapUrl}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
      />

      {/* Card Overlay */}
      <div className="absolute left-4 top-6 md:left-16 md:top-16 z-10">
        <ContactCard contact={contact} />
      </div>
    </section>
  );
};

export default ContactMap;
