import Header from "./components/Header.jsx";
import NavBar from "./components/NavBar.jsx";
import Controler from "./components/Controler.jsx";

function App() {
  return (
    <div className="overscroll-y-none">
      <div className="h-screen flex flex-col">
        <NavBar></NavBar>
        <Header></Header>
      </div>
      <section className="h-screen mt-40 bg-gradient-to-b from-transparent to-yellow-50 p-9 ">
        <Controler></Controler>
      </section>
      <section className="h-screen bg-gradient-to-b from-yellow-50 to-blue-200 "></section>
    </div>
  );
}

export default App;
