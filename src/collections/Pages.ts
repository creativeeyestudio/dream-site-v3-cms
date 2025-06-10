import type { CollectionConfig } from 'payload';

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true, // Public
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
      name: 'content',
      type: 'richText',
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Published',
      defaultValue: false,
    },
    {
      name: 'homepage',
      type: 'checkbox',
      label: 'Homepage',
      defaultValue: false,
      unique: true,
    },
  ],
};

export default Pages;
