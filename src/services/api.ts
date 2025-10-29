import axios from 'axios';

const API_BASE_URL = 'https://24c4a8e64616.ngrok-free.app';

export interface CarbonCalculationResult {
  run_id: string;
  ndvi_mean: number;
  ndvi_stdDev: number;
  area_ha: number;
  biomass_tons: number;
  carbon_tons: number;
  co2e_tons: number;
  carbon_credits: number;
  explanation: string;
  report_url: string;
}

export const calculateCarbon = async (geojson: any): Promise<CarbonCalculationResult> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/calculate_carbon`, geojson, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return {
      ...response.data,
      report_url: `${API_BASE_URL}/report/${response.data.run_id}`
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('Failed to calculate carbon. Please try again.');
  }
};
