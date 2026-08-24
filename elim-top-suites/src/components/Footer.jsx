export default function Footer() {
  return (
    <footer className="bg-surface-container">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div className="col-span-1 mb-8 md:mb-0">
          <div className="font-display text-2xl text-primary mb-4">Elim Top Suites</div>
          <p className="font-body text-body-md text-on-surface opacity-80 mt-8">
            © {new Date().getFullYear()} Elim Top Suites. All rights reserved.
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="font-body text-label-sm text-primary font-bold uppercase tracking-wider mb-4">
            Contact Info
          </h4>
          <ul className="space-y-3">
            <li>
              <a
                className="font-body text-body-md text-on-surface-variant hover:text-secondary transition-colors duration-200 block"
                href="tel:+2340000000000"
              >
                +234 000 000 0000
              </a>
            </li>
            <li>
              <span className="font-body text-body-md text-on-surface-variant block">
                01 Golf Course Road, Mai-Adiku, Rayfield, Jos
              </span>
            </li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-body text-label-sm text-primary font-bold uppercase tracking-wider mb-4">
            Amenities
          </h4>
          <ul className="space-y-3">
            {["Restaurant", "Pool", "Fitness", "Parking"].map((a) => (
              <li key={a}>
                <span className="font-body text-body-md text-on-surface-variant block">{a}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 hidden md:block" />
      </div>
    </footer>
  );
}
