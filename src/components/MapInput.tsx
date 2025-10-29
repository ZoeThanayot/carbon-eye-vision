import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet-draw';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { MapPin, Pencil } from 'lucide-react';

interface MapInputProps {
  onPolygonDrawn: (geojson: any) => void;
  onTextInput: (text: string) => void;
  isLoading: boolean;
}

const MapInput = ({ onPolygonDrawn, onTextInput, isLoading }: MapInputProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const drawnItemsRef = useRef<L.FeatureGroup | null>(null);
  const [textInput, setTextInput] = useState('');

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

  const handleTextSubmit = () => {
    if (!textInput.trim()) {
      toast.error('Please enter an area name or coordinates');
      return;
    }
    onTextInput(textInput.trim());
    toast.success('Processing location...');
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Select Area</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <Tabs defaultValue="map" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Pencil className="h-4 w-4" />
              Draw on Map
            </TabsTrigger>
            <TabsTrigger value="text" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Enter Location
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="flex-1 flex flex-col space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Use drawing tools to select area
              </p>
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
              className="flex-1 rounded-lg border min-h-[400px]"
            />
          </TabsContent>
          
          <TabsContent value="text" className="flex-1 space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="location-input">Area Name or Coordinates</Label>
              <Input
                id="location-input"
                placeholder="e.g., Khao Yai National Park or 14.4426,101.3719"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                disabled={isLoading}
                onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
              />
              <p className="text-xs text-muted-foreground">
                Enter forest area name or coordinates (lat,lng format)
              </p>
            </div>
            <Button 
              onClick={handleTextSubmit} 
              disabled={isLoading || !textInput.trim()}
              className="w-full"
            >
              Submit Location
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MapInput;
