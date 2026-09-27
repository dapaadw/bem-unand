import { prisma } from './prisma';
import { PUBLICATION_CATEGORIES, publicationCategory, publicationPage } from './publication';

export async function loadPublications(params = {}) {
  const q = typeof params.q === 'string' ? params.q.trim() : '';
  const category = publicationCategory(params.category);
  const stored = await prisma.publikasi.findMany({ distinct: ['category'], select: { category: true } });
  const categories = [...new Set([...PUBLICATION_CATEGORIES, ...stored.map((item) => publicationCategory(item.category))])];
  if (category && !categories.includes(category)) categories.push(category);
  const matching = stored.filter((item) => publicationCategory(item.category) === category).map((item) => item.category);
  const where = {
    ...(q ? { title: { contains: q } } : {}),
    ...(category ? { category: { in: matching.length ? matching : [category] } } : {}),
  };
  const total = await prisma.publikasi.count({ where });
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const page = Math.min(publicationPage(params.page), totalPages);
  const items = await prisma.publikasi.findMany({ where, orderBy: [{ publishedAt: 'desc' }, { id: 'desc' }], skip: (page - 1) * pageSize, take: pageSize });
  return { items, total, page, pageSize, totalPages, categories, q, category };
}
