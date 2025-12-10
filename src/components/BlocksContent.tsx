import { Block, Field } from "payload";
import LinkComponent from "./LinkComponent";

export const Text: Block = {
    slug: 'textBlock',
    labels: {
        singular: 'Texte',
        plural: 'Textes'
    },
    fields: [
        {
            name: 'textBlockField',
            label: false,
            type: 'richText',
            required: true
        }
    ]
}

export const Image: Block = {
    slug: 'imageBlock',
    labels: {
        singular: 'Image',
        plural: 'Images'
    },
    fields: [
        {
            name: 'imageBlockField',
            label: false,
            type: 'upload',
            relationTo: 'media',
            required: true
        }
    ]
}

export const ButtonsList: Block = {
    slug: 'buttonsListBlock',
    labels: {
        singular: 'Liste de boutons',
        plural: 'Listes de boutons'
    },
    fields: [
        {
            name: 'buttonsListField',
            type: 'array',
            label: 'Boutons',
            labels: {
                singular: 'Bouton',
                plural: 'Boutons'
            },
            fields: LinkComponent()
        }
    ]
}