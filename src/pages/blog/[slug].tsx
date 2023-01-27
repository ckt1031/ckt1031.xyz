import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import readingTimeModule from 'reading-time';

import { BlogDisplayPage } from '$components/blog/post';
import { config } from '$lib/constants';
import { parseMdx } from '$lib/mdx';
import sanityClient from '$lib/sanity/client';
import { postSingleQuery, postSlugQuery } from '$lib/sanity/query';
import { urlForImage } from '$lib/sanity/tools';
import type { BlogSinglePostProps } from '$lib/types';

export async function getStaticPaths() {
    const paths = await sanityClient.fetch<string[] | undefined>(postSlugQuery);

    return {
        paths:
            paths?.map(slug => ({
                params: { slug },
            })) ?? [],
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<BlogSinglePostProps> = async ({ params }) => {
    if (!params || typeof params.slug !== 'string') {
        return { notFound: true };
    }

    const data = await sanityClient.fetch<BlogSinglePostProps['data']>(postSingleQuery, {
        slug: params.slug,
    });

    const content = await parseMdx(data.body as unknown as string);
    const dateName = dayjs(data._createdAt).format('YYYY/MM/DD hh:mm');
    const readingTime = readingTimeModule(data.body as unknown as string);

    const ogImage = [];
    const articleImages = [];

    const thumbnail = data.thumbnail;

    if (thumbnail) {
        const thumbUrl = urlForImage(thumbnail).url();

        if (thumbnail.hotspot) {
            ogImage.push({
                url: thumbUrl,
                width: thumbnail.hotspot.width,
                height: thumbnail.hotspot.height,
                alt: data.title,
            });
        }

        articleImages.push(thumbUrl);
    }

    return {
        props: {
            readingTime,
            data,
            content,
            dateName,
            ogImage,
            articleImages,
        },
        revalidate: 60 * 60 * 3, // 3 hours
    };
};

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();
    const { data, articleImages, ogImage } = props;

    return (
        <>
            <NextSeo
                title={data.title}
                description={data.breif}
                openGraph={{
                    type: 'website',
                    url: config.url + router.asPath,
                    title: data.title,
                    description: data.breif,
                    images: ogImage,
                }}
                titleTemplate="%s"
            />
            <ArticleJsonLd
                url={config.url + router.asPath}
                images={articleImages}
                title={data.title}
                description={data.breif}
                authorName={[
                    {
                        name: data.author.name,
                    },
                ]}
                dateModified={data._updatedAt}
                datePublished={data._createdAt}
                publisherName={data.author.name}
                publisherLogo={urlForImage(data.author.avatar).url()}
            />
            <BlogDisplayPage {...props} />
        </>
    );
}
