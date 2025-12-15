// src/home/index.ts (uppdaterad version för att inkludera API-logiken)

import { fetchPosts, Post } from '../api/data-service'; //Importerar vår API-tjänst och Post-typen.

export async function HomePageView(): Promise<HTMLDivElement> {
    const view = document.createElement('div');
    view.classList.add('home-view');
    view.innerHTML = '<h2>API-data från JSONPlaceholder</h2><p>Laddar inlägg...</p>'; //Den här vyn måste vara asynkron eftersom den anropar en asynkron funktion.

    try {
        const posts: Post[] = await fetchPosts();

        // Rensa "Laddar..." meddelandet
        view.innerHTML = '<h2>API-data från JSONPlaceholder</h2>'; //Visar ett laddningsmeddelande medan vi väntar på API:et.

        if (posts.length === 0) {
            view.innerHTML += '<p>Kunde inte ladda inlägg eller inga inlägg hittades.</p>';
            return view;
        }

        const list = document.createElement('ul'); //Här hämtas datan. await pausar vyn tills vi har fått alla inlägg.
        list.classList.add('post-list');
        
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h4>${post.id}. ${post.title}</h4>
                <p>${post.body.substring(0, 100)}...</p> //Bygger upp HTML för listan och använder de typade fälten (id, title, body).
            // substring används för att korta ner texten lite.
            `;
            list.appendChild(listItem); // Lägger till elementet i UL-listan.
        });

        view.appendChild(list); // Hela den färdiga listan läggs till i huvudvyn.

    } catch (error) {
        view.innerHTML = `<h2>API-data</h2><p style="color: red;">Ett fel uppstod vid hämtning av data: ${error.message}</p>`; // Fångar upp fel om API-anropet misslyckades (t.ex. nätverket dog). // Visar ett rött felmeddelande direkt i vyn istället för att krascha appen.
} 
    }

    return view; // Returnerar det färdiga HTML-elementet till main.ts.
