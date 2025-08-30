// This file serves as a placeholder for Django integration
// The actual Django API client is in src/lib/auth-api.ts

export const djangoConfig = {
  baseUrl: 'http://localhost:8000/api',
  endpoints: {
    auth: {
      login: '/auth/login/',
      register: '/auth/register/',
      logout: '/auth/logout/',
      me: '/auth/me/',
      csrf: '/auth/csrf/',
    },
    data: {
      assessments: '/assessments/',
      tests: '/tests/',
      domains: '/domains/',
      skills: '/skills/',
      items: '/items/',
    }
  }
};