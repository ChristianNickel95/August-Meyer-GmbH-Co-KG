'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix für das Standard-Icon von Leaflet
const icon = L.icon({
  iconUrl: '/images/marker-factory.png', // Fabrik-Icon
  iconRetinaUrl: '/images/marker-factory.png',
  iconSize: [40, 40], // größer und quadratisch
  iconAnchor: [20, 40], // untere Mitte
  popupAnchor: [0, -40],
  shadowUrl: '/images/marker-shadow.png',
  shadowSize: [41, 41]
});

export default function Map() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialisiere die Karte
    const map = L.map(mapContainerRef.current).setView([50.7496, 8.2126], 15); // Haiger

    // Füge OpenStreetMap Layer hinzu
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Füge Marker hinzu
    L.marker([50.7496, 8.2126], { icon }).addTo(map)
      .bindPopup('August Meyer GmbH & Co KG<br>Seibertstr. 5<br>35708 Haiger')
      .openPopup();

    mapRef.current = map;

    // Cleanup
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div 
      ref={mapContainerRef} 
      className="h-[400px] w-full rounded-lg"
      style={{ zIndex: 0 }}
    />
  );
} 