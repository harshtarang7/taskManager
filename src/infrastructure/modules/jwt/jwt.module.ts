import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AuthService } from "./jwt.service";

@Module({
    imports:[
        ConfigModule,
        PassportModule.register({defaultStrategy:'jwt'}),
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:(configService:ConfigService)=>({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '1d',
                  },
            })
        })
    ],
    providers:[AuthService,JwtStrategy],
    exports: [JwtStrategy, PassportModule, AuthService,JwtModule],
})

export class jwtModule {}