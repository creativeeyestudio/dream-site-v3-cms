import type { CollectionConfig } from 'payload'
import Text from '@/blocks/Text'
import TextIntro from '@/blocks/TextIntro'
import HtmlContent from '@/blocks/HtmlContent'
import Heroscreen from '@/blocks/Heroscreen'
import Parallax from '@/blocks/Parallax'
import TextDoubleImage from '@/blocks/TextImageDouble'
import TextImage from '@/blocks/TextImage'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Contenu',
  },
  access: {
    read: () => true, // Public
  },
  fields: [
    // Titre
    {
      name: 'title',
      label: 'Titre de la page',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'URL',
      type: 'text',
      required: true,
      unique: true,
    },

    // Contenu
    {
      name: 'content',
      label: 'Contenu de la page',
      type: 'group',
      fields: [
        {
          name: 'layout',
          label: 'Blocks de la page',
          type: 'blocks',
          blocks: [Text, TextIntro, TextImage, TextDoubleImage, Parallax, HtmlContent, Heroscreen],
          required: false,
        },
      ],
    },

    // SEO
    {
      name: 'seo',
      type: 'group',
      label: 'Config SEO',
      fields: [
        {
          name: 'meta_title',
          label: 'Meta Title',
          type: 'text',
          maxLength: 60,
          admin: {
            description: 'Titre pour les moteurs de recherche (60 caractères max)',
          },
        },
        {
          name: 'meta_description',
          label: 'Meta Description',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Description pour les moteurs de recherche (160 caractères max)',
          },
        },
        {
          name: 'meta_image',
          label: 'Meta Image',
          type: 'upload',
          relationTo: 'media', // Assure-toi que tu as une collection "media"
          admin: {
            description: 'Image utilisée pour les partages sur les réseaux sociaux',
          },
        },
        {
          name: 'noindex',
          label: 'No Index',
          type: 'checkbox',
          admin: {
            description: 'Empêche l’indexation par les moteurs de recherche',
          },
        },
      ],
    },

    // Publication et Homepage
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
          options: [
            { label: 'En brouillon', value: '0' },
            { label: 'A relire', value: '1' },
            { label: 'Publié', value: '2' },
          ],
        },
        {
          name: 'homepage',
          type: 'checkbox',
          label: "Page d'accueil",
          defaultValue: false,
          unique: true,
        },
      ],
    },
  ],
}

export default Pages
