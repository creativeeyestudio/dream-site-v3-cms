import LinkComponent from "@/components/LinkComponent";
import Content from "@/fields/Content";
import type { Block } from "payload";

const TextIntro: Block = {
    slug: 'text-intro',
    labels: {
        singular: 'Bloc Introduction',
        plural: 'Blocs Introduction',
    },
    fields: [Content]
}

export default TextIntro;