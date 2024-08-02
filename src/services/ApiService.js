const API_URL = 'http://localhost:5000/actionItems';

export const fetchActionItems = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
