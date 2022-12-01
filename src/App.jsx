import Mainform from "./components/Mainform"
import React from "react";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = React.useState(true);
  return (
    <div className="App">
      {loading?<Loading setLoading={setLoading}/>: <Mainform/>}
   </div>
  )
}

export default App
