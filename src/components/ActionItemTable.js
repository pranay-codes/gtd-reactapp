import React from 'react';
import './ActionItemTable.css';
import { Table } from 'react-bootstrap';

const ActionItemTable = ({ items }) => {
    if (items.length === 0) {
        return <p>No action items available</p>;
    }
    return (
  <Table striped bordered hover role='table'>
    <thead>
      <tr>
        <th>Action</th>
        <th>Priority</th>
        <th>Context</th>
        <th>Date Created</th>
        <th>Due Date</th>
      </tr>
    </thead>
    <tbody>
      {items.map(item => (
        <tr key={item.id}>
          <td>{item.action}</td>
          <td>{item.priority}</td>
          <td>{item.context}</td>
          <td>{item.dateCreated}</td>
          <td>{item.dueDate}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)
};

export default ActionItemTable;
