// One monotonic clock; the UI owns exactly one animation-frame loop.
export class Player {
  constructor(count = 6, now = 0) { this.count = count; this.index = 0; this.durations = [18000, 10000]; this.elapsed = 0; this.last = now; this.playing = true; }
  get duration() { return this.durations[this.index % 2]; }
  tick(now) {
    const delta = Math.max(0, now - this.last); this.last = now;
    if (!this.playing) return false;
    this.elapsed += delta;
    let changed = false;
    // Discard complete cycles to keep a resumed background tab bounded.
    const cycle = (this.durations[0] + this.durations[1]) * (this.count / 2);
    if (this.elapsed >= cycle) this.elapsed %= cycle;
    while (this.elapsed >= this.duration) { this.elapsed -= this.duration; this.index = (this.index + 1) % this.count; changed = true; }
    return changed;
  }
  toggle(now) { this.tick(now); this.playing = !this.playing; this.last = now; }
  go(index, now) { this.index = (index + this.count) % this.count; this.elapsed = 0; this.last = now; }
  setTiming(question, answer, now) {
    const values = [question, answer];
    if (values.some(v => !Number.isFinite(v) || v < 5 || v > 120)) return false;
    this.durations = values.map(v => Math.round(v) * 1000); this.elapsed = 0; this.last = now; return true;
  }
}
