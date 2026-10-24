import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {batch01} from '../drafts/phase-two/batch-01.js';
import {batch02} from '../drafts/phase-two/batch-02.js';
import {batch03} from '../drafts/phase-two/batch-03.js';
import {batch04} from '../drafts/phase-two/batch-04.js';
const batches=[batch01,batch02,batch03,batch04],cards=[];
await mkdir('assets/expansion',{recursive:true});
for(let i=0;i<100;i++)for(const batch of batches){const c=structuredClone(batch[i]);for(const phase of ['question','answer']){const source=c[phase+'Image'];if(source.startsWith('drafts/')){const dest='assets/expansion/'+source.split('/').at(-1);await copyFile(source,dest);c[phase+'Image']=dest;}}cards.push(c);}
await writeFile('content-expanded.js','// 400 reviewed expansion records. Regenerate with scripts/integrate-expansion.mjs.\nexport const expansion = '+JSON.stringify(cards,null,2)+';\n');
let content=await readFile('content.js','utf8');
if(!content.includes("import { expansion }")){
content="import { expansion } from './content-expanded.js';\n"+content.replace('export const trivia =','const initial =').replace('...card,\n questionAlt:',"...card,\n questionAlt:");
// Keep the reviewed replacement art captions; enrich only the original 97 artwork family.
content=content.replace('additions.map(card=>({...card,','additions.map(card=>card.questionImage.startsWith(\'assets/revisions/\')?card:({...card,');
content+=`\nconst rest=initial.slice(3).concat(expansion);\nconst kind=c=>/cinema/i.test(c.category)?0:/literature/i.test(c.category)?1:/folklore/i.test(c.category)?2:3;\nconst queues=[0,1,2,3].map(k=>rest.filter(c=>kind(c)===k));\nconst ordered=[];while(queues.some(q=>q.length))for(const q of queues)if(q.length)ordered.push(q.shift());\nexport const trivia=initial.slice(0,3).concat(ordered);\n`;
await writeFile('content.js',content);
}
let build=await readFile('scripts/build.mjs','utf8');if(!build.includes("'content-expanded.js'"))build=build.replace("'content-extra.js',","'content-extra.js', 'content-expanded.js',");await writeFile('scripts/build.mjs',build);
let html=await readFile('index.html','utf8');html=html.replace('01 / 100','01 / 500').replace('100 TALES','500 TALES').replace('One hundred questions','Five hundred questions').replace('max="100" value="1"','max="500" value="1"');await writeFile('index.html',html);
let test=await readFile('tests/content.test.mjs','utf8');test=test.replaceAll('100 unique','500 unique').replaceAll('length,100','length,500').replaceAll('size,100','size,500');await writeFile('tests/content.test.mjs',test);
test=await readFile('tests/player.test.mjs','utf8');test=test.replace('100 cards and 200','500 cards and 1000').replace('length,100','length,500').replace('i<400','i<2000').replace('i%200','i%1000');await writeFile('tests/player.test.mjs',test);
console.log('Integrated 500 questions; source and SVG assets bundled for production.');
