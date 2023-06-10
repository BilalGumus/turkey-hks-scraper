import AddressBar from "./components/AddressBar.jsx";
import Hero from "./components/Hero.jsx";
import DatePicker from "./components/DatePicker.jsx";
import Scrap from "./components/Scrap.jsx";
import Terminal from "./components/Terminal";
import Export from "./components/Export.jsx";
import Footer from "./components/Footer.jsx";

function App() {  
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="grow w-full px-4 max-w-[777px] mx-auto">
        <AddressBar />
        <Hero />
        <div className="mt-16">
          <DatePicker />
        </div>
        <div className="mt-12 mb-4">
          <div className="flex justify-end gap-4 mb-4">
            <Scrap />
          </div>
          <Terminal />
        </div>
        <Export />
      </div>
      <Footer />
    </div>
  );
}

export default App;

// MY FETCH METHOD
// async function fetchData() {
//   const response = await fetch("http://localhost:3001/");
//   const data = await response.json();
//   return data;
// }
// useEffect(() => {
//   (async () => {
//     const data = await fetchData();
//     console.log(data);
//   })();
// }, []);
// MY FETCH METHOD END

// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/tauri";

// const [greetMsg, setGreetMsg] = useState("");
// const [name, setName] = useState("");

// async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
//   setGreetMsg(await invoke("greet", { name }));
// }

{
  /* <a
        href="https://ticaret.gov.tr/"
        target="_blank"
        className="inline-block min-h-[74px]"
      >
        <img
          src="/ticaret-logo.png"
          className="logo ticaret mt-4"
          alt="Ticaret logo"
        />
      </a>  */
}
{
  /* 
        <div>
          <h1>Welcome to Tauri!</h1>
        <div className="row">
          <div>
            <input
              id="greet-input"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Enter a name..."
            />
            <button type="button" onClick={() => greet()}>
              Greet
            </button>
          </div>
        </div>
        <p>{greetMsg}</p>
        <button type="button" onClick={() => fetchAPI()}>
          FETCH API
        </button>
        <p className="mb-8">{APIMsg}</p> 
        </div>
        */
}
