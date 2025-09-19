import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface KazirangaMapProps {
  className?: string;
}

const KazirangaMap: React.FC<KazirangaMapProps> = ({ className }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);

  // Kaziranga National Park coordinates
  const kazirangaCenter: [number, number] = [93.3714, 26.5775];

  // Geo-fencing zones within Kaziranga
  const zones = [
    { 
      name: "Central Range", 
      coordinates: [93.3714, 26.5775], 
      status: "safe",
      color: "#10b981",
      visitors: 45
    },
    { 
      name: "Western Range", 
      coordinates: [93.3214, 26.5675], 
      status: "safe",
      color: "#10b981",
      visitors: 32
    },
    { 
      name: "Eastern Range", 
      coordinates: [93.4214, 26.5875], 
      status: "safe",
      color: "#10b981",
      visitors: 28
    },
    { 
      name: "Burapahar Range", 
      coordinates: [93.4114, 26.5575], 
      status: "warning",
      color: "#f59e0b",
      visitors: 15
    },
    { 
      name: "Buffer Zone", 
      coordinates: [93.3914, 26.6075], 
      status: "restricted",
      color: "#ef4444",
      visitors: 3
    }
  ];

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: kazirangaCenter,
      zoom: 12,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.on('load', () => {
      // Add zones as circles
      zones.forEach((zone, index) => {
        // Add zone circle
        map.current?.addSource(`zone-${index}`, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: zone.coordinates
              },
              properties: {
                name: zone.name,
                status: zone.status,
                visitors: zone.visitors
              }
            }]
          }
        });

        // Add zone circle layer
        map.current?.addLayer({
          id: `zone-circle-${index}`,
          type: 'circle',
          source: `zone-${index}`,
          paint: {
            'circle-radius': 800,
            'circle-color': zone.color,
            'circle-opacity': 0.3,
            'circle-stroke-color': zone.color,
            'circle-stroke-width': 2,
            'circle-stroke-opacity': 0.8
          }
        });

        // Add zone label
        map.current?.addLayer({
          id: `zone-label-${index}`,
          type: 'symbol',
          source: `zone-${index}`,
          layout: {
            'text-field': zone.name,
            'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
            'text-size': 12,
            'text-anchor': 'center'
          },
          paint: {
            'text-color': '#ffffff',
            'text-halo-color': zone.color,
            'text-halo-width': 2
          }
        });

        // Add marker for zone center
        new mapboxgl.Marker({
          color: zone.color,
          scale: 0.8
        })
          .setLngLat(zone.coordinates as [number, number])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <h3 class="font-semibold">${zone.name}</h3>
                  <p class="text-sm text-gray-600">Status: ${zone.status}</p>
                  <p class="text-sm text-gray-600">Visitors: ${zone.visitors}</p>
                </div>
              `)
          )
          .addTo(map.current!);
      });

      // Add user location marker
      new mapboxgl.Marker({
        color: '#3b82f6',
        scale: 1.2
      })
        .setLngLat([93.3714, 26.5785]) // Slightly offset from center
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold">Your Location</h3>
                <p class="text-sm text-gray-600">Central Range, Kaziranga</p>
                <p class="text-sm text-green-600">Safe Zone</p>
              </div>
            `)
        )
        .addTo(map.current!);
    });
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
      initializeMap(mapboxToken.trim());
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="text-center space-y-4">
          <MapPin className="h-12 w-12 text-primary mx-auto" />
          <h3 className="text-lg font-semibold">Kaziranga National Park Map</h3>
          <p className="text-sm text-muted-foreground">
            Enter your Mapbox public token to view the interactive map
          </p>
          <p className="text-xs text-muted-foreground">
            Get your token from{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="text"
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGtxbTBsM..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit}>
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={mapContainer} className="w-full h-80 rounded-lg shadow-lg" />
      <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
        Kaziranga National Park
      </div>
      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
        Live Geo-fencing Active
      </div>
    </div>
  );
};

export default KazirangaMap;