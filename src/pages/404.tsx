import Link from 'next/link';

import { NextSeo } from 'next-seo';

export default function NotFoundPage() {
    return (
        <>
            <NextSeo nofollow noindex title="404" />
            <div className="mt-5 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center md:flex-row">
                    <div className="flex flex-col text-center">
                        <p className="mb-4 text-6xl font-bold">404</p>
                        <p className="text-xl md:text-2xl">
                            The page you are looking for does not exist.
                        </p>
                    </div>
                </div>
                <Link passHref href="/">
                    <button className="button-normal mt-6" type="button">
                        Back to home
                    </button>
                </Link>
            </div>
        </>
    );
}
