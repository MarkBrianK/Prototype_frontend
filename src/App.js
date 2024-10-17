import React from "react";
import Meeting from "./Components/Meeting";
import Document from "./Components/Document"
import Sales from "./Components/Sales"
import Messager from "./Components/Messager";
import Calendar from "./Components/Calendar"


function App() {
  return (
    <div>
      <Meeting/>
      <Document/>
      <Sales />
      <Messager/>
      <Calendar/>
    </div>
  )
}

export default App
