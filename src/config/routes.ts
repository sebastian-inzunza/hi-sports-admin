export const Routes = {
  dashboard: '/',
  login: '/login',
  logout: '/logout',
  profile: '/profile',
  settings: '/settings',
  forgotPassword: '/forgot-password',
  profileUpdate: '/profile-update',
  message: {
    ...routesFactory('/message'),
  },
  userMessage: {
    ...routesFactory('/user-message'),
  },
  blog: {
    ...routesFactory('/blog'),
  },
  categories: {
    ...routesFactory('/categories'),
  },
  storeNotice: {
    ...routesFactory('/notices'),
  },
  alerts: {
    ...routesFactory('/alerts'),
  },
  suggestions: {
    ...routesFactory('/suggestions'),
  },
  tracker: {
    ...routesFactory('/tracker'),
  },
  environments: {
    ...routesFactory('/environments'),
  },
  users: {
    ...routesFactory('/users'),
  },
  operators: {
    ...routesFactory('/operators'),
  },
  conversations: {
    ...routesFactory('/message'),
  },
  videoteca: {
    ...routesFactory('/videoteca'),
  },
  menu: {
    ...routesFactory('/menu'),
  },
  presentadores: {
    ...routesFactory('/presentadores'),
  },
}

function routesFactory(endpoint: string) {
  return {
    list: `${endpoint}`,
    create: `${endpoint}/create`,
    editWithoutLang: (slug: string, environment?: string) => {
      return environment
        ? `/${environment}${endpoint}/${slug}/edit`
        : `${endpoint}/${slug}/edit`
    },
    edit: ({ id, environment }: { id: string; environment?: string }) => {
      return environment
        ? `/${environment}${endpoint}/${id}/edit`
        : `${endpoint}/${id}/edit`
    },
    details: ({ id }: { id: string }) => `${endpoint}/${id}`,
  }
}
