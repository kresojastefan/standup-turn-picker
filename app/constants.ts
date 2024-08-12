type initialUsers = string[];

if (!process.env.NEXT_PUBLIC_USERS_LIST) {
  throw new Error('NEXT_PUBLIC_USERS_LIST is not set');
}

export const initialUsers:initialUsers = process.env.NEXT_PUBLIC_USERS_LIST.split(',');