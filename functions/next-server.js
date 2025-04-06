const path = require('path');

module.exports = {
  nextServerConfig: {
    dev: false,
    conf: {
      distDir: path.relative(process.cwd(), path.join(__dirname, '../.next')),
      env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        OPENAI_API_MODEL: process.env.OPENAI_API_MODEL,
        OPENAI_ORGANIZATION_ID: process.env.OPENAI_ORGANIZATION_ID,
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
        ANTHROPIC_MODEL: process.env.ANTHROPIC_MODEL,
        REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
        REPLICATE_MODEL: process.env.REPLICATE_MODEL,
        DEEPGRAM_API_KEY: process.env.DEEPGRAM_API_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
        PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY
      }
    },
  }
}; 