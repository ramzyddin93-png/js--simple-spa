import "./style.css";
import header from "./views//static/header/script";
import homeHTML from "./views/static/home/index.html?raw";
import contactHTML from "./views/static/contact/index.html?raw";
// import footer from "./views/dynamic/footer";
// import integerGenerator from "./views/dynamic/integerGenerator";
// import uuidGenerator from "./views/dynamic/uuidGenerator";

const getCurrentPage = () => {
  const currentPage = window.location.pathname;

  switch (currentPage) {
    case "/":
    case "/home":
      return homeHTML;
    // case "/integer":
    //   return integerGenerator();
    // case "/uuid":
    //   return uuidGenerator();
    case "/contact":
      return contactHTML;
    default:
      return (window.location.pathname = "/home");
  }
};

const app = document.querySelector("#app");

const renderApp = () => {
  const currentPage = getCurrentPage();

  // Clear the app content but keep the header intact
  app.innerHTML = ''; // This ensures we're not overwriting the header each time

  // Add the header first
  app.appendChild(header());

  // Insert the current page content (it could be raw HTML, or an actual element)
  if (typeof currentPage === "string") {
    app.innerHTML += currentPage; // Append HTML if the page is just a string
  } else {
    app.appendChild(currentPage); // Append element if it's an actual DOM node
  }
};


renderApp();

window.addEventListener("popstate", renderApp);
