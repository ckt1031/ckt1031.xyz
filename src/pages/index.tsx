import Image from '../components/image';
import { DefaultMetaData } from '../components/seo';

export default function HomePage() {
  return (
    <>
      <DefaultMetaData
        description="A cool website by cktsun1031!"
        title="Home"
      />
      <div className="mt-5 mb-10 flex flex-col items-start justify-start">
        <h1 className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-center text-6xl text-transparent">
          Chan Ka Tsun
        </h1>
        <div className="flex h-full flex-row justify-between space-x-10">
          <div className="mt-4 max-w-xl text-2xl text-gray-700 dark:text-gray-400">
            <p>A secondary school year 4 student in Hong Kong.</p>
            <div className="mt-5 space-y-2">
              <p>I started programming since 2022.</p>
              <p>Also love reading especially philosophy.</p>
              <p>
                Written this website for sharing my stuff and what I have found
                in my life.
              </p>
            </div>
          </div>
          <div className="hidden sm:block">
            <Image
              lightboxEnabled
              alt="ckt"
              src="/media/ckt-face.png"
              height={1850 / 12}
              width={1470 / 12}
            />
          </div>
        </div>
      </div>
    </>
  );
}
