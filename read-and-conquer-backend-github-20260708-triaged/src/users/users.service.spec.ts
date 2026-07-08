import { UsersService } from './users.service';
import { BusinessCode } from '../common/exceptions/business-code';

describe('UsersService', () => {
  it('returns my profile from persisted user data, not sample hardcoded values', async () => {
    const prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          userId: 15,
          email: 'runtime@example.com',
          name: 'Runtime Name',
          nickname: 'RuntimeUser',
          exp: 987,
          onboardingCompleted: true,
          faction: {
            factionId: 4,
            factionName: 'SilverFaction',
            factionColor: '#C0C0C0',
          },
          sessions: [],
          ranking: {
            rankPosition: 12,
            totalBooks: 3,
            totalSessions: 5,
          },
        }),
      },
    };
    const service = new UsersService(prisma as any);

    await expect(service.getMe(15)).resolves.toEqual({
      userId: 15,
      email: 'runtime@example.com',
      name: 'Runtime Name',
      nickname: 'RuntimeUser',
      exp: 987,
      onboardingCompleted: true,
      faction: {
        factionId: 4,
        name: 'SilverFaction',
        color: '#C0C0C0',
      },
      ranking: {
        rankPosition: 12,
        totalBooks: 3,
        totalSessions: 5,
      },
    });
  });

  it('trims nickname before checking availability', async () => {
    const prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };
    const service = new UsersService(prisma as any);

    await expect(service.checkNickname(' JungTem ')).resolves.toEqual({
      nickname: 'JungTem',
      available: true,
    });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { nickname: 'JungTem' },
    });
  });

  it('rejects invalid nickname format', async () => {
    const service = new UsersService({} as any);

    await expect(service.checkNickname('bad!')).rejects.toMatchObject({
      code: BusinessCode.INVALID_NICKNAME,
    });
  });
});
