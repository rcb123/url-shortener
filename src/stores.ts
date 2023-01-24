import { writable, type Writable } from 'svelte/store';

export const loading: Writable<boolean> = writable(false);

export const generatedURL: Writable<string | null> = writable(null);