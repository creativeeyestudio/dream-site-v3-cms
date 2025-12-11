// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { fr } from '@payloadcms/translations/languages/fr'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Pages from './collections/Pages'
import Navigation from './collections/Navigation'
import Posts from './collections/Posts'

import { seoPlugin } from '@payloadcms/plugin-seo'
import LegalNotice from './globals/LegalNotice'
import Confidentiality from './globals/Confidentiality'
import Cgv from './globals/Cgv'
import Customization from './globals/Customization'

import { fields, formBuilderPlugin } from '@payloadcms/plugin-form-builder'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: '/components/payload/Logo',
        Icon: '/components/payload/Icon',
      }
    }
  },
  collections: [Users, Media, Pages, Posts, Navigation],
  globals: [LegalNotice, Confidentiality, Cgv, Customization],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI!,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    seoPlugin({
      collections: ['pages', 'posts'],
      uploadsCollection: 'media',
    }),
    formBuilderPlugin({
      fields: {
        text: {
          ...fields.text,
          labels: {
            singular: 'Ligne de texte',
            plural: 'Lignes de texte',
          },
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'placeholder',
              label: 'Placeholder',
              type: 'text',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'min',
                  label: 'Min',
                  type: 'number',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'max',
                  label: 'Max',
                  type: 'number',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'required',
              label: 'Champ requis',
              type: 'checkbox',
            },
          ],
        },
        textarea: {
          ...fields.textarea,
          labels: {
            singular: 'Champ de texte',
            plural: 'Champs de texte',
          },
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'placeholder',
              label: 'Placeholder',
              type: 'text',
            },
            {
              name: 'required',
              label: 'Champ requis',
              type: 'checkbox',
            },
          ],
        },
        select: true,
        radio: true,
        email: true,
        state: true,
        country: true,
        checkbox: true,
        number: true,
        message: true,
        date: false,
        payment: false,
      },
      formOverrides: {
        labels: {
          singular: 'Formulaire',
          plural: 'Formulaires',
        },
        admin: {
          group: 'Plugins',
        },
        fields: ({ defaultFields }) => {
          return [
            {
              name: 'formType',
              type: 'select',
              label: 'Type de formulaire',
              unique: true,
              required: true,
              options: [
                {
                  label: 'Formulaire de contact',
                  value: 'contact-form'
                },
                {
                  label: 'Formulaire de newsletter',
                  value: 'news-form'
                },
              ]
            },
            ...defaultFields,
          ]
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: 'Plugins',
          hidden: true
        },
      },
    }),
  ],
  i18n: {
    fallbackLanguage: 'fr',
    supportedLanguages: { en, fr, es },
  },
  localization: {
    locales: ['fr', 'en', 'es'], // required
    defaultLocale: 'fr', // required
  },
})
