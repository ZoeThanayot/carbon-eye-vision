import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CarbonCalculationResult, getRun, RunData } from '@/services/api';
import { Download, Leaf, TrendingUp, FileText, Database } from 'lucide-react';
import { toast } from 'sonner';

interface ResultsPanelProps {
  results: CarbonCalculationResult | null;
  isLoading: boolean;
  error: string | null;
}

const ResultsPanel = ({ results, isLoading, error }: ResultsPanelProps) => {
  const [mrvData, setMrvData] = useState<RunData | null>(null);
  const [showMrvModal, setShowMrvModal] = useState(false);
  const [loadingMrv, setLoadingMrv] = useState(false);

  const handleViewMrv = async () => {
    if (!results?.run_id) return;
    
    setLoadingMrv(true);
    try {
      const data = await getRun(results.run_id);
      setMrvData(data);
      setShowMrvModal(true);
      toast.success('MRV data loaded');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load MRV data';
      toast.error(errorMessage);
    } finally {
      setLoadingMrv(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Analyzing...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
          <p className="text-center text-muted-foreground mt-4">
            Processing satellite data and calculating carbon metrics...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Ready to Analyze</CardTitle>
          <CardDescription>
            Draw a polygon on the map to calculate carbon metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <div className="text-center">
              <Leaf className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>No area selected yet</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 h-full overflow-y-auto">
      {/* NDVI Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            NDVI Analysis
          </CardTitle>
          <CardDescription>Normalized Difference Vegetation Index</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Mean</p>
              <p className="text-2xl font-bold">{results.ndvi_mean?.toFixed(3) ?? 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Std Dev</p>
              <p className="text-2xl font-bold">{results.ndvi_stdDev?.toFixed(3) ?? 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Area (ha)</p>
              <p className="text-2xl font-bold">{results.area_ha?.toFixed(2) ?? 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carbon Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Carbon Sequestration
          </CardTitle>
          <CardDescription>Estimated carbon storage capacity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Biomass</p>
                <p className="text-xl font-bold">{results.biomass_tons?.toFixed(2) ?? 'N/A'} tons</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carbon</p>
                <p className="text-xl font-bold">{results.carbon_tons?.toFixed(2) ?? 'N/A'} tons</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CO₂e</p>
                <p className="text-xl font-bold">{results.co2e_tons?.toFixed(2) ?? 'N/A'} tons</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Carbon Credits</p>
                <p className="text-xl font-bold text-primary">{results.carbon_credits?.toFixed(2) ?? 'N/A'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed">{results.explanation}</p>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => window.open(results.report_url, '_blank')}
          >
            <Download className="mr-2 h-5 w-5" />
            Download PDF Report
          </Button>
          <Button 
            variant="outline"
            className="w-full" 
            size="lg"
            onClick={handleViewMrv}
            disabled={loadingMrv}
          >
            <Database className="mr-2 h-5 w-5" />
            {loadingMrv ? 'Loading...' : 'View MRV Data'}
          </Button>
        </CardContent>
      </Card>

      {/* MRV Data Modal */}
      <Dialog open={showMrvModal} onOpenChange={setShowMrvModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>MRV Data (Run ID: {results.run_id})</DialogTitle>
            <DialogDescription>
              Measurement, Reporting, and Verification data for this carbon calculation
            </DialogDescription>
          </DialogHeader>
          {mrvData && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-xs overflow-x-auto">
                  {JSON.stringify(mrvData, null, 2)}
                </pre>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(mrvData, null, 2));
                  toast.success('MRV data copied to clipboard');
                }}
                className="w-full"
              >
                Copy to Clipboard
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResultsPanel;
