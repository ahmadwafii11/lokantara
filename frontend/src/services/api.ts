export const API_BASE_URL = "http://localhost:3000/api";

/// FUNCTION GET ALL TRANSPORTATION STOPS from backend
export const getAllTransportationStop = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/transportstops`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Gagal mengambil data transportasi di service:", error);
    throw error;
  }
};

/// FUNCTION GET ALL TRANSPORTATION STOPS CATEGORY from backend
export const getAllTransportationStopCategory = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/transportstopcategories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Gagal mengambil data transportasi di service:", error);
    throw error;
  }
};

/// FUNCTION GET ALL TRANSPORTATIONS from backend
export const getAllTransportations = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/transports`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Gagal mengambil data transportasi di service:", error);
    throw error;
  }
};

/// FUNCTION GET ALL TRANSPORTATION STOPS CATEGORY from backend
export const getAllTransportationCategory = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/transportscategories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Gagal mengambil data transportasi di service:", error);
    throw error;
  }
};
