import { useState } from 'react';
import { Button } from '@/components/ui/button';
import MapInput from '@/components/MapInput';
import ResultsPanel from '@/components/ResultsPanel';
import Navigation from '@/components/Navigation';
import { calculateCarbon, CarbonCalculationResult } from '@/services/api';
import { toast } from 'sonner';
import { Calculator as CalculatorIcon, ExternalLink } from 'lucide-react';

const Calculator = () => {
  const [selectedPayload, setSelectedPayload] = useState<any>(null);
  const [results, setResults] = useState<CarbonCalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePolygonDrawn = (geojson: any) => {
    setSelectedPayload(geojson);
    setResults(null);
    setError(null);
  };

  const handleTextInput = (text: string) => {
    // Convert text input to payload format
    setSelectedPayload({ location: text });
    setResults(null);
    setError(null);
  };

  const handleCalculate = async () => {
    if (!selectedPayload) {
      toast.error('Please select an area or enter location first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await calculateCarbon(selectedPayload);
      setResults(result);
      
      // Store run_id for AI Assistant
      if (result.run_id) {
        localStorage.setItem("lastRunId", result.run_id);
      }
      
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
            <MapInput 
              onPolygonDrawn={handlePolygonDrawn} 
              onTextInput={handleTextInput}
              isLoading={isLoading} 
            />
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
            disabled={!selectedPayload || isLoading}
            className="min-w-[200px]"
          >
            <CalculatorIcon className="mr-2 h-5 w-5" />
            {isLoading ? 'Calculating...' : 'Calculate Carbon'}
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 CarbonEye. Powered by satellite technology.
            </p>
            <a
              href="https://24c4a8e64616.ngrok-free.app/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              API Documentation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Calculator;
