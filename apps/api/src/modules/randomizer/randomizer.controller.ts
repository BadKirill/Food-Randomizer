import { RandomNextRequestSchema } from '@food/contracts';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/auth.guard';
import { CurrentUser, type AuthUser } from '../../common/current-user.decorator';
import { RandomizerService } from './randomizer.service';

@Controller('random')
export class RandomizerController {
  constructor(private readonly randomizerService: RandomizerService) {}

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
