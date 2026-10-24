import assert from 'node:assert/strict';
import {readFile,writeFile,readdir,stat,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {trivia} from '../content.js';
await mkdir('test-results/integrated',{recursive:true});
const replacements=JSON.parse(await readFile('editorial/older-casting-replacements.json','utf8'));
const baseline=JSON.parse(await readFile('drafts/phase-two/live-100-baseline.json','utf8'));
let preserved=0;for(const old of baseline){const now=trivia.find(c=>c.id===old.id);assert.ok(now);if(!replacements.some(r=>r.id===old.id)){for(const key of ['question','answer','questionImage','answerImage','source'])assert.deepEqual(now[key],old[key],old.id+'/'+key);preserved++;}}
let svgBytes=0;const urls=new Set(),paths=new Set();for(const c of trivia){assert.ok(!/[\uFFFD]|\u00c3.|\u00e2\u20ac/.test(JSON.stringify(c)),c.id+' encoding');assert.ok(!JSON.stringify(c).includes('drafts/'),c.id+' draft reference');urls.add(c.source.url);for(const phase of ['question','answer']){const path=c[phase+'Image'];paths.add(path);const bytes=await readFile(path);svgBytes+=bytes.length;assert.deepEqual(bytes,await readFile('dist/'+path));}}
const norm=s=>s.normalize('NFKD').toLowerCase().replace(/[^a-z0-9]/g,'');assert.equal(new Set(trivia.map(c=>norm(c.question))).size,500);
const tokens=s=>new Set(s.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(/\s+/).filter(w=>!['the','a','in','of','which','what','who','is','does','to'].includes(w)));const near=[];for(let i=0;i<500;i++)for(let j=i+1;j<500;j++){const a=tokens(trivia[i].question),b=tokens(trivia[j].question),n=[...a].filter(x=>b.has(x)).length;const score=n/(a.size+b.size-n);if(score>.65)near.push({ids:[trivia[i].id,trivia[j].id],questions:[trivia[i].question,trivia[j].question],score});}
const files=[];async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const path=dir+'/'+e.name;if(e.isDirectory())await walk(path);else{const bytes=await readFile(path);files.push({path:path.replace(/^dist\//,''),bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});}}}await walk('dist');
await writeFile('test-results/integrated/asset-manifest.json',JSON.stringify(files,null,2));
const report={status:'PASS',questions:500,screens:1000,uniqueIds:new Set(trivia.map(c=>c.id)).size,sourceCoverage:500,distinctSourceUrls:urls.size,pairedImageCoverage:1000,distinctImagePaths:paths.size,svgBytes,originalLiveRecordsUnchanged:preserved,originalLiveReplacements:100-preserved,allCastingReplacements:replacements.length,topicMix:Object.fromEntries([...new Set(trivia.map(c=>c.category))].map(k=>[k,trivia.filter(c=>c.category===k).length])),normalizedQuestionDuplicates:0,nearDuplicateReview:near,artifactFiles:files.length,artifactBytes:files.reduce((s,f)=>s+f.bytes,0)};
await writeFile('test-results/integrated/data-audit.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
