import React, { forwardRef } from 'react';

const CustomTable = ({ tableName, headerRows, data }) => (
    <table className="table">
      <thead>
        <tr>
          {headerRows.map((row, index) => <th key={`${tableName}-header-${index}`} scope="col">{row}</th>)}
        </tr>
      </thead>
      <tbody>
      {data.map((item, index) => (
        <tr key={`${tableName}-row-${index}`} style={{ cursor: 'pointer'}}>
          <th scope="row">{item.id}</th>
          <td>{item.first_name + " " + item.last_name}</td>
          <td>{item.email}</td>
        </tr>
      ))}
      </tbody>
    </table>
);

export default CustomTable;
