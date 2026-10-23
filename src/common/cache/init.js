import { redisCacheProvider } from "../../pkg/cache/redis.js";
import { env } from "../config/env.js";

export const cacheProvider = new redisCacheProvider({
    host:env.redis.host,
    port:env.redis.port,
    password:env.redis.password
})