import { Transform } from 'class-transformer';
import { IsInt, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @MinLength(2)
  @MaxLength(12)
  @Matches(/^[a-zA-Z0-9가-힣_]+$/, {
    message: 'nickname allows Korean, English, numbers, and underscore only',
  })
  nickname: string;

  @IsInt()
  factionId: number;
}
