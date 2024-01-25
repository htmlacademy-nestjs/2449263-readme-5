import { PrismaClient } from '@prisma/client';

const FIRST_CATEGORY_UUID = 'f971990c-953a-4e51-9035-ccd4af18c92b';
const SECOND_CATEGORY_UUID = 'd67e1e52-c3cd-461f-9547-ab88794a9e1f';

const FIRST_POST_UUID = 'df52ebbf-9e34-41c9-a583-9589c6bde284';
const SECOND_POST_UUID = '70bc4eaf-eba7-49f7-95c7-e215f5a6de79';
const THIRD_POST_UUID = '6c4717ba-3be6-4cb4-909c-6c9b28660da9';
const FOURTH_POST_UUID = '3a54f901-8200-4525-9462-1868f427d94f';
const FIFTH_POST_UUID = '3ce9b9f9-0884-4db0-9299-8f87744cc311';

const FIRST_FAVORITE_UUID = '6ee1ba2d-6fba-42da-893c-61bd9f523002';
const SECOND_FAVORITE_UUID = '3803c17b-9d52-4dee-8467-9eae6f0a216f';
const THIRD_FAVORITE_UUID = 'f8779985-d82f-42f4-b9fa-f2e4e2e26d6d';
const FOURTH_FAVORITE_UUID = '86f7912e-0452-40a4-b6ce-1c2c46372be1';
const FIFTH_FAVORITE_UUID = '3aa55f8c-8151-40db-927c-de5cb0f8ab8a';
const SIXTH_FAVORITE_UUID = 'cfc886f3-dee6-4bb9-be76-298f59eca494';
const SEVENTH_FAVORITE_UUID = '8eee3a47-f8f4-4746-be4e-01b8266f07e4';

const FIRST_USER_ID = '65b0b76ef5f8c7b7fad8be9c';
const SECOND_USER_ID = '65b0b7a0ea0f2f02a1127852';
const THIRD_USER_ID = '65b291411a03b5f10e20f6a0';



function getCategories() {
  return [
    { id: FIRST_CATEGORY_UUID, title: 'Категория 1' },
    { id: SECOND_CATEGORY_UUID, title: 'Категория 2' },
  ];
}

function getFavorites() {
  return [
    { id: FIRST_FAVORITE_UUID, postId: FIRST_POST_UUID, userId: FIRST_USER_ID },
    { id: SECOND_FAVORITE_UUID, postId: FOURTH_POST_UUID, userId: FIRST_USER_ID },
    { id: THIRD_FAVORITE_UUID, postId: FOURTH_POST_UUID, userId: SECOND_USER_ID },
    { id: FOURTH_FAVORITE_UUID, postId: FOURTH_POST_UUID, userId: THIRD_USER_ID },
    { id: FIFTH_FAVORITE_UUID, postId: SECOND_POST_UUID, userId: FIRST_USER_ID },
    { id: SIXTH_FAVORITE_UUID, postId: SECOND_POST_UUID, userId: THIRD_USER_ID },
    { id: SEVENTH_FAVORITE_UUID, postId: THIRD_POST_UUID, userId: FIRST_USER_ID },
  ]
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      title: 'Первый',
      userId: FIRST_USER_ID,
      content: 'Содержание первого поста',
      description: 'Описание первого поста',
      categories: {
        connect: [{ id: FIRST_CATEGORY_UUID }],
      },
      favorites: [
        { id: FIRST_FAVORITE_UUID, userId: FIRST_USER_ID },
      ]
    },
    {
      id: SECOND_POST_UUID,
      title: 'Второй',
      userId: FIRST_USER_ID,
      content: 'Содержание второго поста',
      description: 'Описание второго поста',
      categories: {
        connect: [
          { id: FIRST_CATEGORY_UUID },
          { id: SECOND_CATEGORY_UUID },
        ]
      },
      comments: [
          {
            message: 'Простой комментрарий',
            userId: FIRST_USER_ID,
          },
          {
            message: 'Чудо-комментарий',
            userId: SECOND_USER_ID,
          }
      ],
      favorites: [
        { id: FIFTH_FAVORITE_UUID, userId: FIRST_USER_ID },
        { id: SIXTH_FAVORITE_UUID, userId: THIRD_USER_ID },
      ]
    },
    {
      id: THIRD_POST_UUID,
      title: 'Третий',
      userId: SECOND_USER_ID,
      content: 'Содержание третьего поста',
      description: 'Описание третьего поста',
      categories: {
        connect: [
          { id: SECOND_CATEGORY_UUID },
        ]
      },
      comments: [
          {
            message: 'Нет слов..',
            userId: THIRD_USER_ID,
          }
      ],
      favorites: [
        { id: SEVENTH_FAVORITE_UUID, userId: FIRST_USER_ID },
      ]
    },
    {
      id: FOURTH_POST_UUID,
      title: 'Четвёртый',
      userId: SECOND_USER_ID,
      content: 'Содержание четвертого поста',
      description: 'Описание четвертого поста',
      categories: {
        connect: [
          { id: SECOND_CATEGORY_UUID },
          { id: FIRST_CATEGORY_UUID },
        ]
      },
      comments: [
          {
            message: 'Восхитительно!',
            userId: THIRD_USER_ID,
          },
          {
            message: 'Потерял дар речи',
            userId: FIRST_USER_ID,
          },
          {
            message: 'Речь вернулась',
            userId: FIRST_USER_ID,
          },
          {
            message: 'Много шутишь',
            userId: SECOND_USER_ID,
          }
      ],
      favorites: [
        { id: SECOND_FAVORITE_UUID, userId: FIRST_USER_ID },
        { id: THIRD_FAVORITE_UUID, userId: SECOND_USER_ID },
        { id: FOURTH_FAVORITE_UUID, userId: THIRD_USER_ID },
      ]
    },
    {
      id: FIFTH_POST_UUID,
      title: 'Пятый',
      userId: THIRD_USER_ID,
      content: 'Содержание пятого поста',
      description: 'Описание пятого поста',
      categories: {
        connect: [
          { id: SECOND_CATEGORY_UUID },
        ]
      },
      comments: [
          {
            message: 'Слабовато',
            userId: SECOND_USER_ID,
          }
      ]
    },
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockCategories = getCategories();
  for (const category of mockCategories) {
    await prismaClient.category.upsert({
      where: { id: category.id },
      update: {},
      create: {
        id: category.id,
        title: category.title
      }
    });
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.description,
        categories: post.categories,
        userId: post.userId,
        comments: post.comments ? {
          create: post.comments
        } : undefined,
        favorites: post.favorites ? {
          create: post.favorites
        } : undefined,
      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
