const assets = new Map([
  ["/", { type: "text/html; charset=utf-8", body: "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>AllerMenu</title>\n    <link rel=\"stylesheet\" href=\"styles.css\" />\n  </head>\n  <body>\n    <main class=\"app-shell\">\n      <section class=\"workspace\" aria-labelledby=\"app-title\">\n        <div class=\"intro\">\n          <p class=\"eyebrow\">Menu allergen checker</p>\n          <h1 id=\"app-title\">AllerMenu</h1>\n          <p class=\"intro-copy\">\n            Upload a menu photo or text file, then review likely allergens by dish.\n          </p>\n        </div>\n\n        <div class=\"tool-layout\">\n          <section class=\"input-panel\" aria-label=\"Menu input\">\n            <label class=\"drop-zone\" for=\"menu-file\" id=\"drop-zone\">\n              <input\n                id=\"menu-file\"\n                type=\"file\"\n                accept=\".txt,.md,.csv,.json,.html,.htm,image/*\"\n              />\n              <span class=\"upload-icon\" aria-hidden=\"true\">+</span>\n              <span class=\"drop-title\">Upload menu</span>\n              <span class=\"drop-meta\">Text files are read directly. Photos are scanned in the browser.</span>\n            </label>\n\n            <label class=\"text-input-label\" for=\"menu-text\">Menu text</label>\n            <textarea\n              id=\"menu-text\"\n              placeholder=\"Paste dishes here, one per line. Example: Pesto pasta with parmesan and pine nuts\"\n            ></textarea>\n            <p class=\"status\" id=\"status\" role=\"status\"></p>\n\n            <div class=\"actions\">\n              <button id=\"analyze-button\" type=\"button\">Analyze menu</button>\n              <button id=\"clear-button\" type=\"button\" class=\"secondary\">Clear</button>\n            </div>\n          </section>\n\n          <section class=\"results-panel\" aria-live=\"polite\">\n            <div class=\"summary-strip\">\n              <div>\n                <span class=\"metric\" id=\"dish-count\">0</span>\n                <span class=\"metric-label\">allergic cases</span>\n              </div>\n              <div>\n                <span class=\"metric\" id=\"allergen-count\">0</span>\n                <span class=\"metric-label\">allergens found</span>\n              </div>\n            </div>\n\n            <section class=\"allergen-foods-panel\" aria-labelledby=\"allergen-foods-title\">\n              <div class=\"section-heading\">\n                <h2 id=\"allergen-foods-title\">Foods with allergens</h2>\n                <span id=\"allergen-foods-count\">0 listed</span>\n              </div>\n              <ul class=\"allergen-foods-list\" id=\"allergen-foods-list\">\n                <li>No allergic foods listed yet.</li>\n              </ul>\n            </section>\n\n            <div class=\"filter-row\" id=\"filter-row\" aria-label=\"Allergen filters\"></div>\n            <div class=\"results-list\" id=\"results-list\">\n              <div class=\"empty-state\">\n                <h2>No menu analyzed yet</h2>\n                <p>Paste menu text or upload a text file to see likely allergens.</p>\n              </div>\n            </div>\n          </section>\n        </div>\n      </section>\n    </main>\n\n    <script src=\"https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js\"></script>\n    <script src=\"/src/main.js\"></script>\n  </body>\n</html>\n" }],
  ["/index.html", { type: "text/html; charset=utf-8", body: "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>AllerMenu</title>\n    <link rel=\"stylesheet\" href=\"styles.css\" />\n  </head>\n  <body>\n    <main class=\"app-shell\">\n      <section class=\"workspace\" aria-labelledby=\"app-title\">\n        <div class=\"intro\">\n          <p class=\"eyebrow\">Menu allergen checker</p>\n          <h1 id=\"app-title\">AllerMenu</h1>\n          <p class=\"intro-copy\">\n            Upload a menu photo or text file, then review likely allergens by dish.\n          </p>\n        </div>\n\n        <div class=\"tool-layout\">\n          <section class=\"input-panel\" aria-label=\"Menu input\">\n            <label class=\"drop-zone\" for=\"menu-file\" id=\"drop-zone\">\n              <input\n                id=\"menu-file\"\n                type=\"file\"\n                accept=\".txt,.md,.csv,.json,.html,.htm,image/*\"\n              />\n              <span class=\"upload-icon\" aria-hidden=\"true\">+</span>\n              <span class=\"drop-title\">Upload menu</span>\n              <span class=\"drop-meta\">Text files are read directly. Photos are scanned in the browser.</span>\n            </label>\n\n            <label class=\"text-input-label\" for=\"menu-text\">Menu text</label>\n            <textarea\n              id=\"menu-text\"\n              placeholder=\"Paste dishes here, one per line. Example: Pesto pasta with parmesan and pine nuts\"\n            ></textarea>\n            <p class=\"status\" id=\"status\" role=\"status\"></p>\n\n            <div class=\"actions\">\n              <button id=\"analyze-button\" type=\"button\">Analyze menu</button>\n              <button id=\"clear-button\" type=\"button\" class=\"secondary\">Clear</button>\n            </div>\n          </section>\n\n          <section class=\"results-panel\" aria-live=\"polite\">\n            <div class=\"summary-strip\">\n              <div>\n                <span class=\"metric\" id=\"dish-count\">0</span>\n                <span class=\"metric-label\">allergic cases</span>\n              </div>\n              <div>\n                <span class=\"metric\" id=\"allergen-count\">0</span>\n                <span class=\"metric-label\">allergens found</span>\n              </div>\n            </div>\n\n            <section class=\"allergen-foods-panel\" aria-labelledby=\"allergen-foods-title\">\n              <div class=\"section-heading\">\n                <h2 id=\"allergen-foods-title\">Foods with allergens</h2>\n                <span id=\"allergen-foods-count\">0 listed</span>\n              </div>\n              <ul class=\"allergen-foods-list\" id=\"allergen-foods-list\">\n                <li>No allergic foods listed yet.</li>\n              </ul>\n            </section>\n\n            <div class=\"filter-row\" id=\"filter-row\" aria-label=\"Allergen filters\"></div>\n            <div class=\"results-list\" id=\"results-list\">\n              <div class=\"empty-state\">\n                <h2>No menu analyzed yet</h2>\n                <p>Paste menu text or upload a text file to see likely allergens.</p>\n              </div>\n            </div>\n          </section>\n        </div>\n      </section>\n    </main>\n\n    <script src=\"https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js\"></script>\n    <script src=\"/src/main.js\"></script>\n  </body>\n</html>\n" }],
  ["/styles.css", { type: "text/css; charset=utf-8", body: ":root {\n  color-scheme: light;\n  --ink: #1f2933;\n  --muted: #687782;\n  --panel: #ffffff;\n  --line: #d7dee4;\n  --soft: #f4f7f5;\n  --accent: #0f766e;\n  --accent-dark: #0b5f59;\n  --warning: #b45309;\n  --danger: #b91c1c;\n  --shadow: 0 18px 50px rgba(31, 41, 51, 0.12);\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  min-height: 100vh;\n  font-family:\n    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\",\n    sans-serif;\n  color: var(--ink);\n  background:\n    linear-gradient(135deg, rgba(15, 118, 110, 0.12), transparent 38%),\n    linear-gradient(225deg, rgba(180, 83, 9, 0.1), transparent 34%),\n    #eef3f1;\n}\n\nbutton,\ntextarea {\n  font: inherit;\n}\n\n.app-shell {\n  min-height: 100vh;\n  padding: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.workspace {\n  width: min(1180px, 100%);\n}\n\n.intro {\n  margin-bottom: 22px;\n}\n\n.eyebrow {\n  margin: 0 0 8px;\n  color: var(--accent-dark);\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\nh1 {\n  margin: 0;\n  font-size: clamp(2.4rem, 7vw, 5rem);\n  line-height: 0.95;\n}\n\n.intro-copy {\n  margin: 14px 0 0;\n  color: var(--muted);\n  max-width: 560px;\n  font-size: 1.05rem;\n}\n\n.tool-layout {\n  display: grid;\n  grid-template-columns: minmax(300px, 0.82fr) minmax(360px, 1.18fr);\n  gap: 18px;\n  align-items: stretch;\n}\n\n.input-panel,\n.results-panel {\n  background: rgba(255, 255, 255, 0.92);\n  border: 1px solid rgba(215, 222, 228, 0.9);\n  box-shadow: var(--shadow);\n  border-radius: 8px;\n}\n\n.input-panel {\n  padding: 18px;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.drop-zone {\n  min-height: 170px;\n  border: 2px dashed #9eb4ae;\n  border-radius: 8px;\n  background: var(--soft);\n  display: grid;\n  place-items: center;\n  align-content: center;\n  gap: 8px;\n  padding: 22px;\n  text-align: center;\n  cursor: pointer;\n  transition:\n    border-color 180ms ease,\n    background 180ms ease,\n    transform 180ms ease;\n}\n\n.drop-zone:hover,\n.drop-zone.dragging {\n  border-color: var(--accent);\n  background: #edf8f6;\n  transform: translateY(-1px);\n}\n\n.drop-zone input {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n\n.upload-icon {\n  width: 42px;\n  height: 42px;\n  display: grid;\n  place-items: center;\n  border-radius: 50%;\n  background: var(--accent);\n  color: white;\n  font-size: 2rem;\n  line-height: 1;\n}\n\n.drop-title {\n  font-weight: 800;\n}\n\n.drop-meta {\n  color: var(--muted);\n  font-size: 0.92rem;\n  max-width: 280px;\n}\n\n.text-input-label {\n  font-weight: 800;\n}\n\ntextarea {\n  min-height: 260px;\n  resize: vertical;\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 14px;\n  color: var(--ink);\n  background: #fbfdfc;\n  outline: none;\n}\n\ntextarea:focus {\n  border-color: var(--accent);\n  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.16);\n}\n\n.status {\n  min-height: 20px;\n  margin: -6px 0 0;\n  color: var(--muted);\n  font-size: 0.9rem;\n}\n\n.actions {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\nbutton {\n  border: 0;\n  border-radius: 8px;\n  padding: 12px 16px;\n  min-height: 46px;\n  font-weight: 800;\n  cursor: pointer;\n  background: var(--accent);\n  color: white;\n}\n\nbutton:hover {\n  background: var(--accent-dark);\n}\n\nbutton.secondary {\n  color: var(--ink);\n  background: #e8eeeb;\n}\n\nbutton.secondary:hover {\n  background: #dce5e1;\n}\n\n.results-panel {\n  min-height: 620px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n\n.summary-strip {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  border-bottom: 1px solid var(--line);\n  background: #fbfdfc;\n}\n\n.summary-strip > div {\n  padding: 18px;\n}\n\n.summary-strip > div + div {\n  border-left: 1px solid var(--line);\n}\n\n.metric {\n  display: block;\n  font-size: 2rem;\n  font-weight: 900;\n}\n\n.metric-label {\n  color: var(--muted);\n  font-size: 0.9rem;\n}\n\n.allergen-foods-panel {\n  padding: 16px 18px;\n  border-bottom: 1px solid var(--line);\n  background: #fffaf0;\n}\n\n.section-heading {\n  display: flex;\n  justify-content: space-between;\n  align-items: baseline;\n  gap: 12px;\n  margin-bottom: 10px;\n}\n\n.section-heading h2 {\n  margin: 0;\n  font-size: 1rem;\n}\n\n.section-heading span {\n  color: var(--muted);\n  font-size: 0.86rem;\n  font-weight: 800;\n}\n\n.allergen-foods-list {\n  display: grid;\n  gap: 8px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n.allergen-foods-list li {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  border: 1px solid #fed7aa;\n  border-radius: 8px;\n  padding: 9px 10px;\n  background: #fff;\n  color: var(--ink);\n  font-size: 0.92rem;\n}\n\n.food-allergens {\n  flex: 0 0 auto;\n  color: #7c2d12;\n  font-weight: 800;\n}\n\n.filter-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  padding: 14px 18px;\n  border-bottom: 1px solid var(--line);\n}\n\n.filter-chip {\n  border: 1px solid var(--line);\n  border-radius: 999px;\n  padding: 7px 10px;\n  background: #fff;\n  color: var(--ink);\n  font-size: 0.86rem;\n}\n\n.filter-chip.active {\n  border-color: var(--accent);\n  background: #dff4ef;\n}\n\n.results-list {\n  overflow: auto;\n  padding: 18px;\n  display: grid;\n  gap: 12px;\n}\n\n.empty-state {\n  min-height: 320px;\n  display: grid;\n  place-content: center;\n  text-align: center;\n  color: var(--muted);\n}\n\n.empty-state h2 {\n  margin: 0 0 8px;\n  color: var(--ink);\n}\n\n.dish-card {\n  border: 1px solid var(--line);\n  border-radius: 8px;\n  padding: 14px;\n  background: #fff;\n}\n\n.dish-header {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n  align-items: flex-start;\n}\n\n.dish-title {\n  margin: 0;\n  font-size: 1rem;\n  line-height: 1.35;\n}\n\n.risk {\n  flex: 0 0 auto;\n  border-radius: 999px;\n  padding: 5px 8px;\n  font-size: 0.78rem;\n  font-weight: 900;\n  color: #fff;\n  background: var(--warning);\n}\n\n.risk.none {\n  background: #24724f;\n}\n\n.allergen-tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 7px;\n  margin-top: 12px;\n}\n\n.allergen-tag {\n  border-radius: 999px;\n  padding: 6px 9px;\n  background: #fef3c7;\n  color: #7c2d12;\n  font-size: 0.84rem;\n  font-weight: 800;\n}\n\n.matched-terms {\n  margin: 10px 0 0;\n  color: var(--muted);\n  font-size: 0.88rem;\n  line-height: 1.45;\n}\n\n.notice {\n  padding: 12px 18px;\n  color: #7c2d12;\n  background: #fff7ed;\n  border-bottom: 1px solid #fed7aa;\n  font-size: 0.9rem;\n}\n\n@media (max-width: 850px) {\n  .app-shell {\n    padding: 20px;\n    align-items: flex-start;\n  }\n\n  .tool-layout {\n    grid-template-columns: 1fr;\n  }\n\n  .results-panel {\n    min-height: 460px;\n  }\n}\n\n@media (max-width: 520px) {\n  .app-shell {\n    padding: 14px;\n  }\n\n  .input-panel,\n  .results-panel {\n    border-radius: 8px;\n  }\n\n  .summary-strip {\n    grid-template-columns: 1fr;\n  }\n\n  .summary-strip > div + div {\n    border-left: 0;\n    border-top: 1px solid var(--line);\n  }\n\n  .dish-header {\n    display: grid;\n  }\n}\n" }],
  ["/src/main.js", { type: "application/javascript; charset=utf-8", body: "const allergenCatalog = [\n  {\n    name: \"Gluten\",\n    terms: [\n      \"wheat\",\n      \"barley\",\n      \"rye\",\n      \"bread\",\n      \"breadcrumbs\",\n      \"pasta\",\n      \"noodle\",\n      \"flour\",\n      \"seitan\",\n      \"couscous\",\n      \"bulgur\",\n      \"soy sauce\",\n      \"crouton\",\n      \"pastry\",\n      \"pizza\",\n    ],\n  },\n  {\n    name: \"Milk\",\n    terms: [\n      \"milk\",\n      \"cream\",\n      \"butter\",\n      \"cheese\",\n      \"parmesan\",\n      \"mozzarella\",\n      \"yogurt\",\n      \"yoghurt\",\n      \"feta\",\n      \"ricotta\",\n      \"ghee\",\n      \"casein\",\n      \"whey\",\n    ],\n  },\n  {\n    name: \"Eggs\",\n    terms: [\"egg\", \"eggs\", \"mayonnaise\", \"aioli\", \"meringue\", \"custard\", \"hollandaise\"],\n  },\n  {\n    name: \"Peanuts\",\n    terms: [\"peanut\", \"peanuts\", \"satay\", \"groundnut\"],\n  },\n  {\n    name: \"Tree nuts\",\n    terms: [\n      \"almond\",\n      \"hazelnut\",\n      \"walnut\",\n      \"cashew\",\n      \"pecan\",\n      \"pistachio\",\n      \"macadamia\",\n      \"pine nut\",\n      \"pinenut\",\n      \"nutella\",\n      \"marzipan\",\n    ],\n  },\n  {\n    name: \"Soy\",\n    terms: [\"soy\", \"soya\", \"tofu\", \"edamame\", \"miso\", \"tempeh\", \"tamari\"],\n  },\n  {\n    name: \"Fish\",\n    terms: [\"fish\", \"salmon\", \"tuna\", \"cod\", \"anchovy\", \"anchovies\", \"sardine\", \"bass\", \"trout\"],\n  },\n  {\n    name: \"Shellfish\",\n    terms: [\n      \"shrimp\",\n      \"prawn\",\n      \"crab\",\n      \"lobster\",\n      \"clam\",\n      \"mussel\",\n      \"oyster\",\n      \"scallop\",\n      \"shellfish\",\n      \"calamari\",\n    ],\n  },\n  {\n    name: \"Sesame\",\n    terms: [\"sesame\", \"tahini\", \"halva\", \"benne\"],\n  },\n  {\n    name: \"Mustard\",\n    terms: [\"mustard\", \"dijon\"],\n  },\n  {\n    name: \"Celery\",\n    terms: [\"celery\", \"celeriac\"],\n  },\n  {\n    name: \"Sulphites\",\n    terms: [\"sulphite\", \"sulfite\", \"wine\", \"vinegar\", \"dried fruit\"],\n  },\n  {\n    name: \"Lupin\",\n    terms: [\"lupin\", \"lupine\"],\n  },\n];\n\nconst menuFile = document.querySelector(\"#menu-file\");\nconst dropZone = document.querySelector(\"#drop-zone\");\nconst menuText = document.querySelector(\"#menu-text\");\nconst analyzeButton = document.querySelector(\"#analyze-button\");\nconst clearButton = document.querySelector(\"#clear-button\");\nconst resultsList = document.querySelector(\"#results-list\");\nconst filterRow = document.querySelector(\"#filter-row\");\nconst dishCount = document.querySelector(\"#dish-count\");\nconst allergenCount = document.querySelector(\"#allergen-count\");\nconst allergenFoodsCount = document.querySelector(\"#allergen-foods-count\");\nconst allergenFoodsList = document.querySelector(\"#allergen-foods-list\");\nconst statusText = document.querySelector(\"#status\");\n\nlet activeFilter = \"All\";\nlet currentResults = [];\n\nfunction normalizeText(value) {\n  return value\n    .toLowerCase()\n    .normalize(\"NFD\")\n    .replace(/[\\u0300-\\u036f]/g, \"\");\n}\n\nfunction splitMenuItems(text) {\n  return text\n    .split(/\\n|(?:\\s{2,})|(?:\\s[-–]\\s)/)\n    .map((item) => item.replace(/^[\\s\\d.)•*-]+/, \"\").trim())\n    .filter((item) => item.length > 2);\n}\n\nfunction termMatches(text, term) {\n  const escapedTerm = term.replace(/[.*+?^${}()|[\\]\\\\]/g, \"\\\\$&\");\n  const pattern = new RegExp(`(^|[^a-z])${escapedTerm}([^a-z]|$)`, \"i\");\n  return pattern.test(text);\n}\n\nfunction analyzeDishByKeywords(dish) {\n  const normalizedDish = normalizeText(dish);\n\n  const allergens = allergenCatalog\n    .map((allergen) => {\n      const matches = allergen.terms.filter((term) => termMatches(normalizedDish, normalizeText(term)));\n      return matches.length ? { name: allergen.name, evidence: matches.join(\", \"), confidence: \"medium\" } : null;\n    })\n    .filter(Boolean);\n\n  return { dish, allergens };\n}\n\nfunction renderFilters(results) {\n  const allergicResults = results.filter((result) => result.allergens.length);\n  const foundAllergens = [\n    ...new Set(allergicResults.flatMap((result) => result.allergens.map((item) => item.name))),\n  ];\n  const filters = [\"All\", ...foundAllergens.sort()];\n\n  if (!filters.includes(activeFilter)) {\n    activeFilter = \"All\";\n  }\n\n  filterRow.innerHTML = \"\";\n  filters.forEach((filter) => {\n    const button = document.createElement(\"button\");\n    button.type = \"button\";\n    button.className = `filter-chip${filter === activeFilter ? \" active\" : \"\"}`;\n    button.textContent = filter;\n    button.addEventListener(\"click\", () => {\n      activeFilter = filter;\n      renderResults(currentResults);\n    });\n    filterRow.appendChild(button);\n  });\n}\n\nfunction renderAllergenFoods(allergicResults) {\n  allergenFoodsCount.textContent = `${allergicResults.length} listed`;\n  allergenFoodsList.innerHTML = \"\";\n\n  if (!allergicResults.length) {\n    allergenFoodsList.innerHTML = \"<li>No allergic foods listed yet.</li>\";\n    return;\n  }\n\n  allergicResults.forEach((result) => {\n    const listItem = document.createElement(\"li\");\n    const allergenNames = result.allergens.map((allergen) => allergen.name).join(\", \");\n\n    listItem.innerHTML = `\n      <span>${escapeHtml(result.dish)}</span>\n      <span class=\"food-allergens\">${escapeHtml(allergenNames)}</span>\n    `;\n    allergenFoodsList.appendChild(listItem);\n  });\n}\n\nfunction renderResults(results) {\n  currentResults = results;\n  const allergicResults = results.filter((result) => result.allergens.length);\n  const uniqueAllergens = new Set(allergicResults.flatMap((result) => result.allergens.map((item) => item.name)));\n  const visibleResults =\n    activeFilter === \"All\"\n      ? allergicResults\n      : allergicResults.filter((result) => result.allergens.some((allergen) => allergen.name === activeFilter));\n\n  dishCount.textContent = String(allergicResults.length);\n  allergenCount.textContent = String(uniqueAllergens.size);\n  renderAllergenFoods(allergicResults);\n  renderFilters(results);\n  resultsList.innerHTML = \"\";\n\n  if (!results.length) {\n    resultsList.innerHTML = `\n      <div class=\"empty-state\">\n        <h2>No readable menu text</h2>\n        <p>Paste dish names and ingredients, then analyze again.</p>\n      </div>\n    `;\n    return;\n  }\n\n  if (!visibleResults.length) {\n    resultsList.innerHTML = `\n      <div class=\"empty-state\">\n        <h2>No allergic cases found</h2>\n        <p>Detected allergen matches will appear here after analysis.</p>\n      </div>\n    `;\n    return;\n  }\n\n  visibleResults.forEach((result) => {\n    const card = document.createElement(\"article\");\n    card.className = \"dish-card\";\n\n    const allergenTags = result.allergens\n      .map((allergen) => `<span class=\"allergen-tag\">${escapeHtml(allergen.name)}</span>`)\n      .join(\"\");\n\n    const matchedTerms = result.allergens\n      .map((allergen) => `${allergen.name}: ${allergen.evidence || \"likely ingredient match\"}`)\n      .join(\" | \");\n\n    card.innerHTML = `\n      <div class=\"dish-header\">\n        <h2 class=\"dish-title\">${escapeHtml(result.dish)}</h2>\n        <span class=\"risk\">Check</span>\n      </div>\n      <div class=\"allergen-tags\">${allergenTags}</div>\n      <p class=\"matched-terms\">${escapeHtml(matchedTerms)}</p>\n    `;\n    resultsList.appendChild(card);\n  });\n}\n\nfunction escapeHtml(value) {\n  return value\n    .replace(/&/g, \"&amp;\")\n    .replace(/</g, \"&lt;\")\n    .replace(/>/g, \"&gt;\")\n    .replace(/\"/g, \"&quot;\")\n    .replace(/'/g, \"&#039;\");\n}\n\nfunction analyzeMenuWithKeywords() {\n  const dishes = splitMenuItems(menuText.value);\n  renderResults(dishes.map(analyzeDishByKeywords));\n}\n\nasync function analyzeMenu() {\n  const dishes = splitMenuItems(menuText.value);\n\n  if (!dishes.length) {\n    renderResults([]);\n    return;\n  }\n\n  analyzeButton.disabled = true;\n  statusText.textContent = \"Understanding dishes with AI...\";\n\n  try {\n    const response = await fetch(\"/api/analyze\", {\n      method: \"POST\",\n      headers: { \"content-type\": \"application/json\" },\n      body: JSON.stringify({ dishes }),\n    });\n\n    if (!response.ok) {\n      throw new Error(\"AI analysis failed\");\n    }\n\n    const data = await response.json();\n    renderResults(Array.isArray(data.items) ? data.items : []);\n    statusText.textContent = data.usedFallback\n      ? \"AI was unavailable, so keyword analysis was used.\"\n      : \"AI analysis complete.\";\n  } catch (error) {\n    analyzeMenuWithKeywords();\n    statusText.textContent = \"AI was unavailable, so keyword analysis was used.\";\n  } finally {\n    analyzeButton.disabled = false;\n  }\n}\n\nfunction showNotice(message) {\n  const existingNotice = document.querySelector(\".notice\");\n  existingNotice?.remove();\n\n  const notice = document.createElement(\"div\");\n  notice.className = \"notice\";\n  notice.textContent = message;\n  document.querySelector(\".results-panel\").prepend(notice);\n\n  window.setTimeout(() => notice.remove(), 7000);\n}\n\nasync function handleFile(file) {\n  if (!file) return;\n\n  if (file.type.startsWith(\"image/\")) {\n    if (!window.Tesseract) {\n      showNotice(\"Photo scanning needs the OCR script to load. Paste the menu text if it is unavailable.\");\n      return;\n    }\n\n    analyzeButton.disabled = true;\n    statusText.textContent = \"Scanning menu photo...\";\n    try {\n      const result = await window.Tesseract.recognize(file, \"eng\", {\n        logger: (event) => {\n          if (event.status === \"recognizing text\") {\n            statusText.textContent = `Scanning menu photo... ${Math.round(event.progress * 100)}%`;\n          }\n        },\n      });\n      menuText.value = result.data.text.trim();\n      statusText.textContent = \"Photo scanned.\";\n      await analyzeMenu();\n    } catch (error) {\n      showNotice(\"The photo could not be scanned. Paste the menu text and analyze it manually.\");\n      statusText.textContent = \"\";\n    } finally {\n      analyzeButton.disabled = false;\n    }\n    return;\n  }\n\n  const text = await file.text();\n  menuText.value = text;\n  statusText.textContent = `Loaded ${file.name}.`;\n  await analyzeMenu();\n}\n\nmenuFile.addEventListener(\"change\", (event) => {\n  handleFile(event.target.files[0]);\n});\n\ndropZone.addEventListener(\"dragover\", (event) => {\n  event.preventDefault();\n  dropZone.classList.add(\"dragging\");\n});\n\ndropZone.addEventListener(\"dragleave\", () => {\n  dropZone.classList.remove(\"dragging\");\n});\n\ndropZone.addEventListener(\"drop\", (event) => {\n  event.preventDefault();\n  dropZone.classList.remove(\"dragging\");\n  handleFile(event.dataTransfer.files[0]);\n});\n\nanalyzeButton.addEventListener(\"click\", analyzeMenu);\n\nclearButton.addEventListener(\"click\", () => {\n  menuText.value = \"\";\n  menuFile.value = \"\";\n  statusText.textContent = \"\";\n  activeFilter = \"All\";\n  renderResults([]);\n});\n" }],
]);

