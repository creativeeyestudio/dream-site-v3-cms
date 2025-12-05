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
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true;

      return {
        id: {
          equals: req.user?.id,
        },
      };
    },

    create: ({ req }) => {
      return req.user?.role === 'admin';
    },

    update: ({ req }) => {
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
      read: ({ req }) => req.user?.role === 'admin',
    }
  }],
}
