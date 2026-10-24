import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {trivia} from '../content.js';
const identifiesDirector=q=>/\bwho\b.*\b(direct(?:ed|ing|or)?|made|remade|helmed)\b|\bwhich\b.*\b(director|filmmaker)\b|\bwhose\b.*\b(directorial|feature debut)\b/i.test(q);
test('no director-identification questions; indirect legacy forms covered',()=>{
 for(const q of ['Who directed X?','Who remade X?','Who made his feature debut with X?','Which filmmaker helmed X?']) assert.ok(identifiesDirector(q));
 for(const c of trivia)assert.ok(!identifiesDirector(c.question),c.id+': '+c.question);
});
test('all 11 reviewed replacements remain one-for-one',async()=>{
 const audit=JSON.parse(await readFile('editorial/director-replacements.json','utf8'));
 assert.equal(audit.length,11);
 for(const entry of audit){const c=trivia.find(c=>c.id===entry.id);assert.equal(c.question,entry.question);assert.equal(c.answer,entry.answer);assert.ok(entry.locator&&entry.review);}
});
