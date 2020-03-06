class EventBus {
  constructor() {
    this.handlers = new Map()
  }

  register(type, handler) {
    let handlers = this.handlers.get(type)
    if (!handlers) {
      handlers = []
      this.handlers.set(type, handlers)
    }
    handlers.push(handler)
  }

  fire(event) {
    // TODO: Prevent infinite fire() ?
    const handlers = this.handlers.get(event)
    if (handlers) {
      for (let handler of handlers) {
        handler(event)
      }
    }
  }
}

// Initializion is here so that it occurs
// before the init() in each module that
// requires initialization.
export const eventBus = new EventBus()
