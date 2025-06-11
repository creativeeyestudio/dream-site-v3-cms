// src/collections/Navigation.ts
import { CollectionConfig } from 'payload';
import { v4 as uuidv4 } from 'uuid';

const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
        name: 'menuId',
        type: 'select',
        label: 'Position du menu',
        required: true,
        unique: true,
        options: [
            { label: 'Menu principal', value: 'main' },
            { label: 'Menu secondaire', value: 'secondary' },
            { label: 'Menu pied de page', value: 'footer' },
        ],
        admin: {
            position: 'sidebar',
            description: 'Sélectionne une position unique pour ce menu',
        },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Menu Items',
      fields: [
        {
          name: 'type',
          type: 'radio',
          options: [
            { label: 'Page', value: 'page' },
            { label: 'Lien personnalisé', value: 'external' },
          ],
          defaultValue: 'internal',
          required: true,
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Ouvrir dans un nouvel onglet',
        },
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'page',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData.type === 'external',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.type === 'external',
          },
        },
        {
          name: 'children',
          type: 'array',
          label: 'Sous-menus',
          fields: [
            {
              name: 'type',
              type: 'radio',
              options: [
                { label: 'Page interne', value: 'internal' },
                { label: 'Lien personnalisé', value: 'external' },
              ],
              defaultValue: 'internal',
              required: true,
            },
            {
              name: 'page',
              type: 'relationship',
              relationTo: 'pages',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'internal',
              },
            },
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.type === 'external',
              },
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData.type === 'external',
              },
            },
            {
              name: 'newTab',
              type: 'checkbox',
              label: 'Ouvrir dans un nouvel onglet',
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          if (!data.menuId) {
            data.menuId = uuidv4(); // ou génère un slug comme "main-header" manuellement
          }
        }
        return data;
      },
    ],
  },
};

export default Navigation;
