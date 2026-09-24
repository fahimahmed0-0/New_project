// Simple reactive state store using Proxies
const listeners = new Set();

const initialState = {
  user: null,
  currentRoute: '/',
  isMenuOpen: false,
  workoutActive: false,
};

export const state = new Proxy(initialState, {
  set(target, property, value) {
    target[property] = value;
    listeners.forEach(listener => listener(property, value));
    return true;
  }
});

export const subscribe = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};
