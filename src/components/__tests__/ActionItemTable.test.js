/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import ActionItemTable from '../ActionItemTable';

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

describe('ActionItemTable', () => {
  it('renders a table with action items', () => {
    const { getByText } = render(<ActionItemTable items={mockItems} />);

    expect(getByText('Prepare project report')).toBeInTheDocument();
    expect(getByText('high')).toBeInTheDocument();
    expect(getByText('Development')).toBeInTheDocument();
    expect(getByText('2024-01-01')).toBeInTheDocument();
    expect(getByText('2024-02-04')).toBeInTheDocument();
  });
});
