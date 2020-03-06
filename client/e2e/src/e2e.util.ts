// from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export function randomText(length: number): string {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export function randomBoolean(): boolean {
  return Boolean(Math.round(Math.random()));
}

// From https://stackoverflow.com/a/39914235
// Thanks!
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
