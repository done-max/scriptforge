import { sanitizeScreenplayText, parseScreenplayText } from '../src/utils/fountainParser.js';

const dirtySample = `INT. SHIP â€“ NIGHT

The rain drums against the hull.

ODYSSEUS
Iâ€™m not sureâ€¦ weâ€™re running out of shoreline.

â€œLook at the water.â€

%PDF-1.4 binary garbage \x00\x01\x02
endobj`;

console.log('--- ORIGINAL DIRTY ---');
console.log(dirtySample);
console.log('--- CLEANED ---');
const clean = sanitizeScreenplayText(dirtySample);
console.log(clean);

const parsed = parseScreenplayText(clean, 'THE ODYSSEY TEST');
console.log('--- PARSED SCENE CONTENT ---');
console.log('Slugline:', parsed.scenes[0].slugline);
console.log('Dialogue line:', parsed.scenes[0].dialogueLines[0]?.line);
console.log('Characters:', parsed.characters.map(c => c.name));
