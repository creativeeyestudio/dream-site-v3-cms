import { CollectionConfig, Field } from 'payload'
import crypto from 'crypto'

// DATAS
// ----------------------------------------------
const hotelData: Field = {
  name: 'hotelData',
  label: "Infos de l'hôtel",
  type: 'group',
  fields: [
    {
      name: 'hotelName',
      label: "Nom de l'hôtel",
      type: 'text',
    },
  ],
}

// THAIS PMS
// ----------------------------------------------
const ThaisPMS: Field = {
  name: 'thais',
  label: 'Thais PMS',
  type: 'group',
  fields: [
    {
      name: 'apiLink',
      label: "Lien de l'API",
      type: 'text',
      admin: { placeholder: "URL d'API fournie par Thais" },
    },
    {
      name: 'username',
      label: "Nom d'utilisateur",
      type: 'text',
      defaultValue: undefined,
      admin: { placeholder: 'Identifiant fourni par Thais' },
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'text',
      admin: {
        placeholder: 'Mot de passe fourni par Thais',
        condition: (data) => !data?.thais?.passwordHash,
      },
    },
    {
      name: 'passwordHash',
      type: 'text',
      admin: { hidden: true },
    },
    {
      name: 'resetPassword',
      type: 'ui',
      admin: {
        condition: ({ thais }) => Boolean(thais?.passwordHash),
        components: {
          Field: {
            path: '/components/ResetPasswordButton',
            clientProps: {
              label: 'Changer mon mot de passe',
              fieldPath: 'thais.password',
              hashPath: 'thais.passwordHash',
            },
          },
        },
      },
    },
  ],
}

// SITEMINDER
// ----------------------------------------------
const SiteMinder: Field = {
  name: 'siteminder',
  label: 'SiteMinder',
  type: 'group',
  fields: [
    {
      name: 'apiUrl',
      label: "Lien de l'API",
      type: 'text',
    },
    {
      name: 'apiKey',
      label: 'API Key',
      type: 'text',
    },
  ],
}

const ZenChef: Field = {
  name: 'zenchef',
  label: 'ZenChef',
  type: 'group',
  fields: [
    {
      name: 'widget',
      label: 'Lien vers le widget de moteur de recherche',
      type: 'text',
    },
  ],
}

const ChrConnectConfig: CollectionConfig = {
  slug: 'chr-config',
  labels: {
    singular: 'CHR Connect',
    plural: 'CHR Connect',
  },
  admin: {
    group: 'Plugins',
  },
  fields: [hotelData, ThaisPMS, SiteMinder, ZenChef],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data.thais?.password) {
          console.log('Password : ', data.thais?.password)
          const hashed = encrypt(data.thais.password)
          return {
            ...data,
            thais: {
              ...data.thais,
              passwordHash: hashed, // on stocke le hash
              password: undefined, // on enlève le clair
            },
          }
        } else {
          return {
            ...data,
            thais: {
              ...data.thais,
              passwordHash: undefined, // on stocke le hash
              password: undefined, // on enlève le clair
            },
          }
        }
        return data
      },
    ],
  },
}

function encrypt(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export default ChrConnectConfig
