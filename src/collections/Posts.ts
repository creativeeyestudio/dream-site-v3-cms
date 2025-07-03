import type { CollectionConfig } from 'payload'
import { Access } from 'payload/types';
import { hasRole } from '../utils/roles';
import { convertRichTextToHTML } from '@/utils/convertRichTextToHTML'

const canRead: Access = ({ req: { user } }) => {
  return hasRole(user?.role, 'subscriber'); // tout le monde lit
};

const canCreate: Access = ({ req: { user } }) => {
  return hasRole(user?.role, 'contributor'); // à partir de contributeur
};

const canUpdate: Access = ({ req: { user } }) => {
  return hasRole(user?.role, 'editor'); // à partir d'éditeur
};

const canDelete: Access = ({ req: { user } }) => {
  return hasRole(user?.role, 'admin'); // réservé admin
};

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Contenu',
    useAsTitle: 'title',
  },
  access: {
    read: canRead,
    create: canCreate,
    update: canUpdate,
    delete: canDelete,
  },
  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        condition: (data) => data.config?.published === '2',
      },
    },
    {
      name: 'config',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'author',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            readOnly: true,
          },
          hooks: {
            beforeChange: [
              ({ req, value }) => {
                if (value) return value
                if (req.user) return req.user.id
                return value
              },
            ],
          },
        },
        {
          name: 'published',
          type: 'radio',
          label: 'Publié',
          options: [
            { label: 'En brouillon', value: '0' },
            { label: 'À relire', value: '1' },
            { label: 'Publié', value: '2' },
          ],
        },
      ],
    },
  ],

  hooks: {
    afterRead: [
      async ({ doc }) => {
        // Convertir le champ richText en HTML dans un champ `html`
        if (doc?.content) {
          doc.html = convertRichTextToHTML(doc.content)
        }
        return doc
      },
    ],
  },
}

export default Posts
