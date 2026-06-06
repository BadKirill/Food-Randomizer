import { RandomNextRequestSchema } from '@food/contracts';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { AuthGuard } from '../../common/auth.guard';
import { CurrentUser, type AuthUser } from '../../common/current-user.decorator';
import { RandomizerService } from './randomizer.service';

const PublicRandomQuerySchema = z.object({
  cooldownClicks: z.coerce.number().int().min(1).max(10).default(4),
  dishType: z.enum(['usual', 'vegetarian', 'vegan']).optional(),
});

@Controller('random')
export class RandomizerController {
  constructor(private readonly randomizerService: RandomizerService) {}

  @Get()
  async random(@Query() query: unknown) {
    const parsed = PublicRandomQuerySchema.parse(query);

    return this.randomizerService.getRandom({
      cooldownClicks: parsed.cooldownClicks,
      dishType: parsed.dishType,
    });
  }

  @Post('next')
  @UseGuards(AuthGuard)
  async next(@CurrentUser() user: AuthUser, @Body() body: unknown) {
    const parsed = RandomNextRequestSchema.parse(body);

    return this.randomizerService.getNextForUser({
      userId: user.id,
      cooldownClicks: parsed.cooldownClicks,
      dishType: parsed.dishType,
    });
  }
}
