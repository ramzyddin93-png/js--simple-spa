// src/api/data-service.ts
export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function fetchPosts(): Promise<Post[]> {
  // ⬅️ Vår API-länk! Den pekar på en testtjänst ('JSONPlaceholder')
  // som ger oss en lista med fejkade inlägg/data så att vi kan
  // visa att vår app kan hämta information från internet.
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  // ... (resten av koden)
  const result = await response.json();
  return result;
}
