export interface Product {
  id: string
  brand: string
  brandSlug: string
  model: string
  category: string
  categorySlug: string
  name: string
  partNumber: string
  price: number
  currency: 'USD'
  status: 'В наличии' | 'Под заказ'
  type: 'Оригинал' | 'Аналог'
  image: string
  description: string
  weight?: string
  material?: string
}

export const products: Product[] = [
  // BYD
  {
    id: 'byd-han-front-bumper',
    brand: 'BYD',
    brandSlug: 'byd',
    model: 'Han',
    category: 'Кузовные детали',
    categorySlug: 'kuzov',
    name: 'Бампер передний BYD Han',
    partNumber: 'BYD-HAN-11101',
    price: 485,
    currency: 'USD',
    status: 'В наличии',
    type: 'Оригинал',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVVE0UazXgKgG-oEDYBhTpRd-CGThGtN_6TAzEydyFg7DVcseLlLLyu2Vh6uBfy3gVmKiDEIl1ENvHy8F05MgJ9kuQ-BWwC06jS0C4S7Sn8BRgSpZhHP0RaiizZv5a6KLUoNgDz0ZvDm2LVx8tPoTW3WUFlnlkAeuUl00q9MifgPhL6Fg5WJAo8sf90oSKd5Rt99XOP6G-jrp30M1rOXtBV9nvPbEj4vpFcrabXEU_B4FZmQFwF4p2x7niHMzBe58-B8pyEEkGHOAT',
    description: 'Оригинальный передний бампер для BYD Han. Прямая замена, полная совместимость OEM.',
    weight: '8.5 кг',
    material: 'ABS-пластик',
  },
  {
    id: 'byd-han-grille',
    brand: 'BYD',
    brandSlug: 'byd',
    model: 'Han',
    category: 'Кузовные детали',
    categorySlug: 'kuzov',
    name: 'Решетка радиатора BYD Han',
    partNumber: 'BYD-HAN-11102',
    price: 220,
    currency: 'USD',
    status: 'В наличии',
    type: 'Оригинал',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIG59RKxr8KI2sHNBb9UqUt_gW1H9EL3x1XtLfvrlqA3eLJ52mTZ-OAasLomRTyO3TLupb2I9p3rvMskiJaIv2EkAvmx5aFg6_yqH7OpPaR7s1oykoOWutUpXs6zu_TvIAnHMmQQUvHKsCaon4nnfKv4DxASgxR6RUG-qBhXOg3AalIvM-8zlSC4xmItvMDFdy2vT--3ZoVfFPYKfqWM_lqVPy9zKzW7s5fQAsMIj2UyeXAqLDrDf762zAebZtFEKgTOrDzWzc3buW',
    description: 'Решетка радиатора BYD Han с хромированными вставками. Оригинальное качество.',
    weight: '3.2 кг',
    material: 'ABS + хром',
  },
  {
    id: 'byd-han-headlight-left',
    brand: 'BYD',
    brandSlug: 'byd',
    model: 'Han',
    category: 'Освещение',
    categorySlug: 'lighting',
    name: 'Фара передняя левая BYD Han',
    partNumber: 'BYD-HAN-21001-L',
    price: 650,
    currency: 'USD',
    status: 'В наличии',
    type: 'Оригинал',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwCJWh0x3VfodNRV9vJKQ8j4xdbgDKYbmCiZTcBRU_3Gex7Dh4jp35muSg4CiQKYKjIfMHSgotF9AHgAD7QWdPagOX2RmILlmDMk9lVV9B5hSyTcd1NPi_hbKRSNU0Si5gkEJu4fbuB5P0tY_zveWS39ob-YGpdNWrTFlhAR7RLgY5eksI-1IHeSk56sfmfnhehtl_82rSrdDMe0Yibn6SOuuKpjQw9eyXZRnXDGiCMckt-7ZjyOYonqe7skiKnbsKJeFS4XCtMavD',
    description: 'Светодиодная фара BYD Han (левая). Полная LED-матрица, адаптивный свет.',
    weight: '4.8 кг',
    material: 'Поликарбонат',
  },
  {
    id: 'byd-han-shock-absorber',
    brand: 'BYD',
    brandSlug: 'byd',
    model: 'Han',
    category: 'Подвеска',
    categorySlug: 'suspension',
    name: 'Амортизатор передний BYD Han',
    partNumber: 'BYD-HAN-49300',
    price: 180,
    currency: 'USD',
    status: 'В наличии',
    type: 'Аналог',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6VsHPbsJkY39WN6EAMXXPjzdUuQpE7LJtHBlCGUxXr7Art934AQVYoMKavb2_wUq47Qa6wa2M3_2tYYjR8eW8WAwLBu9HoeeicwAnrf7uhu6q5ttWjsog8B5R7nFazjvtAjG9qcTKSy96yLnC0trc8dLXY99h6-ktCH7aeV0EGjWco-ymyxpZ_-9mmzjqjQslsfIxHMWWWHbSf-Sak6LmzBDIJlzRBPn8qPCOKft8',
    description: 'Амортизатор передней подвески BYD Han. Аналог высокого качества, масляный тип.',
    weight: '5.2 кг',
    material: 'Сталь',
  },

  // GEELY
  {
    id: 'geely-atlas-front-bumper',
    brand: 'Geely',
    brandSlug: 'geely',
    model: 'Atlas',
    category: 'Кузовные детали',
    categorySlug: 'kuzov',
    name: 'Бампер передний Geely Atlas',
    partNumber: 'GE-AT-2024-FB',
    price: 520,
    currency: 'USD',
    status: 'В наличии',
    type: 'Оригинал',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVVE0UazXgKgG-oEDYBhTpRd-CGThGtN_6TAzEydyFg7DVcseLlLLyu2Vh6uBfy3gVmKiDEIl1ENvHy8F05MgJ9kuQ-BWwC06jS0C4S7Sn8BRgSpZhHP0RaiizZv5a6KLUoNgDz0ZvDm2LVx8tPoTW3WUFlnlkAeuUl00q9MifgPhL6Fg5WJAo8sf90oSKd5Rt99XOP6G-jrp30M1rOXtBV9nvPbEj4vpFcrabXEU_B4FZmQFwF4p2x7niHMzBe58-B8pyEEkGHOAT',
    description: 'Оригинальный передний бампер Geely Atlas 2020-2024. Прямая замена OEM.',
    weight: '9.1 кг',
    material: 'PP-пластик',
  },
  {
    id: 'geely-atlas-grille',
    brand: 'Geely',
    brandSlug: 'geely',
    model: 'Atlas',
    category: 'Кузовные детали',
    categorySlug: 'kuzov',
    name: 'Решетка радиатора Geely Atlas',
    partNumber: 'GE-FG-9921-CH',
    price: 240,
    currency: 'USD',
    status: 'В наличии',
    type: 'Оригинал',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIG59RKxr8KI2sHNBb9UqUt_gW1H9EL3x1XtLfvrlqA3eLJ52mTZ-OAasLomRTyO3TLupb2I9p3rvMskiJaIv2EkAvmx5aFg6_yqH7OpPaR7s1oykoOWutUpXs6zu_TvIAnHMmQQUvHKsCaon4nnfKv4DxASgxR6RUG-qBhXOg3AalIvM-8zlSC4xmItvMDFdy2vT--3ZoVfFPYKfqWM_lqVPy9zKzW7s5fQAsMIj2UyeXAqLDrDf762zAebZtFEKgTOrDzWzc3buW',
    description: 'Решетка радиатора Geely Atlas. Хромированные элементы, оригинальное качество.',
    weight: '2.8 кг',
    material: 'ABS + хром',
  },
  {
    id: 'geely-atlas-brake-pads',
    brand: 'Geely',
    brandSlug: 'geely',
    model: 'Atlas',
    category: 'Тормоза',
    categorySlug: 'brakes',
    name: 'Тормозные колодки Geely Atlas (перед)',
    partNumber: 'GE-AT-3501',
    price: 65,
    currency: 'USD',
    status: 'В наличии',
    type: 'Аналог',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDow7t_wD8jRlh9eJ4xwBg4kYgmNFaHnIgcufwERGXmN2M3M1g47M3Un78DNFlePnRE1p8B-sSofaqn8URdUIYMqtmusUe3808L51oCRd62TSdUb5B7yqDcboptCv288Vf8nFd0rSaoI3n5mUSz8sH7wXiz7dbaMd7OnIm0HKXKlNA_J2uQlf_W_HvmIPMWx2hrFov0w6MMqcoZT_AHLSz3fZUejdlKRht-9hEI9rOfeLj9DiVbyz7idpwWMxa3SuViuE8P5VkF146V',
    description: 'Передние тормозные колодки Geely Atlas. Керамический состав, низкий шум.',
    weight: '1.2 кг',
    material: 'Керамика',
  },
  {
    id: 'geely-coolray-grille',
    brand: 'Geely',
    brandSlug: 'geely',
    model: 'Coolray',
    category: 'Кузовные детали',
    categorySlug: 'kuzov',
    name: 'Решетка радиатора Geely Coolray (чёрная)',
    partNumber: 'GL-CR-2023-FRO1',
    price: 185,
    currency: 'USD',
    status: 'В наличии',
    type: 'Аналог',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIG59RKxr8KI2sHNBb9UqUt_gW1H9EL3x1XtLfvrlqA3eLJ52mTZ-OAasLomRTyO3TLupb2I9p3rvMskiJaIv2EkAvmx5aFg6_yqH7OpPaR7s1oykoOWutUpXs6zu_TvIAnHMmQQUvHKsCaon4nnfKv4DxASgxR6RUG-qBhXOg3AalIvM-8zlSC4xmItvMDFdy2vT--3ZoVfFPYKfqWM_lqVPy9zKzW7s5fQAsMIj2UyeXAqLDrDf762zAebZtFEKgTOrDzWzc3buW',
    description: 'Решетка радиатора Geely Coolray, матовый чёрный цвет. Подходит 2020-2023.',
    weight: '2.4 кг',
    material: 'ABS-пластик',
  },

  // HAVAL
  {
    id: 'haval-h6-front-bumper',
    brand: 'Haval',
    brandSlug: 'haval',
    model: 'H6',
    category: 'Кузовные детали',
    categorySlug: 'kuzov',
    name: 'Бампер передний Haval H6',
    partNumber: 'HAV-H6-11101',
    price: 440,
    currency: 'USD',
    status: 'Под заказ',
    type: 'Оригинал',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz0mJIpM7-d1uJnIXfPa81T2j4Oudpmq0_Jl5t48p1phBMXcnEkTaF3O-QJgqSIpOeli2amd-l1MQIi5UUc5lnRrxQ2YG1ogmLR0uYT51Rdw3RC0AjC-Ll4RBxXw1hdb2aD_vGZBR5S4d22Yh4zeG6P_mUaQMU3UCs6HGNHNhiBPHpdfS4JldQB55_Xdw6XCLNL7aoMBsl4Umjr2rSWfLQ900LbqOsgm8Nk-JVy8M8DewwAzwbNPfgZK7fEzySLv-q-CWUODZDUE1B',
    description: 'Передний бампер Haval H6 2021-2024. Производитель — оригинал Great Wall Motors.',
    weight: '10.3 кг',
    material: 'PP-пластик',
  },
  {
    id: 'haval-h6-headlight-right',
    brand: 'Haval',
    brandSlug: 'haval',
    model: 'H6',
    category: 'Освещение',
    categorySlug: 'lighting',
    name: 'Фара передняя правая Haval H6',
    partNumber: 'HAV-H6-21002-R',
    price: 580,
    currency: 'USD',
    status: 'В наличии',
    type: 'Оригинал',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwCJWh0x3VfodNRV9vJKQ8j4xdbgDKYbmCiZTcBRU_3Gex7Dh4jp35muSg4CiQKYKjIfMHSgotF9AHgAD7QWdPagOX2RmILlmDMk9lVV9B5hSyTcd1NPi_hbKRSNU0Si5gkEJu4fbuB5P0tY_zveWS39ob-YGpdNWrTFlhAR7RLgY5eksI-1IHeSk56sfmfnhehtl_82rSrdDMe0Yibn6SOuuKpjQw9eyXZRnXDGiCMckt-7ZjyOYonqe7skiKnbsKJeFS4XCtMavD',
    description: 'Фара правая Haval H6, LED. Оригинальная деталь, гарантия совместимости.',
    weight: '5.1 кг',
    material: 'Поликарбонат',
  },

  // CHERY
  {
    id: 'chery-tiggo-8-front-bumper',
    brand: 'Chery',
    brandSlug: 'chery',
    model: 'Tiggo 8',
    category: 'Кузовные детали',
    categorySlug: 'kuzov',
    name: 'Бампер передний Chery Tiggo 8',
    partNumber: 'CHR-T8-11101',
    price: 390,
    currency: 'USD',
    status: 'В наличии',
    type: 'Аналог',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVVE0UazXgKgG-oEDYBhTpRd-CGThGtN_6TAzEydyFg7DVcseLlLLyu2Vh6uBfy3gVmKiDEIl1ENvHy8F05MgJ9kuQ-BWwC06jS0C4S7Sn8BRgSpZhHP0RaiizZv5a6KLUoNgDz0ZvDm2LVx8tPoTW3WUFlnlkAeuUl00q9MifgPhL6Fg5WJAo8sf90oSKd5Rt99XOP6G-jrp30M1rOXtBV9nvPbEj4vpFcrabXEU_B4FZmQFwF4p2x7niHMzBe58-B8pyEEkGHOAT',
    description: 'Передний бампер Chery Tiggo 8 Pro 2021-2024. Высококачественный аналог.',
    weight: '9.8 кг',
    material: 'PP-пластик',
  },
  {
    id: 'chery-tiggo-8-engine-filter',
    brand: 'Chery',
    brandSlug: 'chery',
    model: 'Tiggo 8',
    category: 'Двигатель',
    categorySlug: 'engine',
    name: 'Фильтр масляный Chery Tiggo 8',
    partNumber: 'CHR-T8-1012020',
    price: 18,
    currency: 'USD',
    status: 'В наличии',
    type: 'Оригинал',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsf5xoxgNpfw54bvxHH4Vb1RLsicahTaqZKPmzLDAO_HYVGiBxLrL3pF4B-RYocKacX1_9Mr13dOvB5A9kCepH84K-o_YYAa9TkgXU1AL8lrGHuIOSKnQ_G4aWK_tzccJDR78sVfd9aH3iuExNG5ftxKzkoURZI6UorkGFT-m7pAcifNrKLZceLXNpbcdP3_HbnHbzRPwX_xZKu0r3_ZQkip-74Ln72GfGpENmNf1rZoNsj72-YixyLyYhIgww',
    description: 'Оригинальный масляный фильтр Chery Tiggo 8 1.5T / 2.0T.',
    weight: '0.3 кг',
    material: 'Металл + бумага',
  },

  // CHANGAN
  {
    id: 'changan-cs75-front-bumper',
    brand: 'Changan',
    brandSlug: 'changan',
    model: 'CS75 Plus',
    category: 'Кузовные детали',
    categorySlug: 'kuzov',
    name: 'Бампер передний Changan CS75 Plus',
    partNumber: 'CHA-CS75-11101',
    price: 410,
    currency: 'USD',
    status: 'Под заказ',
    type: 'Оригинал',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz0mJIpM7-d1uJnIXfPa81T2j4Oudpmq0_Jl5t48p1phBMXcnEkTaF3O-QJgqSIpOeli2amd-l1MQIi5UUc5lnRrxQ2YG1ogmLR0uYT51Rdw3RC0AjC-Ll4RBxXw1hdb2aD_vGZBR5S4d22Yh4zeG6P_mUaQMU3UCs6HGNHNhiBPHpdfS4JldQB55_Xdw6XCLNL7aoMBsl4Umjr2rSWfLQ900LbqOsgm8Nk-JVy8M8DewwAzwbNPfgZK7fEzySLv-q-CWUODZDUE1B',
    description: 'Передний бампер Changan CS75 Plus 2020-2024.',
    weight: '9.5 кг',
    material: 'PP-пластик',
  },

  // GAC
  {
    id: 'gac-gs8-front-bumper',
    brand: 'GAC',
    brandSlug: 'gac',
    model: 'GS8',
    category: 'Кузовные детали',
    categorySlug: 'kuzov',
    name: 'Бампер передний GAC GS8',
    partNumber: 'GAC-GS8-11101',
    price: 460,
    currency: 'USD',
    status: 'В наличии',
    type: 'Оригинал',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVVE0UazXgKgG-oEDYBhTpRd-CGThGtN_6TAzEydyFg7DVcseLlLLyu2Vh6uBfy3gVmKiDEIl1ENvHy8F05MgJ9kuQ-BWwC06jS0C4S7Sn8BRgSpZhHP0RaiizZv5a6KLUoNgDz0ZvDm2LVx8tPoTW3WUFlnlkAeuUl00q9MifgPhL6Fg5WJAo8sf90oSKd5Rt99XOP6G-jrp30M1rOXtBV9nvPbEj4vpFcrabXEU_B4FZmQFwF4p2x7niHMzBe58-B8pyEEkGHOAT',
    description: 'Оригинальный передний бампер GAC GS8 2021-2024.',
    weight: '10.1 кг',
    material: 'PP-пластик',
  },
]

