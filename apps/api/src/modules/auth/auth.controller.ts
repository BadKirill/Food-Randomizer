import { Body, Controller, Post } from '@nestjs/common';
import { z } from 'zod';
import { AuthService } from './auth.service';

const LoginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const RegisterBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: unknown) {
    const parsed = RegisterBodySchema.parse(body);
    return this.authService.register(parsed);
  }

  @Post('login')
  async login(@Body() body: unknown) {
    const parsed = LoginBodySchema.parse(body);
    return this.authService.login(parsed);
  }
}
