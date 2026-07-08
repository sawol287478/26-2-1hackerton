import { BooksService } from './books.service';
import { BusinessCode } from '../common/exceptions/business-code';

describe('BooksService', () => {
  it('passes recommendation keyword to Library Info API instead of forcing a fixed keyword', async () => {
    const libraryInfo = {
      recommendBooks: jest.fn().mockResolvedValue([
        { isbn: 'dynamic-isbn', title: 'Dynamic Recommendation' },
      ]),
    };
    const service = new BooksService({} as any, libraryInfo as any);

    await expect(service.recommend('철학', 2, 10)).resolves.toEqual([
      { isbn: 'dynamic-isbn', title: 'Dynamic Recommendation' },
    ]);
    expect(libraryInfo.recommendBooks).toHaveBeenCalledWith('철학', 2, 10);
  });

  it('rejects malformed ISBN before calling external APIs', async () => {
    const prisma = {
      book: { findUnique: jest.fn() },
    };
    const libraryInfo = {
      findBookByIsbn: jest.fn(),
    };
    const service = new BooksService(prisma as any, libraryInfo as any);

    await expect(service.findOrFetchByIsbn('bad-isbn')).rejects.toMatchObject({
      code: BusinessCode.INVALID_ISBN,
    });
    expect(prisma.book.findUnique).not.toHaveBeenCalled();
    expect(libraryInfo.findBookByIsbn).not.toHaveBeenCalled();
  });
});
