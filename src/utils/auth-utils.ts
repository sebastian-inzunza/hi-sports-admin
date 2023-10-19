import Cookie from 'js-cookie'
import SSRCookie from 'cookie'
import {
  ADMIN,
  AUTH_CRED,
  PERMISSIONS,
  STAFF,
  SUPER_ADMIN,
  TOKEN,
  USER,
} from './constants'

export const allowedRoles = [SUPER_ADMIN, STAFF, USER, ADMIN]
export const adminAndOwnerOnly = [SUPER_ADMIN]
export const adminOwnerAndStaffOnly = [SUPER_ADMIN, STAFF]
export const adminOnly = [SUPER_ADMIN]
export const ownerAndStaffOnly = [STAFF]

export function setAuthCredentials(token: string, permissions: any) {
  Cookie.set(AUTH_CRED, JSON.stringify({ token, permissions }))
}

export function getAuthCredentials(context?: any): {
  token: string | null
  permissions: string | null
} {
  let authCred
  if (context) {
    authCred = parseSSRCookie(context)[AUTH_CRED]
  } else {
    authCred = Cookie.get(AUTH_CRED)
  }
  if (authCred) {
    return JSON.parse(authCred)
  }
  return { token: null, permissions: null }
}

export function parseSSRCookie(context: any) {
  return SSRCookie.parse(context.req.headers.cookie ?? '')
}

export function hasAccess(
  _allowedRoles: string[],
  _userPermissions: string | undefined | null
) {
  if (_userPermissions) {
    return Boolean(_allowedRoles?.includes(_userPermissions))
  }
  return false
}
export function isAuthenticated(_cookies: any) {
  return !!_cookies[TOKEN] && !!_cookies[PERMISSIONS].length
}
