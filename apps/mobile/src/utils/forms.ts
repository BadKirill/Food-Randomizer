export function parseLines(input: string) {
  return input
    .split('\n')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}
