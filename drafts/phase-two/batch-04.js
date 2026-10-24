// Final local batch. Every answer checked against the named source passage.
const bfi=s=>`https://www.bfi.org.uk/lists/${s}`;
const book=id=>`https://www.gutenberg.org/files/${id}/${id}-h/${id}-h.htm`;
export const sources={
 korea:['BFI - South Korean horror',bfi('10-great-south-korean-horror-films')],mexico:['BFI - Mexican horror',bfi('10-great-mexican-horror-films')],body:['BFI - Body horror',bfi('10-great-body-horror-films')],sharks:['BFI - Shark attack films',bfi('10-great-shark-attack-films')],
 willows:['Algernon Blackwood - The Willows',book(11438)],yellow:['Robert W. Chambers - The King in Yellow',book(8492)],border:['William Hope Hodgson - The House on the Borderland','https://www.gutenberg.org/cache/epub/10002/pg10002-images.html'],vampyre:['John William Polidori - The Vampyre',book(6087)],northanger:['Jane Austen - Northanger Abbey',book(121)],mariner:['Samuel Taylor Coleridge - The Rime of the Ancient Mariner',book(151)],goblin:['Christina Rossetti - Poems',book(19188)],brown:['Nathaniel Hawthorne - Mosses from an Old Manse',book(512)],
 drametse:['UNESCO - Drametse mask dance','https://www.unesco.org/archives/multimedia/document-614'],makishi:['UNESCO - Makishi masquerade','https://www.unesco.org/archives/multimedia/document-644'],gule:['UNESCO - Gule Wamkulu','https://www.unesco.org/archives/multimedia/document-634'],gelede:['UNESCO - Gelede','https://www.unesco.org/archives/multimedia/document-613'],devils:['UNESCO - Dancing Devils','https://www.unesco.org/archives/multimedia/document-3769'],kurenti:['UNESCO - Kurenti rounds','https://www.unesco.org/archives/multimedia/document-4643'],buso:['UNESCO - Buso festivities','https://www.unesco.org/archives/multimedia/document-322'],unicef:['UNICEF USA - Trick-or-Treat history','https://www.unicefusa.org/stories/history-of-unicef-trick-or-treat']
};
const cinema=`
pianist|What is Kim Dong-sik's musical profession in The Housemaid (1960)?|Pianist.|livingroom|korea|The Housemaid section
butterflies|What insects does the biologist collect in Suddenly in Dark Night (1981)?|Butterflies.|forest|korea|Suddenly in Dark Night section
phonejob|What is Ji-won's profession in Phone (2002)?|Journalist.|screen|korea|Phone section
sonata|Which Beethoven sonata is played by a ghost in Phone (2002)?|Moonlight Sonata.|piano|korea|Phone section
joseon|A Tale of Two Sisters (2003) draws on a tale from which Korean dynasty?|Joseon.|manor|korea|A Tale of Two Sisters section
rpoint|In which war-torn country is R-Point (2004) set in 1972?|Vietnam.|plantation|korea|R-Point section
priest|What religious vocation does Sang-hyun have in Thirst (2009)?|Catholic priest.|chapel|korea|Thirst section
wailing|What is Jong-gu's job in The Wailing (2016)?|Police officer.|village|korea|The Wailing section
convento|What religious building shelters the travelers in El fantasma del convento (1934)?|A monastery.|road|mexico|El fantasma del convento section
lucha|Which Mexican wrestling tradition mixes with horror in The Body Snatcher (1957)?|Lucha libre.|ringarena|mexico|The Body Snatcher section
comet|What celestial object brings the baron back in The Brainiac (1962)?|A comet.|ruins|mexico|The Brainiac section
bermudadoll|What eerie toy is found floating at sea in The Bermuda Triangle (1978)?|A doll.|ocean|mexico|The Bermuda Triangle section
estrella|What is the young heroine called in Tigers Are Not Afraid (2017)?|Estrella.|alley|mexico|Tigers Are Not Afraid section
centuries|How many centuries pass before the baron returns in The Brainiac (1962)?|Three.|castle|mexico|1661 and 1961 in The Brainiac section
hurt|Who plays the experimenting professor in Altered States (1980)?|William Hurt.|laboratory|body|Altered States section
goldblum|Who plays the inventor in The Fly (1986)?|Jeff Goldblum.|laboratory|body|The Fly section
teleport|Which technology is being tested when the accident occurs in The Fly (1986)?|Teleportation.|laboratory|body|The Fly section
toronto|In which Canadian city was The Fly (1986) filmed?|Toronto.|alley|body|The Fly section
aylmer|What is the parasitic creature called in Brain Damage (1988)?|Aylmer.|bedchamber|body|Brain Damage section
amity|Which island community is threatened by the shark in Jaws (1975)?|Amity Island.|coast|sharks|Jaws section
benchley|Who wrote the novel adapted as Jaws (1975)?|Peter Benchley.|coast|sharks|Jaws section
brody|What is the police chief's full name in Jaws (1975)?|Martin Brody.|coast|sharks|Jaws section
hooper|What scientific profession does Matt Hooper practice in Jaws (1975)?|Oceanographer.|ocean|sharks|Jaws section
mako|Which kind of shark is genetically modified in Deep Blue Sea (1999)?|Mako sharks.|underwater|sharks|Deep Blue Sea section
lively|Who plays stranded surfer Nancy in The Shallows (2016)?|Blake Lively.|coast|sharks|The Shallows section
`;
const folklore=`
gargoyle|What practical job does a traditional architectural gargoyle perform?|Draining rainwater away from a building.|chapel|gargoyle|Definition 1a
jackalope|A jackalope combines a jackrabbit's body with the horns of which animal?|An antelope.|desert|jackalope|Definition
yeti|What other name is given to the legendary yeti?|The abominable snowman.|mountain|yeti|Definition
amphisbaena|Where are the two heads of the mythical amphisbaena located?|One at each end of its body.|ruins|amphisbaena|Definition
leviathan|Which biblical sea monster lends its name to something enormous and powerful?|Leviathan.|ocean|leviathan|Definition 1 and Did You Know
behemoth|In which biblical book is the mighty beast Behemoth described?|The Book of Job.|river|behemoth|Definition 1
fomorian|The Fomorians, legendary sea raiders, belong to which tradition?|Celtic legend.|coast|fomorian|Definition
scry|What is the fortune-telling practice of crystal gazing also called?|Scrying.|study|scry|Verb, intransitive definition
oneiro|Oneiromancy attempts to tell the future by interpreting what?|Dreams.|bedchamber|oneiromancy|Definition
chiro|Chiromancy is another name for which form of divination?|Palmistry.|study|chiromancy|Definition
carto|What everyday gaming objects are used in cartomancy?|Playing cards.|livingroom|cartomancy|Definition
augury|Ancient augurs interpreted the flight patterns of which animals?|Birds.|ruins|augury|Definition example
unicorn|Where on a traditional unicorn's head is its single horn?|In the middle of its forehead.|forest|unicorn|Definition 1a
manes|Which ancient civilization honored the spirits of the dead called Manes?|Ancient Rome.|graveyard|manes|Definition 1
lemures|In early Roman belief, were lemures spirits of the buried or unburied dead?|The unburied dead.|underworld|lemures|Definition
thaumaturgy|What does thaumaturgy mean: the performance of miracles or the study of insects?|The performance of miracles.|laboratory|thaumaturgy|Definition
stone|What legendary substance did alchemists seek to transform base metals into gold?|The philosopher's stone.|laboratory|philosopher%27s%20stone|Definition
ectoplasm|What substance supposedly allows spirits to materialize in spiritualist belief?|Ectoplasm.|livingroom|ectoplasm|Definition 2; a belief, not an established phenomenon
pentagram|How many points does the usual occult pentagram have?|Five.|study|pentagram|Primary definition
coven|What is a gathering or band of witches called?|A coven.|forest|coven|Definition 2; no fixed size asserted
biblio|Bibliomancy uses what kind of object to seek predictions?|Books.|livingroom|bibliomancy|Definition
lar|What did the Lares protect in ancient Roman religion?|The household.|courtyard|lar|Definition
bigfoot|What is the other common name for Sasquatch?|Bigfoot.|forest|bigfoot|Definition 1
abra|Abracadabra is traditionally a magical charm or what kind of spoken formula?|An incantation.|study|abracadabra|Definition 1
fairyring|Which fungi can grow in the circular formations called fairy rings?|Mushrooms.|forest|fairy%20ring|Definition 1
`;
const literature=`
blackwood|Who wrote the supernatural tale The Willows?|Algernon Blackwood.|river|willows|Title and author
danube|Which river carries the travelers in The Willows?|The Danube.|river|willows|Part I opening
canoe|What kind of boat do the travelers use in The Willows?|A canoe.|river|willows|Part I: Canadian canoe
chambers|Who wrote the story collection The King in Yellow?|Robert W. Chambers.|theatre|yellow|Title and author
carcosa|Which mysterious place is named in Cassilda's Song in The King in Yellow?|Carcosa.|ruins|yellow|Opening epigraph
twinsuns|How many suns sink behind the lake in Cassilda's Song?|Two.|lake|yellow|Opening epigraph: twin suns
hodgson|Who wrote The House on the Borderland?|William Hope Hodgson.|manor|border|Title and author
pepper|What is the recluse's dog called in The House on the Borderland?|Pepper.|manor|border|Chapters II and V
mary|What is the recluse's sister called in The House on the Borderland?|Mary.|livingroom|border|Chapters VII and X
ireland|The manuscript in The House on the Borderland is found in which country?|Ireland.|moor|border|Subtitle and Chapter I
polidori|Who wrote the early vampire tale The Vampyre?|John William Polidori.|study|vampyre|Title and author
ruthven|What is the aristocratic vampire's name in Polidori's The Vampyre?|Lord Ruthven.|ballroom|vampyre|Opening narrative and travel arrangement
aubrey|Which young gentleman travels with Lord Ruthven in The Vampyre?|Aubrey.|road|vampyre|Opening narrative
austen|Who wrote the Gothic satire Northanger Abbey?|Jane Austen.|study|northanger|Title and author
morland|Who is the Gothic-novel-loving heroine of Northanger Abbey?|Catherine Morland.|gallery|northanger|Chapter 1 opening
bath|Which spa city does Catherine visit early in Northanger Abbey?|Bath.|courtyard|northanger|Chapter 2 opening
coleridge|Who wrote The Rime of the Ancient Mariner?|Samuel Taylor Coleridge.|ocean|mariner|Title and author
albatross|Which bird does the Ancient Mariner shoot?|An albatross.|ocean|mariner|Part the First
wedding|What celebration is the Ancient Mariner's listener on his way to attend?|A wedding.|coast|mariner|Part the First: Wedding-Guest
rossetti|Who wrote the poem Goblin Market?|Christina Rossetti.|orchard|goblin|Title and Goblin Market section
sisters|What are the two sisters' names in Goblin Market?|Laura and Lizzie.|cottage|goblin|Goblin Market opening
fruit|What tempting goods do the merchants sell in Goblin Market?|Fruit.|road|goblin|Goblin Market opening
salem|Which village does Young Goodman Brown leave at sunset?|Salem.|village|brown|Young Goodman Brown opening
faith|What is Goodman Brown's wife called?|Faith.|cottage|brown|Young Goodman Brown opening
ribbons|What color are Faith's cap ribbons in Young Goodman Brown?|Pink.|cottage|brown|Young Goodman Brown opening
`;
const history=`
bhutan|The sacred Drametse mask dance comes from which Himalayan country?|Bhutan.|monastery|drametse|Description and place
padmasambhava|Which Buddhist guru is honored by the Drametse mask dance?|Padmasambhava.|monastery|drametse|Description
twice|How often each year is the Drametse festival held?|Twice.|monastery|drametse|Description
organizer|A monastery or a royal palace organizes the Drametse mask-dance festival?|A monastery.|mountain|drametse|Description: Ogyen Tegchok Namdroel Choeling Monastery
zambia|The Makishi masquerade described by UNESCO is practiced in which country?|Zambia.|village|makishi|Description
mukanda|Which initiation ritual concludes with the Makishi masquerade?|Mukanda.|courtyard|makishi|Description
makishiend|Does the Makishi masquerade mark the beginning or the end of mukanda?|The end.|courtyard|makishi|Description
chewa|Which people practice the Gule Wamkulu ritual dance?|The Chewa.|village|gule|Description
nyau|Which brotherhood performs Gule Wamkulu?|Nyau.|courtyard|gule|Description
yoruba|In which language are the songs of Gelede performed?|Yoruba.|courtyard|gelede|Description, second paragraph
iyanla|Which primordial mother is honored by Gelede ceremonies?|Iya Nla.|courtyard|gelede|Description, first paragraph
geledeharvest|The annual Gelede ceremony follows which farming milestone?|The harvest.|village|gelede|Description, second paragraph
venezuela|Which country celebrates Corpus Christi with the Dancing Devils?|Venezuela.|courtyard|devils|Description
maracas|What rattling instruments do Dancing Devils worshippers carry to ward off evil?|Maracas.|courtyard|devils|Description, first paragraph
backwards|In which direction do the Corpus Christi Dancing Devils dance in penitence?|Backwards.|courtyard|devils|Description, first paragraph
good|The Dancing Devils' surrender symbolizes the victory of good over what?|Evil.|chapel|devils|Description, second paragraph
slovenia|The door-to-door rounds of Kurenti belong to which country?|Slovenia.|winterstreet|kurenti|Place and description
kurentibells|What ringing objects accompany Kurenti as they visit houses?|Bells.|winterstreet|kurenti|Description
ashwednesday|Kurenti rounds run from Candlemas until which Wednesday?|Ash Wednesday.|winterstreet|kurenti|Description
hungary|The frightening masked Buso carnival at Mohacs takes place in which country?|Hungary.|winterstreet|buso|Description
coffinwinter|What season does the coffin burned at Mohacs's Buso carnival symbolize?|Winter.|courtyard|buso|Description, second sentence
busodanube|On which river do busos arrive in rowboats at Mohacs?|The Danube.|river|buso|Description, second sentence
unicefyear|In what year did Trick-or-Treat for UNICEF begin collecting coins?|1950.|suburb|unicef|History section
cartons|What emptied drink containers held the first Trick-or-Treat for UNICEF coins?|Milk cartons.|suburb|unicef|Opening paragraph
orangebox|What color is the classic Trick-or-Treat for UNICEF collection box?|Orange.|suburb|unicef|Opening paragraph
`;
export const batch04=[[cinema,'Horror cinema'],[folklore,'Folklore'],[literature,'Gothic literature'],[history,'Seasonal traditions']].flatMap(([text,category])=>text.trim().split('\n').map(row=>{
 const [suffix,question,answer,scene,key,locator]=row.split('|'),id=`b04-${suffix}`;
 const [name,url]=sources[key]||[`Merriam-Webster - ${decodeURIComponent(key)}`,`https://www.merriam-webster.com/dictionary/${key}`];
 return {id,category,question,answer,scene,explanation:'',place:category,difficulty:/Who|called|name/.test(question)?'medium':'approachable',questionImage:`drafts/phase-two/assets/${id}-q.svg`,answerImage:`drafts/phase-two/assets/${id}-a.svg`,questionAlt:`Original atmospheric ${scene} setting, withholding identifying answer objects and text.`,answerAlt:`Original atmospheric ${scene} illustration accompanying the reveal: ${answer}`,questionCaption:'A scene from the cabinet',answerCaption:'Another mystery illuminated',source:{name,url,locator,note:`Reference: ${locator}.`,verifiedOn:'2026-10-24'},editorial:{claimVerified:true,directorIdentity:false,reviewedOn:'2026-10-24',status:'verified; pending integrated release'}};
}));
