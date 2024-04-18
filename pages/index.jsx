import ParentBlock from "@/components/page/ParentBlock";
import { props } from "@/lib/props/page";
export const getStaticProps = props;
export default function Homepage({ page, blocks }) {
  return (
    <>
      <h1 hidden className="hidden opacity-0 invisible">
        {page.metaData.title || page.name}
      </h1>
      <ParentBlock page={page} blocks={blocks} />
    </>
  );
}
