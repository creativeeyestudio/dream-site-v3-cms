import { Field } from 'payload'

const LinkField = (imageView: boolean = false): Field[] => [
    {
        name: 'type',
        type: 'radio',
        options: [
            { label: 'Page', value: 'page' },
            { label: 'Article', value: 'post' },
            { label: 'Lien personnalisé', value: 'external' },
        ],
        defaultValue: 'page',
        required: true,
    },
    {
        name: 'page',
        type: 'relationship',
        relationTo: 'pages',
        admin: {
            condition: (_data: FieldProps, sibling: TypeProps) => sibling.type === 'page',
        },
    },
    {
        name: 'post',
        type: 'relationship',
        relationTo: 'posts',
        admin: {
            condition: (_data: FieldProps, sibling: TypeProps) => sibling.type === 'post',
        },
    },
    {
        name: 'label',
        type: 'text',
        required: true,
        localized: true,
        admin: {
            condition: (_data: FieldProps, sibling: TypeProps) => sibling.type === 'external',
        },
    },
    {
        name: 'url',
        type: 'text',
        admin: {
            condition: (_data: FieldProps, sibling: TypeProps) => sibling.type === 'external',
        },
    },
    {
        name: 'image',
        label: 'Image',
        type: 'relationship',
        relationTo: 'media',
        required: false,
        admin: {
            hidden: !imageView,
        }
    },
    {
        name: 'newTab',
        type: 'checkbox',
        label: 'Ouvrir dans un nouvel onglet',
    },
]

interface TypeProps {
    type: 'page' | 'post' | 'external'
}

interface FieldProps {
    name: 'string';
    type: 'radio' | 'relationship' | 'text' | 'checkbox';
    options: Array<{ label: 'string', value: TypeProps }>;
    defaultValue: 'string';
    required?: boolean
}

export default LinkField;