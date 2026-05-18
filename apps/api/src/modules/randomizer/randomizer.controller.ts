import { RandomNextRequestSchema } from '@food/contracts';
import { Body, Controller, Post } from '@nestjs/common';
import { RandomizerService } from './randomizer.service';

@Controller('random')
export class RandomizerController {
  constructor(private readonly randomizerService: RandomizerService) {}

  @Post('next')
  async next(@Body() body: unknown) {
    const parsed = RandomNextRequestSchema.parse(body);

    return this.randomizerService.getNextForUser({
      userId: parsed.userId,
      cooldownClicks: parsed.cooldownClicks,
    });
  }
}
