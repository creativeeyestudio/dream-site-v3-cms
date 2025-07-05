import { Field, GlobalConfig } from 'payload'

const ThaisPMS: Field = {
  name: 'thais',
  label: 'Thais PMS',
  type: 'group',
  fields: [
    {
      name: 'apiLink',
      label: "Lien de l'API",
      type: 'text',
    },
    {
      name: 'username',
      label: "Nom d'utilisateur",
      type: 'text',
    },
    {
      name: 'password',
      label: 'Mot de passe',
      type: 'text',
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

const ChrConnectConfig: GlobalConfig = {
  slug: 'chr-config',
  label: 'CHR Connect',
  admin: {
    group: 'Plugins',
  },
  fields: [ThaisPMS, SiteMinder, ZenChef],
}

export default ChrConnectConfig
