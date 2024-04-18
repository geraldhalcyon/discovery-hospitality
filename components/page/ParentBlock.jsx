import Header from "@/components/_layout/partials/Header";
import globalState from "@/lib/store/globalState";
import { components } from "@/lib/services/componentService";
import { useEffect } from "react";
export default function ParentBlock({ page, blocks = [], initialBlocks = 2 }) {
  const showLazy = globalState((state) => state.showLazy);
  const activeBlocks = blocks.slice(0, initialBlocks);
  const lazyBlocks = blocks.slice(initialBlocks);

  const hasTitleBlock = blocks.find((object) => object.key === "Title");

  const hasPromoBlock = blocks.find((object) => object.key === "PromoBlock");

  if (hasPromoBlock) {
    initialBlocks = 4;
  }

  if (hasTitleBlock) {
    initialBlocks = 3;
  }

  useEffect(() => {
    if (blocks.length <= initialBlocks) {
      globalState.setState({ showLazy: true });
    }
  }, [blocks, initialBlocks]);
  return (
    <>
      {activeBlocks.map((block) => {
        const Component = components[block.key];
        return (
          <Component
            key={block.key + block?.order?.toString()}
            block={block.data}
            page={page}
            index={block?.order}
            mediaHandler={block?.mediaHandler}
          />
        );
      })}

      {showLazy && (
        <>
          {lazyBlocks.map((block) => {
            const Component = components[block.key];
            return (
              <Component
                key={block.key + block?.order?.toString()}
                block={block.data}
                page={page}
                index={block?.order}
                mediaHandler={block?.mediaHandler}
              />
            );
          })}
        </>
      )}
      <Header page={page} meta={page?.metaData || {}} />
    </>
  );
}