export const brands = [
  {
    name: 'BYD',
    slug: 'byd',
    count: products.filter((p) => p.brandSlug === 'byd').length,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFHqmm5ytyjr2-q9uwVVNp8cY6nznfb03uwdfaE9fX7x1k5lYlzfQVRrd3X6D68qQBABPdn5xPiE4NDlfiQMmv5-40bOg6Di9k48jaxrwNWYo2uhkMLik7hh1q1a_6Tq62NbcMy1lVxtoFI67TvWxmtlayITbwNnDXH0wIxkjg1b2A5UTtx8rAwSEmEvdMtvyxnyjuQ62aN4AgSf1T2ptoSjgBFVaM4Gnj7AN3BnUSMvxfrgVJMjOLEOXziUt4ndstH--JYzQL9MtM',
  },
  {
    name: 'Geely',
    slug: 'geely',
    count: products.filter((p) => p.brandSlug === 'geely').length,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMwD_0U9_RjvvGSLh8kYjK8BaTbsbvHqsAwKnTgw51ennzpNuzpDtPHeZKq2OBvNI8zlZnSI4mA9wm-dMcPoxQgbk8cGfxcvlzpPcBzKM2CbRB16pSvEZQ13tGOSkfbZeKGAGUvM5l-sYLBS9qETT8ReKXZMUf-CnSieecdGG9h61L9JQaBlCkKWJBT0ZgZVRvKL_St0kjtuj_m63dUXQYrJueD6L06y3x-PyuLAjbMcZ91Jg-exfR8dQjjqQqPq3ohHITVkB4E4BC',
  },
  {
    name: 'Haval',
    slug: 'haval',
    count: products.filter((p) => p.brandSlug === 'haval').length,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAr-47_Hq7y3NUAjgyhDyiSqFjgBn0MQlAUmjQFFw5Vt95WLmG5T24zA24ORjE8K1xI2wYBy3tU0HssMdc_Rxndmw__mCCA0p2TsRSW2-mySn5AyWpxw_HJgYweZCYb-spT10bdcMNSW4EnPrD3wBpNZ0G1Z59rIDgj69cJmPSz15Idil0-I6vutk3EdFJakgHzpU4u_y1hwBwaZ0hd5bziYLtzNG9loNMRWtppgJGuBUz01eYJPSJwBNZF5bs7p0T1CgaudTz1rT7K',
  },
  {
    name: 'Chery',
    slug: 'chery',
    count: products.filter((p) => p.brandSlug === 'chery').length,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbQp00igkvjkSvJOlMhYqsLuJsE7pyQiRC_iTGmGRYNepADVEz7zuNplN6eZ34TVh6Cgu96_99x89Kmahs6rj5DyZzB3RoaJ7ysl3Nx__gn8afAOysbuuQcZeROtneHx2CZjpFv1e7tNUfmLWMhG6JqW1dwDvK62MvV5lB0QO7Xv0hVTeV3oxrhE0KpKUCd9r2ILH86jY31QfCRIV7XA3PeUmrY5HOUm28o2yA2351MkekyHbmQB4gcNxnq5lIKAJsVOYYI-dgDWtf',
  },
  {
    name: 'Changan',
    slug: 'changan',
    count: products.filter((p) => p.brandSlug === 'changan').length,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArXzQykUo4wUZsLgWjd-_cLJzAaK5jnsIzXXnrlyLbRiqFPTnLrjKnx0Led4DOAkyLUYkWOv63AtWCz9p3JL7zlH8RHi-eBKzOdjaZmPOSiWqAq2Zi0AFVttkFA81ft498NPHehGtCyPyLVETZG9UmwK403m3Sqzo4NoOQSM2T78Q0jAYJXIxx6uN21mDcyv4jTx8WHRMa12xgHLpUSYYz4t7J8T_eXz5fabNUDKYsC1_PQ41AN8U-6fBdohZ866qvRWWFjlSrJiEs',
  },
  {
    name: 'GAC',
    slug: 'gac',
    count: products.filter((p) => p.brandSlug === 'gac').length,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOCl0cLLXzoUXtpj0h1hMEsQDR3r6FlPFIZGRILIF7XTr8oFJiFo_6F_Gigm881-81m930KgbVB5hNG2IPbzRpwkMjMraU1hPTpchNXrYaryNZiaN1286HUj4S5oHqZGa4AjNSU-9YJb3dK2V9xXLr_cgpqVu2C1nC90lP1pVmS2gqldCWSPecXA5Aoz4KfFo6N2BUnyAdH8C7kUQBeOw7_TzlIH8ctmlxO_Tdo6x6pvPoNHLG64J0FOHM1SpWwt9AyC5re0r0TN5u',
  },
]

export const categories = [
  { name: 'Кузовные детали', slug: 'kuzov', icon: 'directions_car', description: 'Двери, бамперы, зеркала, капот' },
  { name: 'Двигатель', slug: 'engine', icon: 'settings_suggest', description: 'Фильтры, прокладки, ремни' },
  { name: 'Подвеска', slug: 'suspension', icon: 'build', description: 'Амортизаторы, рычаги, пружины' },
  { name: 'Освещение', slug: 'lighting', icon: 'light_mode', description: 'Фары, задние фонари, LED' },
  { name: 'Интерьер', slug: 'interior', icon: 'chair', description: 'Обшивка, консоли, панели' },
  { name: 'Электроника', slug: 'electronics', icon: 'bolt', description: 'ЭБУ, проводка, датчики' },
  { name: 'Тормоза', slug: 'brakes', icon: 'stop_circle', description: 'Диски, колодки, суппорты' },
]

export function getProductsByBrandAndCategory(brandSlug: string, categorySlug: string): Product[] {
  return products.filter(
    (p) => p.brandSlug === brandSlug && p.categorySlug === categorySlug
  )
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}
