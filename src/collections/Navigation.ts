import { CollectionConfig } from 'payload'
import { v4 as uuidv4 } from 'uuid'
import LinkField from '@/components/LinkField'
import RequestProps from '@/interfaces/UserProps'

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

    create: ({ req }: { req: RequestProps }) =>
      ['admin', 'editor'].includes(req.user?.role),

    update: ({ req }: { req: RequestProps }) =>
      ['admin', 'editor'].includes(req.user?.role),

    delete: ({ req }: { req: RequestProps }) =>
      ['admin', 'editor'].includes(req.user?.role),
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
        ...LinkField(true),
        {
          name: 'children',
          type: 'array',
          label: 'Sous-menus',
          fields: LinkField(true),
        },
      ],
    },

    /* ------------------------ Options de publication ------------------------ */
    {
      name: 'config',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'site',
          type: 'relationship',
          relationTo: 'settings',
          required: true,
          multiple: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }: DataProps) => {
        if (operation === 'create' && !data.menuId) data.menuId = uuidv4()
        return data
      },
    ],
  },
}

export default Navigation

interface DataProps {
  data: {
    menuId: number
  }
  operation: 'create';
}