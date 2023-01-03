import clsx from 'clsx';
import Link from 'next/link';
import sAgo from 's-ago';

import Image from '$components/image';
import { urlForImage } from '$lib/sanity/tools';
import type { BlogPostLobbyProps } from '$lib/types';

export default function ExplorerBlogList({
    postList,
}: {
    postList: BlogPostLobbyProps['allPosts'];
}) {
    return (
        <div className="grid space-y-5 divide-y-2 divide-gray-400 dark:divide-gray-500">
            {postList.length !== 0 ? (
                postList.map(({ breif, publishedAt, slug, thumbnail, title }) => {
                    return (
                        <div
                            key={slug.current}
                            className="flex w-full flex-col justify-between py-4 md:flex-row md:space-x-5">
                            <div
                                className={clsx(
                                    thumbnail && 'mb-3 md:mb-0 md:max-w-[400px]',
                                    'flex max-h-fit flex-col justify-between break-words',
                                )}>
                                <div>
                                    <Link
                                        passHref
                                        className="cursor-pointer text-2xl hover:underline"
                                        href={{
                                            pathname: '/blog/[slug]',
                                            query: {
                                                slug: slug.current,
                                            },
                                        }}>
                                        {title}
                                    </Link>
                                    <p className="text-gray-600 dark:text-gray-300">{breif}</p>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Published: {sAgo(new Date(publishedAt))}
                                </p>
                            </div>
                            {thumbnail && (
                                <Image
                                    alt="Thumbnail"
                                    className="rounded md:mt-0"
                                    lightboxEnabled
                                    src={urlForImage(thumbnail).url()}
                                    width={1600 * 0.15}
                                    height={900 * 0.15}
                                />
                            )}
                        </div>
                    );
                })
            ) : (
                <div className="flex flex-col items-center">
                    <p className="p-5">Nothing can be found!</p>
                </div>
            )}
        </div>
    );
}
