import { CollectionConfig, Field } from 'payload'

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
      defaultValue: undefined,
      admin: { placeholder: 'Mot de passe fourni par Thais' },
    },
  ],
}

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
    beforeChange: [(req) => console.log(req)],
  },
}

export default ChrConnectConfig
