import type { DefaultSeoProps } from 'next-seo';

import { config } from '$data/constants';
import { isDev } from '$data/constants';

const seoConfig: DefaultSeoProps = {
    titleTemplate: '%s - cktidy',
    openGraph: {
        type: 'website',
        site_name: config.sitename,
    },
    twitter: {
        site: config.twitter,
        cardType: 'summary_large_image',
    },
    dangerouslySetAllPagesToNoFollow: isDev,
    dangerouslySetAllPagesToNoIndex: isDev,
};

export default seoConfig;
