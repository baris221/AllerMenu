const allergenCatalog = [
  {
    name: "Gluten",
    terms: [
      "wheat",
      "barley",
      "rye",
      "bread",
      "breadcrumbs",
      "pasta",
      "noodle",
      "flour",
      "seitan",
      "couscous",
      "bulgur",
      "soy sauce",
      "crouton",
      "pastry",
      "pizza",
    ],
  },
  {
    name: "Milk",
    terms: [
      "milk",
      "cream",
      "butter",
      "cheese",
      "parmesan",
      "mozzarella",
      "yogurt",
      "yoghurt",
      "feta",
      "ricotta",
      "ghee",
      "casein",
      "whey",
    ],
  },
  {
    name: "Eggs",
    terms: ["egg", "eggs", "mayonnaise", "aioli", "meringue", "custard", "hollandaise"],
  },
  {
    name: "Peanuts",
    terms: ["peanut", "peanuts", "satay", "groundnut"],
  },
  {
    name: "Tree nuts",
    terms: [
      "almond",
      "hazelnut",
      "walnut",
      "cashew",
      "pecan",
      "pistachio",
      "macadamia",
      "pine nut",
      "pinenut",
      "nutella",
      "marzipan",
    ],
  },
  {
    name: "Soy",
    terms: ["soy", "soya", "tofu", "edamame", "miso", "tempeh", "tamari"],
  },
  {
    name: "Fish",
    terms: ["fish", "salmon", "tuna", "cod", "anchovy", "anchovies", "sardine", "bass", "trout"],
  },
  {
    name: "Shellfish",
    terms: [
      "shrimp",
      "prawn",
      "crab",
      "lobster",
      "clam",
      "mussel",
      "oyster",
      "scallop",
      "shellfish",
      "calamari",
    ],
  },
  {
    name: "Sesame",
    terms: ["sesame", "tahini", "halva", "benne"],
  },
  {
    name: "Mustard",
    terms: ["mustard", "dijon"],
  },
  {
    name: "Celery",
    terms: ["celery", "celeriac"],
  },
  {
    name: "Sulphites",
    terms: ["sulphite", "sulfite", "wine", "vinegar", "dried fruit"],
  },
  {
    name: "Lupin",
    terms: ["lupin", "lupine"],
  },
];

const menuFile = document.querySelector("#menu-file");
const dropZone = document.querySelector("#drop-zone");
const menuText = document.querySelector("#menu-text");
const analyzeButton = document.querySelector("#analyze-button");
const clearButton = document.querySelector("#clear-button");
const resultsList = document.querySelector("#results-list");
const filterRow = document.querySelector("#filter-row");
const dishCount = document.querySelector("#dish-count");
const allergenCount = document.querySelector("#allergen-count");
const allergenFoodsCount = document.querySelector("#allergen-foods-count");
const allergenFoodsList = document.querySelector("#allergen-foods-list");
const statusText = document.querySelector("#status");

let activeFilter = "All";
let currentResults = [];

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function splitMenuItems(text) {
  return text
    .split(/\n|(?:\s{2,})|(?:\s[-–]\s)/)
    .map((item) => item.replace(/^[\s\d.)•*-]+/, "").trim())
    .filter((item) => item.length > 2);
}

function termMatches(text, term) {
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(^|[^a-z])${escapedTerm}([^a-z]|$)`, "i");
  return pattern.test(text);
}

function analyzeDishByKeywords(dish) {
  const normalizedDish = normalizeText(dish);

  const allergens = allergenCatalog
    .map((allergen) => {
      const matches = allergen.terms.filter((term) => termMatches(normalizedDish, normalizeText(term)));
      return matches.length ? { name: allergen.name, evidence: matches.join(", "), confidence: "medium" } : null;
    })
    .filter(Boolean);

  return { dish, allergens };
}

function renderFilters(results) {
  const allergicResults = results.filter((result) => result.allergens.length);
  const foundAllergens = [
    ...new Set(allergicResults.flatMap((result) => result.allergens.map((item) => item.name))),
  ];
  const filters = ["All", ...foundAllergens.sort()];

  if (!filters.includes(activeFilter)) {
    activeFilter = "All";
  }

  filterRow.innerHTML = "";
  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-chip${filter === activeFilter ? " active" : ""}`;
    button.textContent = filter;
    button.addEventListener("click", () => {
      activeFilter = filter;
      renderResults(currentResults);
    });
    filterRow.appendChild(button);
  });
}

function renderAllergenFoods(allergicResults) {
  allergenFoodsCount.textContent = `${allergicResults.length} listed`;
  allergenFoodsList.innerHTML = "";

  if (!allergicResults.length) {
    allergenFoodsList.innerHTML = "<li>No allergic foods listed yet.</li>";
    return;
  }

  allergicResults.forEach((result) => {
    const listItem = document.createElement("li");
    const allergenNames = result.allergens.map((allergen) => allergen.name).join(", ");

    listItem.innerHTML = `
      <span>${escapeHtml(result.dish)}</span>
      <span class="food-allergens">${escapeHtml(allergenNames)}</span>
    `;
    allergenFoodsList.appendChild(listItem);
  });
}

