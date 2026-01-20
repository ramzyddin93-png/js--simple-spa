// src/main.ts
import "./style.css";
import Navbar from "./components/navbar/navbar.ts";
import header from "./views/static/header/script";
import contactHTML from "./views/static/contact/index.html?raw";
import home from "./views/static/home";
import homePageView from "./views/static/home/index";

const getComponentForPage = (path: string): Node | null => {
  switch (path) {
    case "/home":
    case "/":
      return homePageView();
    case "/about":
      return (document.createElement("div").innerHTML = "<h2>About Page</h2>");
    case "/contact":
      const contactView = document.createElement("div");
      contactView.innerHTML = contactHTML;
      return contactView;
    default:
      return null;
  }
};

const app = document.querySelector("#app") as HTMLElement;

const renderApp = () => {
  const path = window.location.pathname;
  const component = getComponentForPage(path);

  app.innerHTML = ""; // Clear the app container

  // Attach the header and navbar
  app.appendChild(header());
  app.appendChild(Navbar());

  if (component) {
    app.appendChild(component);
  } else {
    app.textContent = "Sidan kunde inte hittas (404)"; // 404 Not Found Message
  }
};

renderApp();

window.addEventListener("popstate", renderApp);
