import { useState } from "react";
import {
  FiPhone,
  FiMapPin,
  FiMail,
  FiInstagram,
  FiFacebook,
  FiYoutube,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Thanks for reaching out! We'll get back soon.");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="w-full min-h-full px-4 py-8 bg-gradient-to-b from-primary/60 to-white">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Info */}
        <section className="rounded-3xl bg-gradient-to-br from-pink-100 via-primary to-white ring-1 ring-pink-200/60 shadow-sm p-8">
          <h1 className="text-pink-900 text-3xl font-semibold">Contact Us</h1>
          <p className="text-secondary mt-2">We’d love to hear from you.</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <FiMapPin className="text-pink-700 text-xl mt-1" />
              <div>
                <p className="text-pink-900 font-medium">Location</p>
                <p className="text-secondary">Karandeniya, Galle, Sri Lanka</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiPhone className="text-pink-700 text-xl mt-1" />
              <div>
                <p className="text-pink-900 font-medium">Phone</p>
                <p className="text-secondary">+94 71 123 4567</p>
                <p className="text-secondary">+94 77 987 6543</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiMail className="text-pink-700 text-xl mt-1" />
              <div>
                <p className="text-pink-900 font-medium">Email</p>
                <p className="text-secondary">hello@crystalbeautyclear.lk</p>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-pink-900 font-medium">Follow us</p>
              <div className="flex gap-3 mt-2">
                <a
                  className="text-pink-700 hover:text-pink-900 inline-flex items-center gap-2"
                  href="#">
                  <FiInstagram /> Instagram
                </a>
                <a
                  className="text-pink-700 hover:text-pink-900 inline-flex items-center gap-2"
                  href="#">
                  <FiFacebook /> Facebook
                </a>
                <a
                  className="text-pink-700 hover:text-pink-900 inline-flex items-center gap-2"
                  href="#">
                  <FiYoutube /> YouTube
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Form */}
        <section className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6">
          <h2 className="text-pink-900 font-semibold text-xl">
            Send a Message
          </h2>
          <form onSubmit={submit} className="mt-4 space-y-3">
            <div>
              <label className="block text-sm text-pink-900">Name</label>
              <input
                className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm text-pink-900">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-pink-900">Message</label>
              <textarea
                rows={5}
                className="mt-1 w-full rounded-lg border border-pink-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2 shadow-sm hover:bg-accent transition-colors">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
