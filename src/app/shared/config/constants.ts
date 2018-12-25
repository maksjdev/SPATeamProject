export const CONSTANTS = {
  APP: {
    TITLE: 'NewString',
    LN_RU: 'ru',
    MAIN: 'main',
    NEWS: 'news',
    CREATE: 'create',
    EDIT: 'edit',
    ADMIN: 'admin',
    ABOUT: 'about',

    REGISTRATION: 'registration',
    LOGIN: 'login',
  },

  QUERY: {
    PAGE: 'page',
    SEARCH: 'search',
    PERIOD: 'period',
    RATING: 'rating',
    CATEGORY: 'category',

    BACK_URL: 'back_url',
    BACK_PARAMS: 'back_params',
  },

  SERVER: {
    CONFIG:   '/config',
    LOGIN:    '/user/login',
    REGISTER: '/user/registration',

    NEWS:     '/news',
    NEWS_TOP: '/news/top',
    USER:     '/user',
    LIKE:     '/like',
    BOOKMARK: '/bookmark',
    COMMENT:  '/comment',
    CATEGORY: '/category',
  },

  LOCAL_S: {
    USER_LOGIN: 'userLogin',
    USER_PASSWORD: 'userPassword',
    JWT_TOKEN: 'jwtToken',
  },

  MSG: {
    LOGIN_NEED: 'Ты ещё маленький, сначала залогинься',
    FORBIDDEN: 'Ты ещё маленький, подрости до Admin..',

    NEWS_EDIT: 'Новость успешно изменена!',
    COMMENT_EDIT: 'Коментарий был изменен!',
    CATEGORY_EDIT: 'Категория успешно изменена!',

    NEWS_ADD: 'Новость успешно добавлена!',
    COMMENT_ADD: 'Коментарий был добавлен!',
    CATEGORY_ADD: 'Категория успешно добавлена!',

    NEWS_DEL: 'Новость была удалена!',
    COMMENT_DEL: 'Коментарий был удален!',
    CATEGORY_DEL: 'Категория была удалена!',

    CONFIRM_DEL_COMMENT: 'Вы точно хотите удалить данный коментарий?',
    CONFIRM_DEL_NEWS: 'Вы уверены что хотите удалить новость?',
    CONFIRM_RST_NEWS: 'Вы уверены что хотите очистить новость?',
    CONFIRM_RST_CHANGE: 'Отменить ваши изменения новости?'
  },

  MOCK: {
    USER_IMAGE: 'https://hsto.org/getpro/habr/avatars/fc7/23a/b6b/fc723ab6b9870078eefc3aba22c605ad.png',
    NEWS_IMAGE: 'https://habrastorage.org/getpro/habr/post_images/349/844/4f8/3498444f856e32a0b6fbdb7877ac5610.jpg'
  }
};
