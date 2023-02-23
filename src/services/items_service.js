import client from './microcms';

export async function getAllItemIds() {
  const slugs = await client.get({
    endpoint: 'items',
    queries: { fields: 'id'/*, limit: 99999*/ } // 到底到達しなさそうな値を設定
  });
  return slugs.contents;
}

export async function getItemData(itemId, queries = {}) {
  if ('depth' in queries) {
    queries.depth = 3; // デフォルト値で設定
  }
  const res = await client.get({
    endpoint: 'items',
    contentId: itemId,
    queries: queries
  });

  return {
    id: res.id,
    image: { src: res.image_url, alt: res.name },
    name: res.name,
    jancode: res.jancode,
    asin: res.asin,
    brand: res.brand,
    maker: res.maker,
    price: res.price
  };
}

export async function getAllItemsData() {
  const res = await client.get({
    endpoint: 'items',
    queries: { /*, limit: 99999*/ } // 到底到達しなさそうな値を設定
  });

  return res.contents;
}

