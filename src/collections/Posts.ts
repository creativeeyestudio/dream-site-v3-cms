import type { CollectionConfig } from 'payload'
import Text from '@/blocks/Text'
import TextIntro from '@/blocks/TextIntro'
import HtmlContent from '@/blocks/HtmlContent'
import Heroscreen from '@/blocks/Heroscreen'
import Parallax from '@/blocks/Parallax'
import TextDoubleImage from '@/blocks/TextImageDouble'
import TextImage from '@/blocks/TextImage'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Contenu',
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => {
      if (['contributor'].includes(req.user?.role ?? 'contributor')) {
        return {
          'config.createdBy': {
            equals: req.user?.id,
          },
        };
      }

      return true;
    },

    create: ({ req }) =>
      ['admin', 'editor', 'author', 'contributor'].includes(req.user?.role ?? 'contributor'),

    update: ({ req }) =>
      ['admin', 'editor', 'author', 'contributor'].includes(req.user?.role ?? 'contributor'),

    delete: ({ req }) =>
      ['admin', 'editor', 'author', 'contributor'].includes(req.user?.role ?? 'contributor'),
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
      label: "Contenu",
      labels: {
        singular: "Bloc d'article",
        plural: "Blocs d'article"
      },
      type: 'blocks',
      blocks: [TextIntro, Text, TextImage, TextDoubleImage, Heroscreen, Parallax, HtmlContent],
      required: false,
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
            read: () => true,
            create: ({ req }) => ['admin', 'editor', 'author', 'contributor'].includes(req.user?.role ?? ''),
            update: ({ req }) => ['admin', 'editor', 'author', 'contributor'].includes(req.user?.role ?? ''),
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
              ({ req, value }) => {
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
    beforeChange: [
      ({ req, data }) => {
        if (req.user?.role === 'contributor' && data?.config?.published === '2') {
          data.config.published = '1';
        }
        return data;
      },
    ],

    afterRead: [
      async ({ doc, req }) => {
        // Marque si l'utilisateur est propriétaire de l'article
        if (req?.user) {
          doc.isOwner =
            typeof doc?.config?.createdBy?.equals === 'function'
              ? doc.config.createdBy.equals(req.user.id)
              : doc.config?.createdBy === req.user.id;
        }
        return doc
      },
    ],
  },
}

export default Posts