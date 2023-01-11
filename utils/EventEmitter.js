let instance = null;
export class EventEmitter {
  constructor() {
    this.events = {};
    if (instance && typeof instance === EventEmitter) {
      debugger;
      return instance;
    }
  }
  on(event, listener) {
    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener);
  }
  off(event, listener) {
    if (typeof this.events[event] === "object") {
      const idx = this.events[event].indexOf(listener);
      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }
  trigger(event, ...args) {
    if (typeof this.events[event] === "object") {
      this.events[event].forEach((listener) => listener.apply(this, args));
    }
  }
}
