import { hasRole } from './roles'

export const accessNavigation = {
  read: ({ req: { user } }) => hasRole(user?.role, 'editor'),
  create: ({ req: { user } }) => hasRole(user?.role, 'editor'),
  update: ({ req: { user } }) => hasRole(user?.role, 'editor'),
  delete: ({ req: { user } }) => hasRole(user?.role, 'editor'),
}
