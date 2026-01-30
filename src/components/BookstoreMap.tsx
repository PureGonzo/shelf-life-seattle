"use client";

import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

interface Bookstore {
  id: number;
  name: string;
  slug: string;
  address: string;
  neighborhood: string;
  lat: number;
  lng: number;
  description: string;
  websiteUrl: string | null;
  hours: string | null;
  specialty: string | null;
}

interface BookstoreMapProps {
  bookstores: Bookstore[];
}

const SEATTLE_CENTER: [number, number] = [47.6162, -122.3321];

export default function BookstoreMap({ bookstores }: BookstoreMapProps) {
  const [search, setSearch] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const neighborhoods = useMemo(() => {
    const set = new Set(bookstores.map((b) => b.neighborhood));
    return Array.from(set).sort();
  }, [bookstores]);

  const filtered = useMemo(() => {
    return bookstores.filter((b) => {
      const matchesSearch =
        !search ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.description.toLowerCase().includes(search.toLowerCase()) ||
        b.specialty?.toLowerCase().includes(search.toLowerCase());
      const matchesNeighborhood =
        !neighborhood || b.neighborhood === neighborhood;
      return matchesSearch && matchesNeighborhood;
    });
  }, [bookstores, search, neighborhood]);

  const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Search and filter controls */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Search bookstores..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <select
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Neighborhoods</option>
          {neighborhoods.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {/* Map */}
      <div className="h-[400px] w-full overflow-hidden rounded-lg shadow-lg sm:h-[500px] lg:h-[600px]">
        <MapContainer
          center={SEATTLE_CENTER}
          zoom={12}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((store) => (
            <Marker
              key={store.id}
              position={[store.lat, store.lng]}
              icon={markerIcon}
            >
              <Popup>
                <div className="max-w-xs">
                  <h3 className="mb-1 font-bold">{store.name}</h3>
                  <p className="mb-1 text-sm text-gray-600">{store.address}</p>
                  {store.specialty && (
                    <p className="mb-1 text-xs text-emerald-700">
                      {store.specialty}
                    </p>
                  )}
                  {store.hours && (
                    <p className="mb-2 text-xs text-gray-500">{store.hours}</p>
                  )}
                  <Link
                    href={`/bookstores/${store.slug}`}
                    className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500">
        Showing {filtered.length} of {bookstores.length} bookstores
      </p>
    </div>
  );
}
