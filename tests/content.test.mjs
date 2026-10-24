import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {trivia} from '../content.js';
test('500 unique IDs/questions with complete paired assets and editorial references',async()=>{
 assert.equal(trivia.length,500);assert.equal(new Set(trivia.map(c=>c.id)).size,500);
 const normalize=s=>s.toLowerCase().replace(/[^a-z0-9]/g,'');
 assert.equal(new Set(trivia.map(c=>normalize(c.question))).size,500);
 let bytes=0;
 for(const card of trivia){
  assert.ok(card.answer.trim()&&card.question.endsWith('?'));
  assert.equal(new URL(card.source.url).protocol,'https:');assert.ok(card.source.note);
  for(const phase of ['question','answer']){
   assert.ok(card[phase+'Alt'].length>30);assert.ok(card[phase+'Caption']);
   const file=card[phase+'Image'];assert.ok(file.startsWith('assets/'));const svg=await readFile(file,'utf8');
   assert.ok(svg.startsWith('<svg'));assert.ok(!/<script|https?:\/\/[^\s]*\.(png|jpg)|<image/.test(svg));bytes+=(await stat(file)).size;
  }
 }
 assert.ok(bytes<1_500_000,`Uncompressed illustration budget: ${bytes}`);
});
test('original cards preserved and topics interleaved',()=>{
 assert.deepEqual(trivia.slice(0,3).map(c=>c.answer),['The banshee.','Count Orlok.','Turnips.']);
 assert.deepEqual(trivia.slice(0,3).map(c=>c.questionImage),['assets/moor.svg','assets/cinema.svg','assets/cottage.svg']);
 for(let i=3;i<trivia.length-5;i++)assert.ok(new Set(trivia.slice(i,i+6).map(c=>c.category)).size>=2);
});
