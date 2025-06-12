import Parallax from '@/blocks/Parallax';
import TextDoubleImage from '@/blocks/TextImageDouble';
import TextImage from '@/blocks/TextImage';
import type { CollectionConfig } from 'payload';
import Text from '@/blocks/Text';
import TextIntro from '@/blocks/TextIntro';
import HtmlContent from '@/blocks/HtmlContent';
import Heroscreen from '@/blocks/Heroscreen';

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
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        Text, 
        TextIntro, 
        TextImage, 
        TextDoubleImage, 
        Parallax,
        HtmlContent,
        Heroscreen
      ],
      required: true,
    },
  ],
};

export default Pages;
