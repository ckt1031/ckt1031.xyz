import type { ClassAttributes, ImgHTMLAttributes } from 'react';

import Image from './image';

const components = {
    img: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLImageElement> &
            ImgHTMLAttributes<HTMLImageElement>,
    ) => (
        <Image
            src={props.src ?? ''}
            alt={props.alt ?? 'cktidy'}
            blurEnabled
            lightboxEnabled
            layout="responsive"
            className="w-full"
            {...props}
        />
    ),
};

export default components;
