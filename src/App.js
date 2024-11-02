import "./App.css";
import Dock from "./components/Dock";
import PlayingArea from "./components/PlayingArea";

function App() {
  return (
    <div className="App">
      <PlayingArea />
      <Dock />
    </div>
  );
}

export default App;
