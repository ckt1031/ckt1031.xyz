import dayjs from 'dayjs';
import type { GetStaticProps } from 'next';

import {
  BlogDisplayPage,
  BlogProp,
} from '../../components/layouts/blog-article';
import { parseMdx } from '../../utils/mdx';
import sanityClient from '../../utils/sanity/client';
import {
  authorQueryByRef,
  postSingleQuery,
  postSlugQuery,
} from '../../utils/sanity/query';
import { Author, Post } from '../../utils/sanity/schema';

async function getAuthor(ref: string): Promise<Author | null> {
  return await sanityClient.fetch(authorQueryByRef, {
    ref,
  });
}

export async function getStaticPaths() {
  const paths: string[] = await sanityClient.fetch(postSlugQuery);

  return {
    paths: paths.map((slug: string) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || typeof params.slug !== 'string') {
    return { notFound: true };
  }
  // Fetch Blog Article's actual detials and content
  const post: Post = await sanityClient.fetch(postSingleQuery, {
    slug: params.slug,
  });

  if (!post) {
    return { notFound: true };
  }

  // Generate parsed mdx content
  const content = await parseMdx(post.body as unknown as string);

  const dateName = dayjs(post._createdAt).format('YYYY/MM/DD hh:mm');

  return {
    props: {
      content,
      dateName,
      post: post,
      author: await getAuthor(post.author._ref),
    },
  };
};

export default function Blog(props: BlogProp) {
  return <BlogDisplayPage {...props} />;
}
