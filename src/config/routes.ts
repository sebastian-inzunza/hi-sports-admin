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
  users: {
    ...routesFactory('/users'),
  },
  operators: {
    ...routesFactory('/operators'),
  },
  conversations: {
    ...routesFactory('/message'),
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
    edit: (slug: string, language: string, environment?: string) => {
      return environment
        ? `/${language}/${environment}${endpoint}/${slug}/edit`
        : `${language}${endpoint}/${slug}/edit`
    },
    details: ({ id }: { id: string }) => `${endpoint}/${id}`,
  }
}
