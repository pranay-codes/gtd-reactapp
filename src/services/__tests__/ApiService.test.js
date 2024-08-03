import { fetchActionItems } from '../ApiService';

describe('fetchActionItems', () => {
  it('fetches action items successfully', async () => {
    const mockData = [
      {
        id: 1,
        action: 'Prepare project report',
        priority: 'high',
        context: 'Development',
        dateCreated: '2024-01-01',
        dueDate: '2024-02-04'
      }
    ];
    
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const data = await fetchActionItems();
    expect(data).toEqual(mockData);
  });
 
  it('throws an error when the network response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    await expect(fetchActionItems()).rejects.toThrow('Network response was not ok');
  });
});
