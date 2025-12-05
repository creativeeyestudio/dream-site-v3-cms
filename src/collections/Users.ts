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
  access: {
    read: ({ req }: { req: RequestProps }) => {
      if (req.user?.role === 'admin') return true;

      return {
        id: {
          equals: req.user?.id,
        },
      };
    },

    create: ({ req }: { req: RequestProps }) => {
      return req.user?.role === 'admin';
    },

    update: ({ req }: { req: RequestProps }) => {
      if (req.user?.role === 'admin') return true;

      return {
        id: {
          equals: req.user?.id,
        },
      };
    },
  },

  auth: true,
  fields: [{
    name: 'role',
    type: 'select',
    required: true,
    defaultValue: 'contributor',
    options: ROLE_OPTIONS,
    admin: {
      position: 'sidebar',
    },
    access: {
      read: ({ req }: { req: RequestProps }) => req.user?.role === 'admin',
    }
  }],
}
