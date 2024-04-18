import ParentBlock from "@/components/page/ParentBlock";
import Header from "@/layout/partials/Header";
import { paths, props } from "@/lib/props/page";
import dynamic from "next/dynamic";
export const getStaticPaths = paths;
export const getStaticProps = props;

const DestinationPage = dynamic(() =>
  import("../../components/page/DestinationPage").then(
    (module) => module.default
  )
);

const OurCollectionPage = dynamic(() =>
  import("../../components/page/OurCollectionPage").then(
    (module) => module.default
  )
);

const MeetingsEventsPage = dynamic(() =>
  import("../../components/page/MeetingsEventsPage").then(
    (module) => module.default
  )
);

const MeetingsEventsSuitesPage = dynamic(() =>
  import("../../components/page/MeetingsEventsSuitesPage").then(
    (module) => module.default
  )
);

const BlogPage = dynamic(() =>
  import("../../components/page/BlogPage").then((module) => module.default)
);

const OfferDetails = dynamic(() =>
  import("../../components/page/OfferDetails").then((module) => module.default)
);
const DiningPage = dynamic(() =>
  import("../../components/page/DiningPage").then((module) => module.default)
);
const FaqsPage = dynamic(() =>
  import("../../components/page/FaqsPage").then((module) => module.default)
);

const RoomSuitePage = dynamic(() =>
  import("../../components/page/RoomSuitePage").then((module) => module.default)
);

const ExperiencePage = dynamic(() =>
  import("../../components/page/ExperiencePage").then(
    (module) => module.default
  )
);

export default function DynamicPage({ page, blocks }) {
  const pageTitle = page.metaData.title || page.name;
  const titleElement = (
    <h1 hidden className="hidden opacity-0 invisible">
      {page.metaData.title || page.name}
    </h1>
  );
  const descriptionElement = (
    <>
      {page?.metaData?.description && (
        <p hidden className="hidden opacity-0 invisible">
          {page?.metaData?.description}
        </p>
      )}
    </>
  );

  let ComponentToRender;

  switch (page?.content?.id) {
    case "destinations":
      ComponentToRender = DestinationPage;
      break;
    case "our-collection":
      ComponentToRender = OurCollectionPage;
      break;
    case "meetings-events-article":
      ComponentToRender = MeetingsEventsPage;
      break;
    case "meetings-events-suites":
      ComponentToRender = MeetingsEventsSuitesPage;
      break;
    case "dining":
      ComponentToRender = DiningPage;
      break;
    case "blog":
      ComponentToRender = BlogPage;
      break;
    case "offers":
      ComponentToRender = OfferDetails;
      break;
    case "roomssuites":
      ComponentToRender = RoomSuitePage;
      break;
    case "frequently-asked-questions":
      ComponentToRender = FaqsPage;
      break;
    case "experiences":
      ComponentToRender = ExperiencePage;
      break;
    default:
      ComponentToRender = ParentBlock;
  }
  return (
    <>
      {titleElement}
      {descriptionElement}
      <Header page={page} meta={page?.metaData} />
      <ComponentToRender page={page} blocks={blocks} />
    </>
  );
}
