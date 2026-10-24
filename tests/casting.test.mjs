import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {trivia} from '../content.js';
const eligible={'cin-herzog':1979,'cin-laurie':1978,'cin-others':2001,'cin-getout':2017,'cin-darkwater':2005,'b01-teenwolf':1985,'b01-selene':2003,'b01-fido':2006,'b02-vincent':1982,'b02-beetlejuice':1988,'b01-ash':1987,'b01-tucker':2010,'b04-hurt':1980,'b04-goldblum':1986,'b04-lively':2016};
const actorPrompt=q=>/\bwho\b.*\b(play(?:s|ed)?|star(?:s|red)?|portray\w*|voic\w*|narrat\w*|cast)\b|\bwhich\s+(actor|actress|performer|star)\b|\b(actor|actress|performer)\b.*\b(role|cast|film)\b/i.test(q);
test('no film actor/casting identification before 1978; unreviewed casting fails closed',()=>{
 for(const c of trivia.filter(c=>/cinema/i.test(c.category)))if(actorPrompt(c.question)){assert.ok(eligible[c.id]>=1978,c.id+': actor question needs a reviewed release year');const year=c.question.match(/\((\d{4})\)/);if(year)assert.equal(Number(year[1]),eligible[c.id]);}
 for(const id of Object.keys(eligible))assert.ok(actorPrompt(trivia.find(c=>c.id===id).question),id);
 for(const q of ['Who voiced the monster?','Who was cast as Dracula?','Which actor played the Count?','Who narrated the film?'])assert.ok(actorPrompt(q)||/\bwho\b.*\bcast\b/i.test(q));
});
test('11 older casting replacements retain IDs and supported replacement answers',async()=>{
 const audit=JSON.parse(await readFile('editorial/older-casting-replacements.json','utf8'));assert.equal(audit.length,11);
 for(const r of audit){assert.ok(r.excludedFilmYear<1978);const c=trivia.find(c=>c.id===r.id);assert.equal(c.question,r.question);assert.equal(c.answer,r.answer);assert.equal(c.source.url,r.source.url);assert.ok(c.source.locator);assert.ok(!actorPrompt(c.question));}
});
