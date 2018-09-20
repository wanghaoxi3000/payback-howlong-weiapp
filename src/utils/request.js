const Fly = require("flyio/dist/npm/wx")

const fly = new Fly
fly.config.timeout = 30 * 1000;
fly.config.baseURL = process.env.BASE_URL

export default fly
