
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

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='left'>Age</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="left">{item.age}</TableCell>
              <TableCell >
                <Stack direction="row" spacing={1} alignItems={"center"} justifyContent={"center"}>
                    <Button variant="contained" color="success">
                        Create
                    </Button>
                    <Button variant="outlined" color="error">
                        Delete
                    </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default DataTable;