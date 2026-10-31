import Redis from "ioredis";


export class redisCacheProvider {
    cli;
    constructor(config) {
        this.cli = new Redis({
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxLoadingRetryTime: 3
        });
        this.cli.on('error', (err) => console.log("failed to connect redis", err.message))
        this.cli.connect().catch(err => console.log("failed to connect redis", err.message));
    }
    async set(key, value, ttl) {
        return this.cli.set(key, value, 'EX', ttl)
    }
    async get(key) {
        return this.cli.get(key)
    }
    async del(key) {
        return this.cli.del(key)
    }
    async ttl(key) {
        return this.cli.ttl(key)
    }
}