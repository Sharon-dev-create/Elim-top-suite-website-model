import { Link } from "react-router-dom";
import { formatNaira } from "../data/rooms";

export default function RoomCard({ room }) {
  return (
    <div className="bg-surface rounded-lg overflow-hidden border border-surface-variant hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col">
      <div className="h-48 bg-surface-container-highest relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${room.image}')` }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-display text-headline-md-mobile text-primary mb-4">{room.name}</h3>
        <div className="mt-auto pt-4 border-t border-surface-variant flex justify-between items-end">
          <div>
            <span className="block font-body text-label-sm text-on-surface-variant uppercase mb-1">
              From
            </span>
            <span className="font-body text-body-lg text-primary font-medium">
              {formatNaira(room.price)}
            </span>
          </div>
          <Link
            to={`/booking?room=${room.id}`}
            className="text-secondary hover:text-primary font-body text-label-sm uppercase tracking-wider transition-colors"
          >
            Select
          </Link>
        </div>
      </div>
    </div>
  );
}
