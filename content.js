import { expansion } from './content-expanded.js';
import { additions } from './content-extra.js';
import { artDescriptions } from './art-descriptions.js';
// Original three cards retain their approved text and illustrations.
const originals = [
  {
    category: 'Folklore', place: 'Ireland · A voice in the dark',
    question: 'In Irish folklore, whose mournful wail foretells a death?',
    answer: 'The banshee.',
    explanation: 'A supernatural woman whose lament is said to warn of an approaching death. A voice from folklore, carried through the darkness.',
    questionImage: 'assets/moor.svg', answerImage: 'assets/spirit.svg',
    questionAlt: 'An empty moonlit Irish moor, with a ruined abbey and bare trees.',
    answerAlt: 'An original illustration of a veiled, spectral woman on the moonlit moor.',
    questionCaption: 'I. A lament on the moor', answerCaption: 'I. The woman of the night',
    source: { name: 'Merriam-Webster · Banshee', url: 'https://www.merriam-webster.com/dictionary/banshee', note: 'The dictionary defines the banshee as a female spirit in Gaelic folklore whose wailing warns of an imminent death.' }
  },
  {
    category: 'Horror cinema', place: 'Germany · The silent era',
    question: 'What is the vampire’s name in the original Nosferatu (1922)?',
    answer: 'Count Orlok.',
    explanation: 'Max Schreck played the uncanny count in F. W. Murnau’s silent classic. This unofficial Dracula adaptation changed the vampire’s name to Orlok.',
    questionImage: 'assets/cinema.svg', answerImage: 'assets/count.svg',
    questionAlt: 'An empty expressionist staircase with a shaft of warm light.',
    answerAlt: 'An original silhouette of a pointed-eared vampire casting a long shadow on a staircase.',
    questionCaption: 'II. Shadows of the silent screen', answerCaption: 'II. A symphony of shadows',
    source: { name: 'British Film Institute · Nosferatu (1922)', url: 'https://www.bfi.org.uk/resources-events-teachers/resources-teachers/gothic-classroom/film-2-nosferatu-1922', note: 'BFI identifies Count Orlok, played by Max Schreck, as the renamed Dracula character in Murnau’s film.' }
  },
  {
    category: 'Halloween history', place: 'Ireland · Before the pumpkin',
    question: 'Which root vegetable was carved into early Irish jack-o’-lanterns?',
    answer: 'Turnips.',
    explanation: 'Long before pumpkin lanterns became familiar, people in Ireland carved eerie faces into turnips to keep wandering spirits at bay.',
    questionImage: 'assets/cottage.svg', answerImage: 'assets/lantern.svg',
    questionAlt: 'An old Irish cottage with a warm window beside an empty woodland path. No vegetables are shown.',
    answerAlt: 'An original illustration of a glowing carved turnip lantern on a stone wall.',
    questionCaption: 'III. An old October custom', answerCaption: 'III. A light for wandering souls',
    source: { name: 'HISTORY · The Irish origins of jack-o’-lanterns', url: 'https://www.history.com/articles/history-of-the-jack-o-lantern-irish-origins', note: 'HISTORY describes carved turnips in Ireland and Scotland, and the later adoption of pumpkins in America.' }
  }
];
const initial = originals.map((card,i)=>({...card,id:['original-banshee','original-orlok','original-turnips'][i],difficulty:'approachable'})).concat(additions.map(card=>card.questionImage.startsWith('assets/revisions/')?card:({...card,
 questionAlt:`${artDescriptions[card.scene]}. Original atmospheric illustration; no answer text is shown.`,
 answerAlt:`${artDescriptions[card.scene]}, with a reveal ornament. Accompanies: ${card.answer}`,
 questionCaption:artDescriptions[card.scene],answerCaption:artDescriptions[card.scene]
})));

const rest=initial.slice(3).concat(expansion);
const kind=c=>/cinema/i.test(c.category)?0:/literature/i.test(c.category)?1:/folklore/i.test(c.category)?2:3;
const queues=[0,1,2,3].map(k=>rest.filter(c=>kind(c)===k));
const ordered=[];while(queues.some(q=>q.length))for(const q of queues)if(q.length)ordered.push(q.shift());
export const trivia=initial.slice(0,3).concat(ordered);
