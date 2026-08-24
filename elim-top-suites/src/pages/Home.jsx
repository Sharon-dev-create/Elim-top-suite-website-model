import { Link } from "react-router-dom";
import { rooms, formatNaira } from "../data/rooms";
import RoomCard from "../components/RoomCard";
import Reveal from "../components/Reveal";

const featured = rooms.find((r) => r.featured);
const standard = rooms.filter((r) => !r.featured);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <header className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            alt="Elim Top Suites Exterior"
            className="w-full h-full object-cover object-center"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtOWIkIi-VuUWSqX7cGKAaljDEYlkOpFDHDT4QwpE8cPsdQD79gdRhCmUY4HyVIBShV7zbH08S4fJ6LhAKN_2jOuRAfWIm15yFVFjkZJScqKK_KFJ_aI45rPnWBbGb34vdL2GULfxUtNnShzgS8vT4HDGwN-hXMxu004eUdWfc9d9fxCZTK52G1PYOMps-bUD82pp1Gc8MWORVEshLnTw9Rks7EQVBw9fjFwEZHHJ-6wuoPey_JYlO66kFAB2I2X3BOg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto mt-20">
          <h1 className="font-display text-display-lg-mobile md:text-display-lg text-on-primary mb-6 drop-shadow-md">
            Stay Well. Live Comfortably.
          </h1>
          <p className="font-body text-body-lg text-on-primary/90 mb-10 max-w-2xl mx-auto font-light">
            Experience comfortable accommodation, thoughtful amenities and warm hospitality in the
            heart of Rayfield, Jos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#rooms"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-on-primary hover:bg-primary-container transition-all duration-300 font-body text-label-sm uppercase tracking-widest rounded shadow-sm hover:shadow-md"
            >
              Explore Rooms
            </a>
            <Link
              to="/booking"
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-on-primary text-on-primary hover:bg-on-primary hover:text-primary transition-all duration-300 font-body text-label-sm uppercase tracking-widest rounded"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </header>

      {/* Trust bar */}
      <section className="bg-surface-container py-6 border-b border-surface-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
                3-Star Property
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">location_on</span>
              <span className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
                Rayfield, Jos
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">thumb_up</span>
              <span className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider">
                3.7/5 Guest Rating
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="about">
        <Reveal className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-headline-md-mobile md:text-headline-md text-primary mb-8">
            About Elim Top Suites
          </h2>
          <p className="font-body text-body-lg text-on-surface-variant leading-relaxed">
            Located in the serene Rayfield area of Jos, Elim Top Suites offers comfortable
            accommodation designed for both business and leisure travellers. From thoughtfully
            appointed rooms and suites to dining, recreation and essential guest services, we
            provide a welcoming environment where guests can relax, connect and enjoy their stay.
          </p>
        </Reveal>
      </section>

      {/* Rooms */}
      <section className="py-section-gap bg-surface-container-low px-margin-mobile md:px-margin-desktop" id="rooms">
        <div className="max-w-container-max mx-auto">
          <Reveal className="text-center mb-16">
            <h2 className="font-display text-headline-md-mobile md:text-headline-md text-primary mb-4">
              Find Your Perfect Stay
            </h2>
            <p className="font-body text-body-md text-on-surface-variant max-w-2xl mx-auto">
              *Rates are starting prices per night and may change.
            </p>
          </Reveal>

          {featured && (
            <Reveal className="mb-12 bg-surface rounded-lg overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform hover:-translate-y-1 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto relative">
                  <img
                    alt="Luxury Suite Interior"
                    className="absolute inset-0 w-full h-full object-cover"
                    src={featured.image}
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <span className="inline-block w-fit px-3 py-1 bg-surface-container text-on-surface-variant font-body text-label-sm rounded-full uppercase tracking-wider mb-4">
                    {featured.tagline}
                  </span>
                  <h3 className="font-display text-headline-md-mobile md:text-headline-md text-primary mb-2">
                    {featured.name}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant mb-6 flex-grow">
                    {featured.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-surface-variant pt-6">
                    <div>
                      <p className="font-body text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                        From
                      </p>
                      <p className="font-display text-headline-md-mobile text-primary">
                        {formatNaira(featured.price)}
                        <span className="font-body text-body-md text-on-surface-variant font-normal">
                          /night
                        </span>
                      </p>
                    </div>
                    <Link
                      to={`/booking?room=${featured.id}`}
                      className="px-6 py-3 bg-primary text-on-primary hover:bg-primary-container transition-colors duration-300 font-body text-label-sm rounded uppercase tracking-wider whitespace-nowrap"
                    >
                      Book Room
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {standard.map((room, i) => (
              <Reveal key={room.id} delay={i * 80}>
                <RoomCard room={room} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="experience">
        <Reveal className="mb-12">
          <h2 className="font-display text-headline-md-mobile md:text-headline-md text-primary mb-4">
            The Experience
          </h2>
          <p className="font-body text-body-md text-on-surface-variant max-w-xl">
            Amenities designed to make your stay effortless and enjoyable.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px]">
          <Reveal className="md:col-span-2 md:row-span-2 rounded-xl overflow-hidden relative group">
            <img
              alt="Swimming Pool"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTdFscEh_AnzFDpT1XwVTaSlhRzAz0JTxHKDOZ65R2c-n4PyPTUAjoNaTM11JmKBQY_Q_dMnQ7w8ZYqeXEGE6eJHBwdoTaQXlaZrcCDgOGOpLF3kDrEEy74JrRb5QVsAwHOVjvu5yB5cvEoqY8BIMwyvzIg0ksSHUtTlY9ahDNHCjx0eelsG8nx2JT4FNvT_c3t7w-XLnVr3nuQmpJh6WmlfjglC24WnSX80jj4TEras7g4nODOYjCwAaftds-k-7E3g"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
              <h3 className="font-display text-headline-md-mobile text-on-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">pool</span> Swimming Pool
              </h3>
              <p className="font-body text-body-md text-on-primary/90 hidden md:block">
                Relax and unwind in our pristine outdoor pool area, perfect for a refreshing dip
                or lounging in the sun.
              </p>
            </div>
          </Reveal>

          {[
            { icon: "restaurant", title: "Restaurant", text: "Savor delicious local and continental dishes prepared by our expert chefs in a comfortable dining setting." },
            { icon: "bakery_dining", title: "Complimentary Breakfast", text: "Start your day right with our inclusive breakfast options featuring fresh, quality ingredients." },
            { icon: "fitness_center", title: "Fitness", text: "Maintain your workout routine in our equipped fitness center during your stay." },
            { icon: "local_parking", title: "Free Parking", text: "Secure, on-site parking available at no extra cost for all our registered guests." },
          ].map((a, i) => (
            <Reveal
              key={a.title}
              delay={i * 80}
              className="bg-surface-container rounded-xl p-6 flex flex-col justify-between border border-surface-variant hover:border-outline-variant transition-colors group"
            >
              <div className="text-secondary bg-surface w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">{a.icon}</span>
              </div>
              <div>
                <h3 className="font-body text-body-lg text-primary font-semibold mb-2">{a.title}</h3>
                <p className="font-body text-body-md text-on-surface-variant line-clamp-3">{a.text}</p>
              </div>
            </Reveal>
          ))}

          <Reveal className="md:col-span-2 bg-surface-container rounded-xl p-6 flex flex-col justify-center relative overflow-hidden border border-surface-variant group">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary">celebration</span>
                  <h3 className="font-display text-headline-md-mobile text-primary">Events &amp; Gatherings</h3>
                </div>
                <p className="font-body text-body-md text-on-surface-variant max-w-md">
                  Versatile spaces available for your meetings, conferences, or private
                  celebrations.
                </p>
              </div>
              <a
                href="#events"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-on-primary transition-colors duration-300 font-body text-label-sm rounded uppercase tracking-wider whitespace-nowrap"
              >
                Learn More
              </a>
            </div>
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-secondary/10 rounded-full blur-2xl group-hover:bg-secondary/20 transition-colors duration-500" />
          </Reveal>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-section-gap bg-primary text-on-primary" id="events">
        <Reveal className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-display text-display-lg-mobile md:text-display-lg mb-6">
            Celebrate. Connect. Gather.
          </h2>
          <p className="font-body text-body-lg text-on-primary/80 max-w-2xl mx-auto mb-10 font-light">
            Whether you're hosting a corporate meeting, a small conference, or a social
            gathering, our facilities provide a professional and accommodating environment.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-surface text-primary hover:bg-surface-container-highest transition-colors duration-300 font-body text-label-sm uppercase tracking-widest rounded shadow-sm"
          >
            Enquire About Events
          </Link>
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto" id="gallery">
        <Reveal className="text-center mb-12">
          <h2 className="font-display text-headline-md-mobile md:text-headline-md text-primary mb-4">
            Gallery
          </h2>
          <p className="font-body text-body-md text-on-surface-variant">
            A glimpse into Elim Top Suites.
          </p>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {[
            {
              url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPoqTvViYVsWsWfYcmR0whHf-_Dql2DMr_1Qt5RvG7P86CrMaCW1NbQzVB9BxwGKHwM7M7do4T19MlDf9i0s3xfv_bimvOxt7ZOZXPWBtxM74kufpZ4TzGQpJf_RNTyb_axzwOxC0nFJ28kuHZShm_UdAXZUSeFbaN7u4fqs9kyQTXhOpazR7NBwp8BLdxsLz_jW5akW7RcElZj6uan0gmcmnYsatkj-jvQ2N6c6im0iciUo6wNNPHe9KVLPA7btu4Kw",
              className: "col-span-2 row-span-2",
            },
            {
              url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzWtaV6wEStFCtGCcdy5fVE5mqQGGfxTErqf8PDFUbvZb1Ntqa860Pjfmn_48mHhOUZsg3KU2N-jKX4L09is8sFNcaw43nqa6pzBO-N8oeT2A2OWry9tnQ43UyJ74VMEr416bzWnUFKTCYp9hMImTURTguCau8ShUoMZjZXP3cR0CYO7Ed9Kd2jmOYP2FeXUQd8P3mbh2a1mNXxjpnKwBvwaLWZumuER6xcaQQmuUi9HDzLcRV-Hm_EHHqj6cPOM25Pg",
            },
            {
              url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB75vzIszAyhQ-doy5hY2QkYLzZ49t8TnxTV0_fceagl74QkoWEnr2bj6PKtC2a2CwX4nOetJQX6CYzSli5ITJkTwabpOQpw7yq6CWX3UEmq1rNdQ2_R86MJ0JyNtyFm_LX_z8aB5tFirMe-lNywElKTvzpDkJSVIZC-iZqQcQEDJ8GsZAs7jbi5LGzTWGRWukQmkiCxEfnyDSkWngJ3ftRnfdZGQQt-l3WLGdqIKc6Ri11hke0fTQv",
            },
            {
              url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD1AQ8tkt5_brDC3uCErV9Scag4f74Ah4xSYOhA1_zlSlREbuJ_J7-EP6BxYbritcxfXmumad5ZWV9156GEz1dNAZZCjkccmSs_eLNLhESVgCK7uJuM2EETBb4RQ9g2Mcx_4DmT5-v6U51NHBuAqEHRDRvFK4aAizOKQabpJR355csBR8ToLGvFQ8iM61x1VtERxtQjzlowMacJW_LUKufptyig68jKR5OePkbPPfHLxl_gNK95Ug0u",
            },
            {
              url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZvhA5vBW0V0yv9Vh3c4PvRyHhWJtG6E8JGULmurbd2eLBJvonaLSCAo_gBCj-VHUBagvyNsLD8VT6SjnRlDutFoUvYpN1WdxMySIaWghsyQ7WlKqQiU0L1BNZzcGwsDi9XXMBwnfOSNvchCh5eXELaM1iOWl-TNP5EVkhHoVsOjxiwbarlv3QT8HJVDNusB9X_VX0Mt9CNO9-8VBrYOw9Ku0MqAoJTVGJ1gLCVwAYsfZhq8AtY0EY",
            },
          ].map((img, i) => (
            <Reveal
              key={img.url}
              delay={i * 70}
              className={`aspect-square relative rounded-lg overflow-hidden ${img.className || ""}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
                style={{ backgroundImage: `url('${img.url}')` }}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA + Location */}
      <section className="py-section-gap bg-surface-container-low px-margin-mobile md:px-margin-desktop border-t border-surface-variant">
        <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <Reveal direction="left" className="md:w-1/2 text-center md:text-left">
            <h2 className="font-display text-headline-md-mobile md:text-headline-md text-primary mb-6">
              Ready for a comfortable stay?
            </h2>
            <Link
              to="/booking"
              className="inline-block px-8 py-4 bg-primary text-on-primary hover:bg-primary-container transition-colors duration-300 font-body text-label-sm uppercase tracking-widest rounded shadow-md"
            >
              Book Your Stay
            </Link>
          </Reveal>
          <Reveal
            direction="right"
            delay={100}
            className="md:w-1/2 bg-surface p-8 rounded-xl border border-surface-variant shadow-sm w-full"
          >
            <h3 className="font-body text-body-lg text-primary font-semibold mb-4 flex items-center gap-2 justify-center md:justify-start">
              <span className="material-symbols-outlined text-secondary">location_on</span> Location
            </h3>
            <p className="font-body text-body-md text-on-surface-variant text-center md:text-left mb-6">
              01 Golf Course Road, Mai-Adiku, Rayfield, Jos
            </p>
            <div className="w-full h-48 bg-surface-container rounded-lg overflow-hidden relative">
              <iframe
                title="Elim Top Suites location"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                src="https://www.google.com/maps?q=Rayfield,Jos,Plateau,Nigeria&output=embed"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
