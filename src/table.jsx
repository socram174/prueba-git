import React, { useState } from 'react';

const DataTable = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);

    // Perform filtering logic based on searchQuery
    const filtered = data.filter((item) => {
      const nameMatch = item.name
        .toLowerCase()
        .includes(keyword.toLowerCase());
      const ageMatch = item.age.toString().includes(keyword);

      return nameMatch || ageMatch; // Match if either name or age matches
    });

    setFilteredData(filtered);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search by name or age..."
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