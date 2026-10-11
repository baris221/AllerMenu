import { mkdir, readFile, rm, writeFile } from "node:fs/promises";

const html = await readFile("index.html", "utf8");
const css = await readFile("styles.css", "utf8");
const js = await readFile("src/main.js", "utf8");
const hosting = await readFile(".openai/hosting.json", "utf8");

const server = `const assets = new Map([
  ["/", { type: "text/html; charset=utf-8", body: ${JSON.stringify(html)} }],
  ["/index.html", { type: "text/html; charset=utf-8", body: ${JSON.stringify(html)} }],
  ["/styles.css", { type: "text/css; charset=utf-8", body: ${JSON.stringify(css)} }],
  ["/src/main.js", { type: "application/javascript; charset=utf-8", body: ${JSON.stringify(js)} }],
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
  return String(value).toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "");
}

function termMatches(text, term) {
  const escapedTerm = term.replace(/[.*+?^\\\${}()|[\\]\\\\]/g, "\\\\$&");
  return new RegExp(\`(^|[^a-z])\${escapedTerm}([^a-z]|$)\`, "i").test(text);
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
      authorization: \`Bearer \${apiKey}\`,
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
          content: \`Analyze these menu dishes for likely allergens: \${JSON.stringify(dishes)}\`,
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
`;

await rm("dist", { recursive: true, force: true });
await mkdir("dist/server", { recursive: true });
await mkdir("dist/.openai", { recursive: true });
await writeFile("dist/server/index.js", server);
await writeFile("dist/.openai/hosting.json", hosting);
