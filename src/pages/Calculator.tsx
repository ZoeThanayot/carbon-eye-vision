import { useState } from 'react';
import { Button } from '@/components/ui/button';
import MapInput from '@/components/MapInput';
import ResultsPanel from '@/components/ResultsPanel';
import Navigation from '@/components/Navigation';
import { calculateCarbon, CarbonCalculationResult } from '@/services/api';
import { toast } from 'sonner';
import { Calculator as CalculatorIcon } from 'lucide-react';

const Calculator = () => {
  const [selectedGeojson, setSelectedGeojson] = useState<any>(null);
  const [results, setResults] = useState<CarbonCalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePolygonDrawn = (geojson: any) => {
    setSelectedGeojson(geojson);
    setResults(null);
    setError(null);
  };

  const handleCalculate = async () => {
    if (!selectedGeojson) {
      toast.error('Please draw an area on the map first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await calculateCarbon(selectedGeojson);
      setResults(result);
      toast.success('Carbon calculation completed!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate carbon';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Carbon Calculator</h1>
          <p className="text-muted-foreground">
            Select a forest area on the map to calculate carbon sequestration and credits
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Map Section */}
          <div className="h-[600px] lg:h-[700px]">
            <MapInput onPolygonDrawn={handlePolygonDrawn} isLoading={isLoading} />
          </div>

          {/* Results Section */}
          <div className="h-[600px] lg:h-[700px]">
            <ResultsPanel results={results} isLoading={isLoading} error={error} />
          </div>
        </div>

        {/* Calculate Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleCalculate}
            disabled={!selectedGeojson || isLoading}
            className="min-w-[200px]"
          >
            <CalculatorIcon className="mr-2 h-5 w-5" />
            {isLoading ? 'Calculating...' : 'Calculate Carbon'}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Calculator;
