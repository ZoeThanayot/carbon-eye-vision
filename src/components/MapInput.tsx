import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MapInputProps {
  onPolygonDrawn: (geojson: any) => void;
  isLoading: boolean;
}

const MapInput = ({ onPolygonDrawn, isLoading }: MapInputProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([13.7563, 100.5018], 6);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Initialize feature group for drawn items
    const drawnItems = new L.FeatureGroup();
    drawnItemsRef.current = drawnItems;
    map.addLayer(drawnItems);

    // Initialize draw control
    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
          drawError: {
            color: '#e74c3c',
            message: '<strong>Error:</strong> Shape edges cannot cross!',
          },
        },
        polyline: false,
        circle: false,
        rectangle: true,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
    map.addControl(drawControl);

    // Handle polygon creation
    map.on(L.Draw.Event.CREATED, (event: any) => {
      const layer = event.layer;
      drawnItems.clearLayers();
      drawnItems.addLayer(layer);

      const geojson = layer.toGeoJSON();
      toast.success('Area selected! Click "Calculate Carbon" to analyze.');
      onPolygonDrawn(geojson);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onPolygonDrawn]);

  const clearDrawing = () => {
    if (drawnItemsRef.current) {
      drawnItemsRef.current.clearLayers();
      toast.info('Drawing cleared');
    }
  };

  return (
    <Card className="p-4 h-full">
      <div className="space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Select Area</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearDrawing}
            disabled={isLoading}
          >
            Clear
          </Button>
        </div>
        <div 
          ref={mapRef} 
          className="flex-1 rounded-lg border min-h-[400px] md:min-h-[600px]"
          style={{ height: '100%' }}
        />
        <p className="text-sm text-muted-foreground">
          Use the drawing tools to select a forest area for carbon analysis
        </p>
      </div>
    </Card>
  );
};

export default MapInput;
