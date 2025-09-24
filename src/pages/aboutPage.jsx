import Newsletter from "./home/newsletter";

import image1 from "../images/1.webp";
import image2 from "../images/2.webp";
import image3 from "../images/3.webp";
import image4 from "../images/4.webp";
import image5 from "../images/5.webp";
import image6 from "../images/6.webp";

export default function AboutPage() {
  return (
    <div className="w-full min-h-full px-4 py-8 bg-gradient-to-b from-primary/60 to-white">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <section className="rounded-3xl bg-gradient-to-br from-pink-100 via-primary to-white ring-1 ring-pink-200/60 shadow-sm p-8 sm:p-12">
          <h1 className="text-pink-900 text-3xl sm:text-4xl font-semibold">
            About Crystal Beauty Clear
          </h1>
          <p className="text-secondary mt-3 max-w-3xl">
            We’re a girls-first beauty brand based in Karandeniya, Galle,
            bringing feel-good skincare and makeup that are gentle, effective,
            and joyfully designed.
          </p>
        </section>

        {/* Mission & Values */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6">
            <h2 className="text-pink-900 font-semibold text-xl">Our Mission</h2>
            <p className="text-secondary mt-2">
              Help you discover your glow with safe, high-quality products that
              fit your daily routine.
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6">
            <h2 className="text-pink-900 font-semibold text-xl">
              What We Believe
            </h2>
            <p className="text-secondary mt-2">
              Kind-to-skin formulas, transparent ingredients, and confidence
              through self-care.
            </p>
          </div>
          <div className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6">
            <h2 className="text-pink-900 font-semibold text-xl">Community</h2>
            <p className="text-secondary mt-2">
              Designed with feedback from Sri Lankan girls and women who inspire
              us daily.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6">
            <h3 className="text-pink-900 font-semibold text-xl">Our Story</h3>
            <p className="text-secondary mt-2">
              Starting in Karandeniya, Galle, we set out to create a curated
              collection of cosmetics that are easy to love and easy to use.
              From daily hydrating serums to colorful makeup, we focus on
              quality, affordability, and the confidence that comes from taking
              care of yourself.
            </p>
          </div>
          <div className="opacity-50 rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-sm p-6 h-full">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-24 sm:h-28 rounded-xl bg-pink-100">
                <img
                  src={image1}
                  alt="Skincare"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-24 sm:h-28 rounded-xl bg-pink-100">
                <img
                  src={image2}
                  alt="Skincare"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-24 sm:h-28 rounded-xl bg-pink-100">
                <img
                  src={image3}
                  alt="Skincare"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-24 sm:h-28 rounded-xl bg-pink-100">
                <img
                  src={image4}
                  alt="Skincare"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-24 sm:h-28 rounded-xl bg-pink-100">
                <img
                  src={image5}
                  alt="Skincare"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="h-24 sm:h-28 rounded-xl bg-pink-100">
                <img
                  src={image6}
                  alt="Skincare"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Newsletter />
    </div>
  );
}
