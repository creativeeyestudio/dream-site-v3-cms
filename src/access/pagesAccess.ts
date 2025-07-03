import { Access } from 'payload/types'
import { hasRole } from './roles'

export const pagesAccess = {
  read: ({ req: { user } }) => hasRole(user?.role, 'editor'),
  create: ({ req: { user } }) => hasRole(user?.role, 'editor'),
  update: ({ req: { user } }) => hasRole(user?.role, 'editor'),
  delete: ({ req: { user } }) => hasRole(user?.role, 'editor'),
}
