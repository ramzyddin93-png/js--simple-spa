// home.ts
// Fix: Gör HomePageView synkron så att den omedelbart kan returnera ett element till main.ts.
// API-hämtningen (fetchPosts) sker nu separat i bakgrunden.

import { fetchPosts, type Post } from "../../../api/data-service"; // Dubbelkolla sökvägen till data-service!

// Funktion som skapar och returnerar DOM-elementet (synkront)
export default function HomePageView(): Node { 
    const view = document.createElement("div");
    view.classList.add("home-view");
    
    // Visar ett laddningsmeddelande direkt. Detta element returneras till main.ts
    view.innerHTML = `<h2>API-data från JSONPlaceholder</h2><p>Laddar inlägg...</p>`;

    // Anropa den asynkrona funktionen separat för att hämta data
    fetchAndRenderPosts(view);
    
    // Returnerar elementet OMEDELBART (vilket löser felet i main.ts)
    return view; 
}


// Asynkron funktion som hanterar datahämtning och uppdaterar elementet
async function fetchAndRenderPosts(view: HTMLElement) {
    try {
        const posts: Post[] = await fetchPosts();
        
        // Rensa laddningsmeddelandet
        view.innerHTML = `<h2>API-data från JSONPlaceholder</h2>`; 

        if (posts.length === 0) {
            view.innerHTML += `<p>Kunde inte ladda inlägg eller inga inlägg hittades.</p>`;
            return;
        }

        const list = document.createElement("ul");
        list.classList.add("post-list");

        posts.forEach((post) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <h4>${post.id}. ${post.title}</h4>
                <p>${post.body.substring(0, 100)}...</p>
            `;
            list.appendChild(listItem);
        });

        view.appendChild(list); 

    } catch (error) {


        
        view.innerHTML = `<h2>API-data</h2><p style="color: red;">Ett fel uppstod vid hämtning av data: ${error.message}</p>`;
    }
}
