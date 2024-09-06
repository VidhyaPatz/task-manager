import { FaCheckCircle } from "react-icons/fa";
// src/components/Header.jsx
// Creates the header and formats the heading
function Header() {
  return (
    <header>
      <FaCheckCircle size={50}/>
      <h1>Tasks</h1>
    </header>
  );
}

export default Header;