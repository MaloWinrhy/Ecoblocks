import axios from 'axios';

export const getAddressFromCoordinates = async (lat, lon) => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
      params: {
        lat,
        lon,
        format: 'json'
      }
    });
    return response.data.display_name;
  } catch (error) {
    console.error('Error fetching address:', error);
    return 'Unknown address';
  }
};
