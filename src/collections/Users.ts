import RequestProps from '@/interfaces/UserProps'
import type { CollectionConfig } from 'payload'
import { ROLE_OPTIONS } from '@/constants/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Utilisateur',
    plural: 'Utilisateurs',
  },
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
  },
  auth: true,
  fields: [{
    name: 'role',
    type: 'select',
    required: true,
    defaultValue: 'contributor',
    options: ROLE_OPTIONS,
    access: {
      create: ({ req }: { req: RequestProps }) => req.user?.role === 'admin',
      read: ({ req }: { req: RequestProps }) => req.user?.role === 'admin',
      update: ({ req }: { req: RequestProps }) => req.user?.role === 'admin',
    },
    admin: {
      position: 'sidebar',
    },
  }],
}
