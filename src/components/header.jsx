import { useState, useEffect } from "react";
import "../styles/header.css";

export function PageHeader () {
  const [nightTheme, setNightTheme] = useState(true);

  const darkTheme = () => {
    document.body.setAttribute("data-theme", "dark");
    setNightTheme(true);
    localStorage.setItem("selectedTheme", "dark");
  }
  const lightTheme = () => {
    document.body.setAttribute("data-theme", "light");
    setNightTheme(false);
    localStorage.setItem("selectedTheme", "light");
  }
  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "light") {
      lightTheme()
    } else {
      darkTheme()
    }

  }, [])
    
  const themeToggler = () => nightTheme ? lightTheme() : darkTheme();
  

  return(
    <>
      <section id="header-page">
        
        <main id="header-box-container">
          <span>Weather App with  </span>
          <span id="header-box-img-container">
            <img src="../../icons/react.png" alt="react-logo"/>
          </span>
          <span>React</span>
        </main>
        <button id="theme-setter" onClick={themeToggler}>
          <img src={nightTheme ? "../../icons/dark.png" : "../../icons/light.png"} alt="" />
        </button>
      </section>
    </>
  )
}