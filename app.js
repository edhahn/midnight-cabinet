import { trivia } from './content.js';
import { Player } from './player.js';
const $ = id => document.getElementById(id);
const questionContext = document.createElement('p');
questionContext.id = 'question-context';
questionContext.className = 'question-context';
questionContext.hidden = true;
$('title').before(questionContext);
const player = new Player(trivia.length * 2, performance.now());
try { const saved = JSON.parse(localStorage.getItem('midnight-timing')); if (saved) player.setTiming(saved[0], saved[1], performance.now()); } catch {}
let suspended = false;
let resumeAfterDialog = false;
let noticeTimer;
const dialogs = [$('settings-dialog'), $('info-dialog')];
function notify(message) { $('notice').textContent = message; clearTimeout(noticeTimer); noticeTimer = setTimeout(() => $('notice').textContent = '', 4000); }
// Six nearby-screen controls stay bounded as the collection grows.
for (let i=0;i<6;i++) {
  const button=document.createElement('button');button.className='step';
  button.addEventListener('click',()=>go(Number(button.dataset.index)));$('steps').append(button);
}
const prefetch = new Image();
let sourcePage=0;
const pageSize=12;
function renderSources() {
  const term=$('source-search').value.trim().toLowerCase();
  const matches=trivia.map((card,index)=>({card,index})).filter(({card,index})=>`${index+1} ${card.question} ${card.category}`.toLowerCase().includes(term));
  const pages=Math.max(1,Math.ceil(matches.length/pageSize));sourcePage=Math.max(0,Math.min(sourcePage,pages-1));
  $('sources').replaceChildren();
  for(const {card,index} of matches.slice(sourcePage*pageSize,(sourcePage+1)*pageSize)){
    const details=document.createElement('details'),summary=document.createElement('summary');
    summary.textContent=`${String(index+1).padStart(2,'0')} / ${card.category}`;
    const p=document.createElement('p');p.textContent=card.question+' '+card.source.note;
    const a=document.createElement('a');a.textContent=card.source.name+' ↗';a.href=card.source.url;a.target='_blank';a.rel='noopener noreferrer';
    details.append(summary,p,a);$('sources').append(details);
  }
  $('source-page').textContent=`${matches.length} references · Page ${sourcePage+1} of ${pages}`;
  $('source-previous').disabled=sourcePage===0;$('source-next').disabled=sourcePage===pages-1;
}
$('source-search').addEventListener('input',()=>{sourcePage=0;renderSources();});
$('source-previous').addEventListener('click',()=>{sourcePage--;renderSources();});
$('source-next').addEventListener('click',()=>{sourcePage++;renderSources();});
$('jump-tale').max=trivia.length;
$('jump-form').addEventListener('submit',event=>{event.preventDefault();const n=Number($('jump-tale').value);if(Number.isInteger(n)&&n>=1&&n<=trivia.length){go((n-1)*2);$('info-dialog').close();}});
function render() {
  const card = trivia[Math.floor(player.index / 2)]; const answer = player.index % 2 === 1; const phase = answer ? 'answer' : 'question';
  $('stage').dataset.answer = String(answer); $('category').textContent = card.category.toUpperCase(); $('number').textContent = `${String(Math.floor(player.index / 2) + 1).padStart(2,'0')} / ${trivia.length}`;
  $('stage').dataset.card=card.id;
  $('stage').classList.toggle('long-answer',card.answer.length>20);
  $('stage').classList.toggle('long-question',card.question.length>85);
  $('phase').textContent = answer ? 'THE REVEAL' : 'THE QUESTION'; $('title').textContent = card[phase]; $('explanation').textContent = answer ? card.explanation : '';
  questionContext.textContent = answer ? card.question : '';
  questionContext.hidden = !answer;
  $('art').hidden = false; $('art').src = card[`${phase}Image`]; $('art').alt = card[`${phase}Alt`]; $('caption').textContent = card[`${phase}Caption`];
  $('cue').textContent = answer ? card.place : 'Let the thought linger.';
  const start=Math.floor(player.index/6)*6;
  [...$('steps').children].forEach((button,i) => { const index=start+i;button.hidden=index>=player.count;button.dataset.index=index;button.dataset.answer=String(index%2===1);button.setAttribute('aria-label',`${index%2?'Answer':'Question'} ${Math.floor(index/2)+1}`);if (index === player.index) button.setAttribute('aria-current','step'); else button.removeAttribute('aria-current'); });
  const next=(player.index+1)%player.count;prefetch.src=trivia[Math.floor(next/2)][next%2?'answerImage':'questionImage'];
  $('stage').classList.remove('enter'); void $('stage').offsetWidth; $('stage').classList.add('enter');
  updateControls(); updateProgress();
}
$('art').addEventListener('error', () => { $('art').hidden = true; });
function updateControls() { $('play-label').textContent = player.playing ? 'Pause' : 'Play'; $('play-icon').textContent = player.playing ? 'Ⅱ' : '▷'; $('play').setAttribute('aria-label', player.playing ? 'Pause slideshow (Space)' : 'Play slideshow (Space)'); }
function updateProgress() {
  const ratio = player.elapsed / player.duration;
  $('progress-fill').style.transform = `scaleX(${ratio})`;
  document.querySelector('.progress').setAttribute('aria-valuenow', Math.floor(ratio * 100));
  $('remaining').textContent = Math.ceil((player.duration - player.elapsed) / 1000);
  $('status').textContent = !player.playing ? 'THE NIGHT IS PAUSED' : player.index % 2 ? 'NEXT TALE IN' : 'ANSWER REVEALS IN';
}
function go(index) { player.go(index, performance.now()); render(); }
function toggle() { const index = player.index; player.toggle(performance.now()); if (index !== player.index) render(); updateControls(); updateProgress(); }
$('previous').addEventListener('click', () => go(player.index - 1)); $('next').addEventListener('click', () => go(player.index + 1)); $('play').addEventListener('click', toggle);
function openDialog(dialog) {
  resumeAfterDialog = player.playing;
  if (player.playing) toggle();
  $('question-time').value = player.durations[0] / 1000; $('answer-time').value = player.durations[1] / 1000;
  if(dialog.id==='info-dialog'){$('jump-tale').value=Math.floor(player.index/2)+1;$('source-search').value='';sourcePage=Math.floor(player.index/2/pageSize);renderSources();}
  dialog.showModal();
}
$('timing').addEventListener('click', () => openDialog($('settings-dialog'))); $('info').addEventListener('click', () => openDialog($('info-dialog')));
dialogs.forEach(dialog => { dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close()); dialog.addEventListener('close', () => { if (resumeAfterDialog) toggle(); resumeAfterDialog = false; }); });
$('settings-form').addEventListener('submit', event => {
  event.preventDefault();
  const q = Number($('question-time').value), a = Number($('answer-time').value);
  if (!player.setTiming(q, a, performance.now())) return;
  try { localStorage.setItem('midnight-timing', JSON.stringify([q,a])); } catch {}
  $('settings-dialog').close(); updateProgress(); notify('Timing updated. A fresh countdown begins.');
});
async function fullscreen() {
  try { if (document.fullscreenElement) await document.exitFullscreen(); else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen(); else notify('Fullscreen is unavailable in this browser. Use your browser’s fullscreen option.'); }
  catch { notify('Fullscreen could not start. Use your browser’s fullscreen option.'); }
}
$('fullscreen').addEventListener('click', fullscreen);
document.addEventListener('fullscreenchange', () => $('fullscreen').setAttribute('aria-label', document.fullscreenElement ? 'Exit fullscreen (F)' : 'Enter fullscreen (F)'));
document.addEventListener('keydown', event => {
  if (event.ctrlKey || event.altKey || event.metaKey || dialogs.some(d => d.open) || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
  if (event.code === 'Space' && /BUTTON|A/.test(event.target.tagName)) return;
  const key = event.key.toLowerCase();
  if ([' ', 'k', 'arrowleft', 'arrowright', 'f', 't', 'i'].includes(key)) event.preventDefault();
  if (event.repeat) return;
  if (key === ' ' || key === 'k') toggle();
  if (key === 'arrowleft') go(player.index - 1); if (key === 'arrowright') go(player.index + 1);
  if (key === 'f') fullscreen(); if (key === 't') openDialog($('settings-dialog')); if (key === 'i') openDialog($('info-dialog'));
});
document.addEventListener('visibilitychange', () => { suspended = document.hidden; player.last = performance.now(); });
function frame(now) { if (!suspended) { if (player.tick(now)) render(); updateProgress(); } requestAnimationFrame(frame); }
render(); requestAnimationFrame(frame);