const fallbackCatalog = [
  { name: "Gluten", terms: ["wheat", "barley", "rye", "bread", "breadcrumbs", "pasta", "noodle", "flour", "seitan", "couscous", "bulgur", "soy sauce", "crouton", "pastry", "pizza"] },
  { name: "Milk", terms: ["milk", "cream", "butter", "cheese", "parmesan", "mozzarella", "yogurt", "yoghurt", "feta", "ricotta", "ghee", "casein", "whey"] },
  { name: "Eggs", terms: ["egg", "eggs", "mayonnaise", "aioli", "meringue", "custard", "hollandaise"] },
  { name: "Peanuts", terms: ["peanut", "peanuts", "satay", "groundnut"] },
  { name: "Tree nuts", terms: ["almond", "hazelnut", "walnut", "cashew", "pecan", "pistachio", "macadamia", "pine nut", "pinenut", "nutella", "marzipan"] },
  { name: "Soy", terms: ["soy", "soya", "tofu", "edamame", "miso", "tempeh", "tamari"] },
  { name: "Fish", terms: ["fish", "salmon", "tuna", "cod", "anchovy", "anchovies", "sardine", "bass", "trout"] },
  { name: "Shellfish", terms: ["shrimp", "prawn", "crab", "lobster", "clam", "mussel", "oyster", "scallop", "shellfish", "calamari"] },
  { name: "Sesame", terms: ["sesame", "tahini", "halva", "benne"] },
  { name: "Mustard", terms: ["mustard", "dijon"] },
  { name: "Celery", terms: ["celery", "celeriac"] },
  { name: "Sulphites", terms: ["sulphite", "sulfite", "wine", "vinegar", "dried fruit"] },
  { name: "Lupin", terms: ["lupin", "lupine"] },
];

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function normalizeText(value) {
  return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function termMatches(text, term) {
  const escapedTerm = term.replace(/[.*+?^\${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z])${escapedTerm}([^a-z]|$)`, "i").test(text);
}

function fallbackAnalyze(dishes) {
  return dishes.map((dish) => {
    const normalizedDish = normalizeText(dish);
    const allergens = fallbackCatalog
      .map((allergen) => {
        const matches = allergen.terms.filter((term) => termMatches(normalizedDish, normalizeText(term)));
        return matches.length
          ? { name: allergen.name, evidence: matches.join(", "), confidence: "medium" }
          : null;
      })
      .filter(Boolean);
    return { dish, allergens };
  });
}

function extractResponseText(data) {
  if (typeof data.output_text === "string") return data.output_text;

  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === "string") return content.text;
    }
  }

  return "";
}

async function analyzeWithOpenAI(dishes, env = {}) {
  const apiKey = env.OPENAI_API_KEY;
  if (!apiKey) {
    return { items: fallbackAnalyze(dishes), usedFallback: true };
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || "gpt-5.6-luna",
      input: [
        {
          role: "system",
          content:
            "You analyze restaurant menu dishes for likely allergens. Infer common hidden ingredients from dish names and descriptions, but do not invent allergens without a plausible culinary basis. Return only dishes with likely allergens. This is informational and not medical advice.",
        },
        {
          role: "user",
          content: `Analyze these menu dishes for likely allergens: ${JSON.stringify(dishes)}`,
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "menu_allergen_analysis",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    dish: { type: "string" },
                    allergens: {
                      type: "array",
                      items: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          name: { type: "string" },
                          evidence: { type: "string" },
                          confidence: { type: "string", enum: ["low", "medium", "high"] },
                        },
                        required: ["name", "evidence", "confidence"],
                      },
                    },
                  },
                  required: ["dish", "allergens"],
                },
              },
            },
            required: ["items"],
          },
        },
      },
    }),
  });

  if (!response.ok) {
    return { items: fallbackAnalyze(dishes), usedFallback: true };
  }

  try {
    const data = await response.json();
    const parsed = JSON.parse(extractResponseText(data));
    return { items: Array.isArray(parsed.items) ? parsed.items : [], usedFallback: false };
  } catch (error) {
    return { items: fallbackAnalyze(dishes), usedFallback: true };
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/analyze" && request.method === "POST") {
      try {
        const body = await request.json();
        const dishes = Array.isArray(body.dishes)
          ? body.dishes.map((dish) => String(dish).trim()).filter(Boolean).slice(0, 80)
          : [];
        return jsonResponse(await analyzeWithOpenAI(dishes, env));
      } catch (error) {
        return jsonResponse({ items: [], usedFallback: true }, 400);
      }
    }

    const asset = assets.get(url.pathname) || assets.get("/");

    return new Response(asset.body, {
      headers: {
        "content-type": asset.type,
        "cache-control": url.pathname === "/" ? "no-store" : "public, max-age=3600",
      },
    });
  },
};
