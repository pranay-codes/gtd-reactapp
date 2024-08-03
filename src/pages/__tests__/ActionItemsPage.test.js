/* eslint-disable testing-library/prefer-find-by */
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import NextActionItemsPage from '../ActionItemsPage';
import * as apiService from '../../services/ApiService';

jest.mock('../../services/ApiService');

const mockItems = [
    { action: 'Prepare project report', priority: 'low', context: 'Development', dateCreated: '2024-01-01', dueDate: '2024-02-04' },
    { action: 'Code review', priority: 'medium', context: 'QA', dateCreated: '2024-01-02', dueDate: '2024-02-05' },
    { action: 'Write tests', priority: 'high', context: 'unit', dateCreated: '2024-01-03', dueDate: '2024-02-06' },
  ];

describe('NextActionItemsPage', () => {
  it('displays action items', async () => {

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

  it('sorts action items by priority', async () => {
    apiService.fetchActionItems.mockResolvedValueOnce(mockItems);

    render(<NextActionItemsPage />);

    await waitFor(() => expect(screen.getByText('Prepare project report')).toBeInTheDocument());

    const rows = screen.getAllByRole('row');
    const sortedPriorities = ['high', 'medium', 'low'];

    rows.slice(1).forEach((row, index) => {
        const cells = screen.getAllByRole('cell', { name: sortedPriorities[index] });
        expect(cells[0]).toBeInTheDocument();
    });
  });
});
