import { writable } from 'svelte/store';

export const selectedScanningRows = writable([]);
export const allScanningRowsSelected = writable(false);
