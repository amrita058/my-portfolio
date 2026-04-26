export default class Loop {
  callback: () => void;
  rafId: number | null = null;

  constructor(callback: () => void) {
    this.callback = callback;
  }

  start() {
    const tick = () => {
      this.callback();
      this.rafId = requestAnimationFrame(tick);
    };
    tick();
  }

  stop() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}
