import { useState } from "react";
import toast from "react-hot-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Thanks for subscribing!");
    setEmail("");
  }

  return (
    <section className="w-full">
      <div className=" bg-gradient-to-br from-pink-100 via-primary to-white ring-1 ring-pink-200/60 shadow-sm p-6 sm:p-10 flex flex-col items-center text-center">
        <h2 className="text-pink-900 font-semibold text-2xl">
          Get Beauty Tips & Offers
        </h2>
        <p className="text-secondary mt-1">Join our newsletter for updates.</p>
        <form onSubmit={onSubmit} className="mt-4 w-full max-w-md flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 rounded-lg border border-pink-200 bg-white/80 px-4 py-2 outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2 shadow-sm hover:bg-accent transition-colors">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
