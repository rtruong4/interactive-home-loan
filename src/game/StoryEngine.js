// Small helper utilities for composing scenes

export function makeChoice(text, next) {
  return { text, next };
}

export function makeScene({ id, title, body, choices = [] }) {
  return { id, title, body, choices };
}
