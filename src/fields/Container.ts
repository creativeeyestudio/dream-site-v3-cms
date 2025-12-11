import { Image, ButtonsList, Text } from "@/components/BlocksContent";
import { Field } from "payload";

const Container: Field = {
    name: 'contentLayout',
    type: 'blocks',
    label: false,
    blocks: [Text, Image, ButtonsList],
    required: true
}

export default Container;