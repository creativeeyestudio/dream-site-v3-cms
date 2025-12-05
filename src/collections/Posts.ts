import type { CollectionConfig } from 'payload'
import { convertRichTextToHTML } from '@/utils/convertRichTextToHTML'
import RequestProps from '@/interfaces/UserProps'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Contenu',
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => {
      if (['admin', 'editor', 'author'].includes(req.user.role)) {
        return true;
      }

      return {
        'config.createdBy': {
          equals: req.user.id,
        },
      };
    },

    create: ({ req }: { req: RequestProps }) =>
      ['admin', 'editor', 'author', 'contributor'].includes(req.user?.role ?? ''),

    update: ({ req }: { req: RequestProps }) =>
      ['admin', 'editor', 'author', 'contributor'].includes(req.user?.role ?? ''),

    delete: ({ req }: { req: RequestProps }) =>
      ['admin', 'editor', 'author', 'contributor'].includes(req.user?.role ?? ''),
  },

  labels: {
    singular: 'Article',
    plural: 'Articles',
  },
  fields: [
    {
      name: 'title',
      label: 'Titre du post',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      label: 'URL du post',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'excerpt',
      label: 'Introduction',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'content',
      label: 'Contenu',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'coverImage',
      label: 'Image du post',
      type: 'upload',
      relationTo: 'media',
    },
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
        {
          name: 'published',
          type: 'radio',
          label: 'Publié',
          defaultValue: '0',
          options: [
            { label: 'En brouillon', value: '0' },
            { label: 'À relire', value: '1' },
            { label: 'Publié', value: '2' },
          ],
          access: {
            create: ({ req }: { req: RequestProps }) => ['admin', 'editor', 'author'].includes(req.user?.role ?? ''),
            read: ({ req }: { req: RequestProps }) => ['admin', 'editor', 'author'].includes(req.user?.role ?? ''),
            update: ({ req }: { req: RequestProps }) => ['admin', 'editor', 'author'].includes(req.user?.role ?? ''),
          },
        },
        {
          name: 'createdBy',
          label: 'Auteur',
          type: 'relationship',
          relationTo: 'users',
          admin: {
            hidden: true,
          },

          hooks: {
            beforeChange: [
              ({ req, value }: { req: RequestProps, value: any }) => {
                if (value) return value
                if (req.user) return req.user.id
                return value
              },
            ],
          },
        },
      ],
    },
  ],

  hooks: {
    afterRead: [
      async ({ doc, req }: { doc: any; req: RequestProps }) => {
        // Convertir le champ richText en HTML dans un champ `html`
        if (doc?.content) {
          doc.html = convertRichTextToHTML(doc.content)
        }

        // Marque si l'utilisateur est propriétaire de l'article
        if (req?.user) {
          doc.isOwner =
            typeof doc?.config?.createdBy?.equals === 'function'
              ? doc.config.createdBy.equals(req.user.id)
              : doc.config?.createdBy === req.user.id
        }
        return doc
      },
    ],
  },
}

export default Posts