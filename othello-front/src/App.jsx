import BoardContextProvider from "./store/boardContext";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import ResultModal from "./components/ResultModal";

function App() {
  return (
    <BoardContextProvider >
      <Header />
      <ResultModal />
      <GameBoard />
    </BoardContextProvider>
  );
}

export default App;