function renderResults(results) {
  currentResults = results;
  const allergicResults = results.filter((result) => result.allergens.length);
  const uniqueAllergens = new Set(allergicResults.flatMap((result) => result.allergens.map((item) => item.name)));
  const visibleResults =
    activeFilter === "All"
      ? allergicResults
      : allergicResults.filter((result) => result.allergens.some((allergen) => allergen.name === activeFilter));

  dishCount.textContent = String(allergicResults.length);
  allergenCount.textContent = String(uniqueAllergens.size);
  renderAllergenFoods(allergicResults);
  renderFilters(results);
  resultsList.innerHTML = "";

  if (!results.length) {
    resultsList.innerHTML = `
      <div class="empty-state">
        <h2>No readable menu text</h2>
        <p>Paste dish names and ingredients, then analyze again.</p>
      </div>
    `;
    return;
  }

  if (!visibleResults.length) {
    resultsList.innerHTML = `
      <div class="empty-state">
        <h2>No allergic cases found</h2>
        <p>Detected allergen matches will appear here after analysis.</p>
      </div>
    `;
    return;
  }

  visibleResults.forEach((result) => {
    const card = document.createElement("article");
    card.className = "dish-card";

    const allergenTags = result.allergens
      .map((allergen) => `<span class="allergen-tag">${escapeHtml(allergen.name)}</span>`)
      .join("");

    const matchedTerms = result.allergens
      .map((allergen) => `${allergen.name}: ${allergen.evidence || "likely ingredient match"}`)
      .join(" | ");

    card.innerHTML = `
      <div class="dish-header">
        <h2 class="dish-title">${escapeHtml(result.dish)}</h2>
        <span class="risk">Check</span>
      </div>
      <div class="allergen-tags">${allergenTags}</div>
      <p class="matched-terms">${escapeHtml(matchedTerms)}</p>
    `;
    resultsList.appendChild(card);
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function analyzeMenuWithKeywords() {
  const dishes = splitMenuItems(menuText.value);
  renderResults(dishes.map(analyzeDishByKeywords));
}

async function analyzeMenu() {
  const dishes = splitMenuItems(menuText.value);

  if (!dishes.length) {
    renderResults([]);
    return;
  }

  analyzeButton.disabled = true;
  statusText.textContent = "Understanding dishes with AI...";

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ dishes }),
    });

    if (!response.ok) {
      throw new Error("AI analysis failed");
    }

    const data = await response.json();
    renderResults(Array.isArray(data.items) ? data.items : []);
    statusText.textContent = data.usedFallback
      ? "AI was unavailable, so keyword analysis was used."
      : "AI analysis complete.";
  } catch (error) {
    analyzeMenuWithKeywords();
    statusText.textContent = "AI was unavailable, so keyword analysis was used.";
  } finally {
    analyzeButton.disabled = false;
  }
}

function showNotice(message) {
  const existingNotice = document.querySelector(".notice");
  existingNotice?.remove();

  const notice = document.createElement("div");
  notice.className = "notice";
  notice.textContent = message;
  document.querySelector(".results-panel").prepend(notice);

  window.setTimeout(() => notice.remove(), 7000);
}

async function handleFile(file) {
  if (!file) return;

  if (file.type.startsWith("image/")) {
    if (!window.Tesseract) {
      showNotice("Photo scanning needs the OCR script to load. Paste the menu text if it is unavailable.");
      return;
    }

    analyzeButton.disabled = true;
    statusText.textContent = "Scanning menu photo...";
    try {
      const result = await window.Tesseract.recognize(file, "eng", {
        logger: (event) => {
          if (event.status === "recognizing text") {
            statusText.textContent = `Scanning menu photo... ${Math.round(event.progress * 100)}%`;
          }
        },
      });
      menuText.value = result.data.text.trim();
      statusText.textContent = "Photo scanned.";
      await analyzeMenu();
    } catch (error) {
      showNotice("The photo could not be scanned. Paste the menu text and analyze it manually.");
      statusText.textContent = "";
    } finally {
      analyzeButton.disabled = false;
    }
    return;
  }

  const text = await file.text();
  menuText.value = text;
  statusText.textContent = `Loaded ${file.name}.`;
  await analyzeMenu();
}

menuFile.addEventListener("change", (event) => {
  handleFile(event.target.files[0]);
});

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragging");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragging");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragging");
  handleFile(event.dataTransfer.files[0]);
});

analyzeButton.addEventListener("click", analyzeMenu);

clearButton.addEventListener("click", () => {
  menuText.value = "";
  menuFile.value = "";
  statusText.textContent = "";
  activeFilter = "All";
  renderResults([]);
});
