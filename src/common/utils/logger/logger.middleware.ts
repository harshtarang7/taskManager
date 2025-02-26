import { Injectable, NestMiddleware } from "@nestjs/common";
import { LoggerService } from "./logger.service";

@Injectable()
export class LoggerMiddlerware implements NestMiddleware{
    constructor(private readonly loggerService:LoggerService){}

    use(req: any, res: any, next: (error?: Error | any) => void) {
        const start = Date.now();

        res.on('finish',()=>{
            const responseTime = Date.now() - start;
            res.responseTIme = responseTime
            
            this.loggerService.logHttpRequest(req,res);
        });
        next();
    }
}