import dynamic from "next/dynamic";
export const components = {
  PageBanner: dynamic(() =>
    import("../../components/blocks/PageBanner").then(
      (module) => module.default
    )
  ),

  Slider: dynamic(() =>
    import("../../components/blocks/Slider").then((module) => module.default)
  ),
  Destination: dynamic(() =>
    import("../../components/blocks/Destination").then(
      (module) => module.default
    )
  ),
  Introduction: dynamic(() =>
    import("../../components/blocks/Introduction").then(
      (module) => module.default
    )
  ),
  OurCollection: dynamic(() =>
    import("../../components/blocks/OurCollection").then(
      (module) => module.default
    )
  ),

  CallToActions: dynamic(() =>
    import("../../components/blocks/CallToActions").then(
      (module) => module.default
    )
  ),
  HeroGridRepeater: dynamic(() =>
    import("../../components/blocks/HeroGridRepeater").then(
      (module) => module.default
    )
  ),
  GridFloatBookDirect: dynamic(() =>
    import("../../components/blocks/GridFloatBookDirect").then(
      (module) => module.default
    )
  ),
  DiscoverBlog: dynamic(() =>
    import("../../components/blocks/DiscoverBlog").then(
      (module) => module.default
    )
  ),
  Feature: dynamic(() =>
    import("../../components/blocks/Feature").then((module) => module.default)
  ),
  AdvocaciesReviews: dynamic(() =>
    import("../../components/blocks/AdvocaciesReviews").then(
      (module) => module.default
    )
  ),
  Description: dynamic(() =>
    import("../../components/blocks/Description").then(
      (module) => module.default
    )
  ),
  Selection: dynamic(() =>
    import("../../components/blocks/Selection").then((module) => module.default)
  ),
  Awards: dynamic(() =>
    import("../../components/blocks/Awards").then((module) => module.default)
  ),
  CarouselGallery: dynamic(() =>
    import("../../components/blocks/CarouselGallery").then(
      (module) => module.default
    )
  ),
  BlogBlock: dynamic(() =>
    import("../../components/blocks/BlogBlock").then((module) => module.default)
  ),
  Title: dynamic(() =>
    import("../../components/blocks/Title").then((module) => module.default)
  ),

  PressRelease: dynamic(() =>
    import("../../components/blocks/PressRelease").then(
      (module) => module.default
    )
  ),
  Offers: dynamic(() =>
    import("../../components/blocks/Offers").then((module) => module.default)
  ),
  MeetingsEvents: dynamic(() =>
    import("../../components/blocks/MeetingsEvents").then(
      (module) => module.default
    )
  ),
  PromosBlock: dynamic(() =>
    import("../../components/blocks/PromosBlock").then(
      (module) => module.default
    )
  ),
  PhotoGallery: dynamic(() =>
    import("../../components/blocks/PhotoGallery").then(
      (module) => module.default
    )
  ),
  RoomsSuiteBlock: dynamic(() =>
    import("../../components/blocks/RoomsSuiteBlock").then(
      (module) => module.default
    )
  ),
  ContactUsBlock: dynamic(() =>
    import("../../components/blocks/ContactUsBlock").then(
      (module) => module.default
    )
  ),
  ExperienceSelections: dynamic(() =>
    import("../../components/blocks/ExperienceSelections").then(
      (module) => module.default
    )
  ),
  DiningBlock: dynamic(() =>
    import("../../components/blocks/DiningBlock").then(
      (module) => module.default
    )
  ),
  OffersSelections: dynamic(() =>
    import("../../components/blocks/OffersSelections").then(
      (module) => module.default
    )
  ),
  ButtonsBlock: dynamic(() =>
    import("../../components/blocks/ButtonsBlock").then(
      (module) => module.default
    )
  ),
  BlogReviews: dynamic(() =>
    import("../../components/blocks/BlogReviews").then(
      (module) => module.default
    )
  ),
};
