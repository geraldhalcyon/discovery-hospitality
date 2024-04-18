import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
export default function PhotoGallery({ block }) {
  const ModalImage1 = dynamic(() =>
    import("@/components/partials/Modals/ModalImage1").then(
      (module) => module.default
    )
  );
  const { photos } = block.main;
  const [visiblePhotos, setVisiblePhotos] = useState(6);
  const loadMore = () => {
    setVisiblePhotos((prev) => prev + 3);
  };
  return (
    <div className="photos bg-[#F1F1F1] py-[30px]">
      <div className="container overflow-hidden">
        {photos && photos.length > 0 && (
          <div className="flex flex-wrap mx-[-15px]">
            {photos.slice(0, visiblePhotos).map((item, index) => (
              <div
                className="w-full max-w-[50%] sm:max-w-[33.33%] px-[15px] mb-[30px]"
                key={index}
              >
                <ModalImage1
                  content={index}
                  images={photos}
                  title="Photo"
                  image={item}
                  className="w-full h-[150px] sm:h-[360px] object-cover bg-[#ddd]"
                />
              </div>
            ))}
          </div>
        )}
        {visiblePhotos < photos.length && (
          <div className="text-center mt-4">
            <button
              onClick={loadMore}
              className="inline-block uppercase text-center text-secondary min-w-[200px] border border-secondary py-[15px] px-[30px] transition hover:text-white hover:bg-secondary"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
