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

export interface RunData {
  run_id: string;
  timestamp: string;
  geojson: any;
  ndvi_mean: number;
  ndvi_stdDev: number;
  area_ha: number;
  biomass_tons: number;
  carbon_tons: number;
  co2e_tons: number;
  carbon_credits: number;
  explanation: string;
}

export const calculateCarbon = async (payload: any): Promise<CarbonCalculationResult> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/calculate_carbon`, payload, {
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

export const getReport = async (runId: string): Promise<Blob> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/report/${runId}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch report: ${error.message}`);
    }
    throw new Error('Failed to download report. Please try again.');
  }
};

export const getRun = async (runId: string): Promise<RunData> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/run/${runId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch run data: ${error.message}`);
    }
    throw new Error('Failed to retrieve MRV data. Please try again.');
  }
};

export const healthCheck = async (): Promise<{ status: string }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Health check failed: ${error.message}`);
    }
    throw new Error('API is unavailable.');
  }
};
