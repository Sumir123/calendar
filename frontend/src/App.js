import "./App.css";
import Calander from "./components/calander";
import Footer from "./components/footer";
import Navbar from "./components/navbar";


function App() {
  return (
    <div className="App">
      <Navbar />
      <Calander />
      <Footer />
    </div>
  );
}

export default App;
