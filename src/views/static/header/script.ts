
     //  ! = fixar undefined error ifall du använder det som en metod, e.g const a = b.!
export function generateRandomInt(min: number, max: number,) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function integerGenerator() { // Bygger upp all HTML som visas (input-fält, knapp och resultat-box).
  const view = document.createElement("div");
  view.classList.add("generator-view");
  view.innerHTML = `
    <h2>Slumpmässigt Heltal</h2>
    <div class="controls">
      <label for="min-input">Minimum:</label>
      <input type="number" id="min-input" value="1" min="0">
      <label for="max-input">Maximum:</label>
      <input type="number" id="max-input" value="100" min="1">
      <button type="button" id="generate-button">Generera Värde</button>
    </div>
    <div class="result-box">
      <p>Genererat värde:</p>
      <div id="result-output" class="output">?</div>
    </div>
  `;

  const minInput = view.querySelector("#min-input"); // Hämtar referenser till alla HTML-element vi behöver interagera med (input, knapp, output).
  const maxInput = view.querySelector("#max-input");
  const generateButton = view.querySelector("#generate-button");
  const resultOutput = view.querySelector("#result-output");

  const handleGenerate = () => {
    const min = parseInt(minInput.value);
    const max: m = parseInt(maxInput.value);

    if (isNaN(min) || isNaN(max) || min > max) { // Enkel validering: Kollar om värdena är ogiltiga eller om min > max.
      resultOutput!.textContent = "Ogiltigt intervall!";
      (resultOutput as HTMLElement)!.style.color = "red";
      return;
    }
    resultOutput.style.color = "black";
    const value = generateRandomInt(min, max); // Kör funktionen som räknar fram slumptalet och visar resultatet.
    resultOutput.textContent = value;
  };

  if (generateButton) { // Kopplar 'handleGenerate' till klick-eventet på knappen.
    generateButton.addEventListener("click", handleGenerate);
  }

  return view; // Returnerar hela den färdiga komponenten.
}
