import { useState, useEffect,createContext } from "react";
import "./App.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TransitionsModal from "./modal";

export const DataContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchQuery(keyword);

    // Perform filtering logic based on searchQuery
    const filtered = data.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(keyword.toLowerCase());
      const codeMatch = item.code.toString().includes(keyword);
      const descriptionMatch = item.description.toLowerCase().includes(keyword.toLowerCase())

      return nameMatch || codeMatch || descriptionMatch; // Match if either name or code or description matches
    });

    setFilteredData(filtered);
  };

  async function fetchData() {
    setLoading(true);
    console.log("fetching data...");
    // aqui va el fetch para traer los datos
    setData(data);
    setFilteredData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData().then(() => {setLoading(false)});
  }, []);


  return (
    <>
    <DataContext.Provider value={{setData,setFilteredData}}>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by code, name or description..."
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, minHeight:300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">CODE</TableCell>
                <TableCell align="center">NAME</TableCell>
                <TableCell align="center">DESCRIPTION</TableCell>
                <TableCell align="center">ACTIONS 
                <Stack
                      direction="row"
                      spacing={1}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <TransitionsModal type={"edit"} updateTable={fetchData}/>
                      <TransitionsModal type={"delete"} updateTable={fetchData}/>
                      
                    </Stack>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ?("FETCHING DATA..."):(
                <>
                                {filteredData.map((item) => (
                <TableRow
                  key={item.name + item.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {item.code}
                  </TableCell>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.description}</TableCell>
                </TableRow>
              ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </DataContext.Provider>
    </>
  );
}

export default App;
