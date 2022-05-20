import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home"
import Restaurant from "./screens/Restaurant"
import Update from "./screens/Update"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants/:id" element={<Restaurant />} />
        <Route path="/restaurants/:id/update" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
