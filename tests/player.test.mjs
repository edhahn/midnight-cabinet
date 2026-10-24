import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Player } from '../player.js';
import { trivia } from '../content.js';
test('exactly 500 cards and 1000 alternating screens loop at 18/10 defaults', () => {
  assert.equal(trivia.length,500); const p=new Player(trivia.length*2); let now=0;
  for(let i=0;i<2000;i++){assert.equal(p.index,i%1000);now+=i%2?10000:18000;p.tick(now);}
  assert.equal(p.index,0); assert.equal(p.elapsed,0);
});
test('pause freezes time and resume preserves remaining time',()=>{
  const p=new Player();p.tick(4000);p.toggle(4000);p.tick(50000);assert.equal(p.elapsed,4000);
  p.toggle(50000);p.tick(63999);assert.equal(p.index,0);p.tick(64000);assert.equal(p.index,1);
});
test('timing changes reset countdown, preserve paused state and reject invalid inputs',()=>{
  const p=new Player();p.tick(17000);assert.equal(p.setTiming(5,7,17000),true);
  p.tick(21999);assert.equal(p.index,0);p.tick(22000);assert.equal(p.index,1);
  p.toggle(22000);p.setTiming(8,9,23000);p.tick(90000);assert.equal(p.elapsed,0);assert.equal(p.playing,false);
  for(const n of [NaN,Infinity,0,121])assert.equal(p.setTiming(n,10,0),false);
});
test('manual navigation wraps and starts a full countdown without resuming pause',()=>{
  const p=new Player();p.toggle(1000);p.go(-1,1000);assert.equal(p.index,5);assert.equal(p.elapsed,0);assert.equal(p.playing,false);p.go(6,1000);assert.equal(p.index,0);
});
test('large elapsed time stays bounded and preserves correct phase',()=>{
  const p=new Player();p.tick(84000*100000+19000);assert.equal(p.index,1);assert.equal(p.elapsed,1000);
});
