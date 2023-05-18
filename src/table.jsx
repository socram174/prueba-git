import React, { useState } from 'react';

const DataTable = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [filterCriteria, setFilterCriteria] = useState('');

  const handleFilterChange = (e) => {
    const keyword = e.target.value;
    setFilterCriteria(keyword);

    // Perform filtering logic based on keyword
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <input
        type="text"
        value={filterCriteria}
        onChange={handleFilterChange}
        placeholder="Filter by name..."
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
