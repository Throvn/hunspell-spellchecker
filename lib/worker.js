import { Spellchecker } from "./index.js";

const spellchecker = new Spellchecker();

const affFetch = fetch("./en/en_EN.aff");
const dicFetch = fetch("./en/en_EN.dic");

const fetches = await Promise.all([
    affFetch,
    dicFetch,
]);

const contents = await Promise.all([
    fetches[0].text(),
    fetches[1].text(),
]);

const dict = spellchecker.parse({
    aff: contents[0],
    dic: contents[1],
});

spellchecker.use(dict);

console.log("[Spellchecker] INITIALIZED");

/**
 * Gets invoked when the main thread sends something over.
 * @param {MessageEvent<Array<string>>} msg 
 * @returns 
 */
self.onmessage = (msg) => {
    if (typeof msg.data !== "object") return [];
    const words = msg.data;
    const list = [];
    for (const word of words) {
        const suggestions = spellchecker.suggest(word);
        list.push({
            word,
            suggestions,
            isCorrect: Boolean(suggestions.length),
        });
    }
    return list;
}