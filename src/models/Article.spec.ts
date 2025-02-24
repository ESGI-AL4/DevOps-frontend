import { describe, expect, it } from 'vitest';
import Article from '@/models/Article';

describe('Article model', () => {
  it('should create an Article', () => {
    const article = new Article({
      id: 1,
      title: 'Title',
      subtitle: 'Subtitle',
      summary: 'Summary',
    });

    expect(article.id).toStrictEqual(1);
    expect(article.title).toStrictEqual('Title');
    expect(article.subtitle).toStrictEqual('Subtitle');
    expect(article.summary).toStrictEqual('Summary');
  });
});
