import { CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid'
import LinkComponent from '@/components/LinkComponent'

const Navigation: CollectionConfig = {
  slug: 'navigation',
  labels: {
    singular: 'Menu',
    plural: 'Menus',
  },
  admin: {
    group: 'Contenu',
    useAsTitle: 'menuId',
    hidden: ({ user }) => {
      return !['admin', 'editor'].includes(user?.role);
    }

  },
  access: {
    read: () => true,

    create: ({ req }) =>
      ['admin', 'editor'].includes(req.user?.role ?? 'editor'),

    update: ({ req }) =>
      ['admin', 'editor'].includes(req.user?.role ?? 'editor'),

    delete: ({ req }) =>
      ['admin', 'editor'].includes(req.user?.role ?? 'editor'),
  },
  fields: [
    {
      name: 'menuId',
      type: 'select',
      label: 'Position du menu',
      required: true,
      unique: true,
      options: [
        { label: 'Menu principal', value: 'main-menu' },
        { label: 'Menu secondaire', value: 'secondary-menu' },
        { label: 'Menu pied de page', value: 'footer-menu' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Liens du menu',
      fields: [
        ...LinkComponent(true),
        {
          name: 'children',
          type: 'array',
          label: 'Sous-menus',
          fields: LinkComponent(true),
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create' && !data.menuId) data.menuId = uuidv4()
        return data
      },
    ],
  },
}

export default Navigation