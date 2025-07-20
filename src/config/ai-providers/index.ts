export const AI_PROVIDERS: Record<string, { baseUrl: string }> = {
  openai: {
    baseUrl: "https://api.openai.com/v1",
  },
  gemini: {
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
  },
  claude: {
    baseUrl: "https://api.anthropic.com/v1",
  },
};
