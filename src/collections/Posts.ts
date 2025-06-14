import { CollectionConfig } from 'payload'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    group: 'Contenu',
    useAsTitle: 'title',
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin', // Public
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
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        condition: (data) => data.published === true,
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
          required: false,
          admin: {
            readOnly: true,
            position: 'sidebar',
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
            { label: 'A relire', value: '1' },
            { label: 'Publié', value: '2' },
          ],
        },
      ],
    },
  ],
}

export default Posts
