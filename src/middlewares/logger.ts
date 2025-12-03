import winston from "winston";
import morgan from "morgan";
const httpOnly = winston.format((info) => {
    if (info.level === "http") {
        return info;
    }
    return false;
})();

class Logger {
    private logger;
    constructor() {

        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'event-service' },
            transports: [
                new winston.transports.File({ filename: 'monitor-logs/error.log', level: 'error' }),
                new winston.transports.File({ filename: 'monitor-logs/combined.log' }),
                new winston.transports.File({ filename: 'monitor-logs/access.log', level: 'http', format: httpOnly }),
            ],
        });
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.simple(),
            }));
        }

    }

    info(message: string, meta?: any) {
        this.logger.info(message, meta);
    }

    error(message: string, meta?: any) {
        this.logger.error(message, meta);
    }

    http(message: string, meta?: any) {
        this.logger.http(message, meta);
    }
}

export const logger = new Logger();

export const requestLogger = morgan("tiny", {
    stream: {
        write: (message: any) => logger.http(message.trim()),
    },
});
