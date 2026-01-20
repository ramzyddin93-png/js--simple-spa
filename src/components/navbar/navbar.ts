// src/components/Navbar.ts
export default function Navbar(): HTMLElement {
  const nav = document.createElement("nav");

  nav.innerHTML = `
    <ul>
      <li><a href="/" data-page="home">Home</a></li>
      <li><a href="/about" data-page="about">About</a></li>
      <li><a href="/contact" data-page="contact">Contact</a></li>
    </ul>
  `;

  // Handle link clicks
  const links = nav.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const page = (event.target as HTMLAnchorElement).getAttribute(
        "data-page",
      );
      window.history.pushState({}, "", page);
      renderApp(); // Call the render function to change the view
    });
  });

  return nav;
}
