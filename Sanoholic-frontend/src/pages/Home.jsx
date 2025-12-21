import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-900 px-6 py-16 space-y-24">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-100 mb-6">
          Discover Events That{" "}
          <span className="text-green-400">Inspire You</span>
        </h1>

        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
          SANOHOLIC helps you explore workshops, tech talks, hackathons,
          seminars, and community events — all in one place.
        </p>

        {user && (
          <div className="mt-8">
            <Link
              to="/events"
              className="inline-block bg-green-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
            >
              Explore Events
            </Link>
          </div>
        )}
      </section>

      {/* WHAT IS SANOHOLIC */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-100 mb-6">
          What is SANOHOLIC?
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed">
          SANOHOLIC is a modern event booking platform designed to connect
          people with meaningful experiences. Whether you want to learn,
          network, or participate in exciting activities, SANOHOLIC makes
          discovering and booking events simple and secure.
        </p>
      </section>

      {/* HOW EVENT BOOKING WORKS */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-100 text-center mb-12">
          How Event Booking Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Browse Events",
              desc: "Explore upcoming events with details like date, location, capacity, and price.",
            },
            {
              title: "Book Your Seat",
              desc: "Secure your spot instantly. Seat availability updates in real time.",
            },
            {
              title: "Attend & Enjoy",
              desc: "Get ready to attend events and gain valuable experiences.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-center"
            >
              <div className="text-4xl font-bold text-green-400 mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-100 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TYPES OF EVENTS */}
      <section className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-100 text-center mb-12">
          Types of Events You’ll Find
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            "Technical Workshops",
            "Hackathons & Coding Events",
            "Webinars & Online Sessions",
            "College & Community Meetups",
            "Business & Startup Talks",
            "Cultural & Social Events",
          ].map((event, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-center text-gray-300"
            >
              🎟️ {event}
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE SANOHOLIC */}
      <section className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-100 mb-6">
          Why Choose SANOHOLIC?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Easy & fast event booking",
            "Verified event organizers",
            "Real-time seat availability",
            "Secure authentication",
            "Simple booking management",
            "Clean and modern interface",
          ].map((point, index) => (
            <div
              key={index}
              className="bg-slate-950 border border-slate-800 p-6 rounded-xl text-gray-300"
            >
              ✅ {point}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
