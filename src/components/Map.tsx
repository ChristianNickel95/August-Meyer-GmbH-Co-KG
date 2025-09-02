'use client';

import { useEffect, useRef, useState } from 'react';

// Dynamischer Import für Leaflet (vermeidet SSR-Probleme)
let L: any = null;

export default function Map() {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Leaflet nur im Browser laden
    if (typeof window === 'undefined') return;

    const loadLeaflet = async () => {
      try {
        // Dynamisch Leaflet laden
        const leafletModule = await import('leaflet');
        L = leafletModule.default;
        
        setIsLoading(false);
        initializeMap();
      } catch (err) {
        console.error('Fehler beim Laden von Leaflet:', err);
        setError('Karte konnte nicht geladen werden');
        setIsLoading(false);
      }
    };

    loadLeaflet();
  }, []);

  const initializeMap = () => {
    if (!mapContainerRef.current || mapRef.current || !L) return;

    try {
      // CSS-Styles für bessere Darstellung
      const leafletStyles = `
        .leaflet-container {
          height: 100%;
          width: 100%;
        }
        .leaflet-control-container .leaflet-control {
          z-index: 1000;
        }
        .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .leaflet-popup-content {
          margin: 12px 16px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 14px;
          line-height: 1.4;
        }
        .leaflet-popup-tip {
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
      `;

      // CSS-Styles einfügen
      const styleElement = document.createElement('style');
      styleElement.textContent = leafletStyles;
      document.head.appendChild(styleElement);

      // Initialisiere die Karte
      const map = L.map(mapContainerRef.current).setView([50.7496, 8.2126], 15); // Haiger

      // Füge OpenStreetMap Layer hinzu
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Füge Marker hinzu (ohne custom Icon)
      L.marker([50.7496, 8.2126]).addTo(map)
        .bindPopup('August Meyer GmbH & Co KG<br>Seibertstr. 5<br>35708 Haiger')
        .openPopup();

      mapRef.current = map;

      // Cleanup
      return () => {
        map.remove();
        mapRef.current = null;
        // CSS-Styles entfernen
        if (styleElement.parentNode) {
          styleElement.parentNode.removeChild(styleElement);
        }
      };
    } catch (err) {
      console.error('Fehler beim Initialisieren der Karte:', err);
      setError('Karte konnte nicht initialisiert werden');
    }
  };

  // Loading-Zustand
  if (isLoading) {
    return (
      <div className="h-[400px] w-full rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Karte wird geladen...</p>
        </div>
      </div>
    );
  }

  // Error-Zustand
  if (error) {
    return (
      <div className="h-[400px] w-full rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">🗺️</div>
          <p className="text-red-700 font-medium mb-2">Karte konnte nicht geladen werden</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainerRef} 
      className="h-[400px] w-full rounded-lg"
      style={{ zIndex: 0 }}
    />
  );
} 