import React from 'react';

const CustomTable = ({ tableName, headerRows, data, onClickRow }) => (
    <table className="table">
      <thead>
        <tr>
          {headerRows.map((row, index) => <th key={`${tableName}-header-${index}`} scope="col">{row}</th>)}
        </tr>
      </thead>
      <tbody>
      {data.map((item, index) => (
        <tr key={`${tableName}-row-${index}`} style={{ cursor: 'pointer'}} onClick={() => onClickRow(item)}>
          <th scope="row">{item.id}</th>
          <td>{item.first_name + " " + item.last_name}</td>
          <td>{item.phone_number}</td>
        </tr>
      ))}
      </tbody>
    </table>
);

export default CustomTable;
