import { Field, GlobalConfig, SelectField, TextField } from 'payload'

const FontFamilyConfig = (name: string): SelectField => {
  return {
    type: 'select',
    name: name,
    label: 'Taille de texte',
    options: [
        {
            label: 'Lato',
            value: 'lato'
        },
        {
            label: 'Montserrat',
            value: 'montserrat'
        },
        {
            label: 'Raleway',
            value: 'raleway'
        },
        {
            label: 'Roboto',
            value: 'roboto'
        },
    ],
  }
}

const FontSizeConfig = (name: string): TextField => {
  return {
    type: 'text',
    name,
    label: 'Taille de texte',
    admin: {
      width: '33.33%',
      placeholder: '1px, 1em, 1rem',
    },
  }
}

const FontWeightConfig = (name: string): SelectField => {
  return {
    type: 'select',
    name: name,
    label: 'Taille de texte',
    options: [
      {
        label: 'Thin – 100',
        value: '100',
      },
      {
        label: 'Extra-Light – 200',
        value: '200',
      },
      {
        label: 'Light – 300',
        value: '300',
      },
      {
        label: 'Regular – 400',
        value: '400',
      },
      {
        label: 'Medium – 500',
        value: '500',
      },
      {
        label: 'Semi-Bold – 600',
        value: '600',
      },
      {
        label: 'Bold – 700',
        value: '700',
      },
      {
        label: 'Extra-Bold – 800',
        value: '800',
      },
    ],
    admin: {
      width: '33.33%',
    },
  }
}

const HeadingFields: Field[] = Array.from({ length: 6 }, (_, i) => {
  const n = i + 1

  return {
    type: 'group',
    name: `title${n}`,
    label: `Titre ${n} (H${n})`,
    fields: [
      {
        type: 'row',
        fields: [
          FontFamilyConfig(`title${n}_font`),
          FontSizeConfig(`title${n}_size`),
          FontWeightConfig(`title${n}_weight`),
        ],
      },
    ],
  }
})

const Customization: GlobalConfig = {
  slug: 'customization',
  label: 'Personnalisation du site',
  access: {
    read: ({ req }) => ['admin', 'editor'].includes(req.user?.role ?? 'editor'),
  },
  admin: {
    group: 'Administration',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'identity',
          label: 'Identité du site',
          fields: [
            {
              type: 'text',
              name: 'site_title',
              label: 'Titre du site',
            },
            {
              type: 'relationship',
              name: 'homepage',
              relationTo: 'pages',
              label: "Page d'accueil",
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'upload',
                  name: 'site_logo',
                  relationTo: 'media',
                  label: 'Logo du site',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  type: 'upload',
                  name: 'site_favicon',
                  relationTo: 'media',
                  label: 'Favicon du site',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'typography',
          label: 'Typographie',
          fields: [
            {
              type: 'group',
              name: `body`,
              label: `Corps de texte`,
              fields: [
                {
                  type: 'row',
                  fields: [
                    FontFamilyConfig(`body_font`),
                    FontSizeConfig(`body_size`),
                    FontWeightConfig(`body_weight`),
                  ],
                },
              ],
            },
            ...HeadingFields,
          ],
        },
        {
          name: 'custom_css',
          label: 'CSS personnalisé',
          fields: [
            {
              type: 'code',
              name: 'custom_css_block',
              label: false,
              admin: {
                language: 'css',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Customization
