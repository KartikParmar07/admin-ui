import './App.css';
import Header from './Components/Header';
import Table from './Components/Table';
import Search from './Components/Searchbar';
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="">
      <Header />
      <Search onSearchChange={setSearch} /> {/* Pass the setSearch function as a prop */}
      <Table search={search} /> {/* Pass the search state to the Table component */}
    </div>
  );
}
