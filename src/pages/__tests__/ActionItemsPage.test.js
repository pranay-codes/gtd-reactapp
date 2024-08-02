/* eslint-disable testing-library/prefer-find-by */
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import NextActionItemsPage from '../ActionItemsPage';
import * as apiService from '../../services/ApiService';

jest.mock('../../services/ApiService');

describe('NextActionItemsPage', () => {
  it('displays action items', async () => {
    const mockItems = [
      {
        id: 1,
        action: 'Prepare project report',
        priority: 'high',
        context: 'Development',
        dateCreated: '2024-01-01',
        dueDate: '2024-02-04'
      }
    ];
    apiService.fetchActionItems.mockResolvedValue(mockItems);

    render(<NextActionItemsPage />);

    await waitFor(() => expect(screen.getByText('Prepare project report')).toBeInTheDocument());
    expect(screen.getByText('high')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('2024-02-04')).toBeInTheDocument();
  });

  it('displays an error message if fetching action items fails', async () => {
    apiService.fetchActionItems.mockRejectedValue(new Error('Failed to fetch'));

    render(<NextActionItemsPage />);

    await waitFor(() => expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument());
  });

  it('renders action items table without data', async () => {
    // Mock the fetchActionItems function to return an empty array
    apiService.fetchActionItems.mockResolvedValueOnce([]);

    render(<NextActionItemsPage />);

    // Check if the loading state is displayed
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the loading to finish
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());

    // Check if the table is empty
    expect(screen.getByText(/No action items available/i)).toBeInTheDocument();
  });
});
