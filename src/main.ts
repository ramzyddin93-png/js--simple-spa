// skit i denna errors dem är bullshits
import "./style.css";
import header from "./views/static/header/script";
import contactHTML from "./views/static/contact/index.html?raw";
// import footer from "./views/dynamic/footer";
// import integerGenerator from "./views/dynamic/integerGenerator";
// import uuidGenerator from "./views/dynamic/uuidGenerator";

const getCurrentPage = () => {
  const currentPage = window.location.pathname;

  switch (currentPage) {
    case "/":
    // case "/home":
    //   return homeHTML;
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

const app = document.querySelector("#app")!;

const renderApp = () => {
  const currentPage = getCurrentPage();

  if (typeof currentPage === "string") {
    app.innerHTML += `
      ${currentPage}
    `;
    app.appendChild(header());
  } else {
    app.appendChild(header());
    app.appendChild(currentPage);
  }
};

renderApp();

window.addEventListener("popstate", renderApp);
