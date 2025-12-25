import axios from 'axios';

export const fetchGreenhouseJobs = async (boardToken) => {
  const url = `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs`;

  const response = await axios.get(url, { timeout: 10000 });
  return response.data.jobs || [];
};
