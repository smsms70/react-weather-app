import "../styles/header.css";

export function PageHeader () {
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
      </section>
    </>
  )
}