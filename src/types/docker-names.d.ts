declare module 'docker-names' {
  function getRandomName(retryCount?: number): string;
  const adjectives: string[];
  const surnames: string[];
  export { adjectives, getRandomName, surnames };
}
