const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const axios = require("axios").default;
const { Jsona } = require("jsona");
const dataFormatter = new Jsona();
module.exports.preBuildDevelopment = async () => {
  dotenv.config();
  // Convert the environment variables to a JSON object
  const envVars = {};
  for (const key in process.env) {
    envVars[key] = process.env[key];
  }

  // Form Setting
  const formSettingHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/settings/form"
  );
  const formSetting = dataFormatter.deserialize(formSettingHandler.data);

  // Locales
  const localesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/locales"
  );
  const locales = localesHandler.data;

  // Form
  // const formHandler = await axios.get(
  //   envVars.NEXT_PUBLIC_TENANT_API + "/api/forms/get-in-touch?include=blueprint"
  // );
  // const form = dataFormatter.deserialize(formHandler.data);

  // Global Data

  // TENANT DETAILS PER DOMAIN

  const tenantDetailsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API + "/api/globals/discovery-hospitality"
  );
  const tenantDetails = dataFormatter.deserialize(tenantDetailsHandler.data);

  // Menu Data
  const menusHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/menus/discovery-hospitality-header-menu?include=nodes.children,parentNodes"
  );
  const menus = dataFormatter.deserialize(menusHandler.data);

  const footerMenuHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/menus/discovery-hospitality-footer-menu?include=nodes.children,parentNodes"
  );
  const footerMenuData = dataFormatter.deserialize(footerMenuHandler.data);

  const reviewsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/contents/reviews/entries" +
      `?filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const reviewsData = dataFormatter.deserialize(reviewsHandler.data);

  const destinationEntriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      `/api/contents/destinations/entries?filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const destinationEntriesData = dataFormatter.deserialize(
    destinationEntriesHandler.data
  );

  const excitingDestinationsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/contents/exciting-destinations/entries"
  );

  const excitingDestinationsEntriesData = dataFormatter.deserialize(
    excitingDestinationsHandler.data
  );

  const ourCollectionEntriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      `/api/contents/our-collection/entries?filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const ourCollectionEntriesData = dataFormatter.deserialize(
    ourCollectionEntriesHandler.data
  );

  const discoverBlogHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      `/api/contents/blog/entries?page[size]=4&includes=blueprintData,mediaHandler&filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const discoverBlogEntriesData = dataFormatter.deserialize(
    discoverBlogHandler.data
  );

  const diningHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      `/api/contents/dining/entries?page[size]=4&includes=blueprintData,mediaHandler&filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const diningEntriesData = dataFormatter.deserialize(diningHandler.data);

  const meetingEventsHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      `/api/contents/meetings-events-article/entries?filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const meetingsEventsEntriesData = dataFormatter.deserialize(
    meetingEventsHandler.data
  );

  const meetingEventsSuitesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      `/api/contents/meetings-events-suites/entries?filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const meetingsEventsSuitesEntriesData = dataFormatter.deserialize(
    meetingEventsHandler.data
  );

  const blogsEntriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      `/api/contents/blog/entries?filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const blogsEntriesData = dataFormatter.deserialize(blogsEntriesHandler.data);

  const roomsSuitesEntriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      `/api/contents/roomssuites/entries?filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const roomsSuitesEntriesData = dataFormatter.deserialize(
    roomsSuitesEntriesHandler.data
  );

  const experiencesEntriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      `/api/contents/experiences/entries?filter[sites.id]=${envVars.NEXT_PUBLIC_MICROSITE_ID}`
  );

  const experiencesEntriesData = dataFormatter.deserialize(
    experiencesEntriesHandler.data
  );

  const blogCategoriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/taxonomies/blog-category?include=taxonomyTerms"
  );

  const blogCategoryTaxonomies = dataFormatter.deserialize(
    blogCategoriesHandler.data
  );

  const offersCategoriesHandler = await axios.get(
    envVars.NEXT_PUBLIC_TENANT_API +
      "/api/taxonomies/offers-category?include=taxonomyTerms"
  );

  const offersCategoryTaxonomies = dataFormatter.deserialize(
    offersCategoriesHandler.data
  );

  // Generate default Image
  const generateImage = (imageUrl, path) => {
    const file = fs.createWriteStream(path);
    https.get(imageUrl, function (response) {
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log("Default Image Downloaded");
      });
    });
  };
  [].forEach((e, i) => {
    generateImage(e, `./public/image${i}.webp`);
  });

  const generateStaticJson = (filename, newData) => {
    const staticPath = "./lib/preBuildScripts/static/";
    const filePath = staticPath + filename;

    // Attempt to read the existing data
    let existingData;
    try {
      existingData = fs.readFileSync(filePath, "utf8");
    } catch (error) {
      existingData = null;
    }

    // If no existing data or data is different, write the new data
    if (existingData !== JSON.stringify(newData)) {
      console.log(`Generated new json file for \x1b[32m${filename}\x1b[0m`);
      fs.writeFileSync(filePath, JSON.stringify(newData));
    } else {
      console.log(`Skipping file write in \x1b[33m${filename}\x1b[0m.`);
    }
  };

  generateStaticJson("globalData.json", {
    tenantDetails,
    menus,
    locales,
    formSetting,
  });
  generateStaticJson("tenantDetailsMain.json", tenantDetails.data.main);

  generateStaticJson(
    "tenantDetailsSocialMedia.json",
    tenantDetails.data.social_media
  );

  generateStaticJson(
    "tenantDetailsCallToActions.json",
    tenantDetails.data.call_to_actions
  );

  generateStaticJson(
    "tenantDetailsConnections.json",
    tenantDetails.data.connections
  );
  generateStaticJson("tenantMetatags.json", tenantDetails.data.metatags);

  generateStaticJson("tenantScripts.json", tenantDetails.data.scripts.scripts);

  generateStaticJson("footerMenu.json", { footerMenuData });

  generateStaticJson("reviews.json", reviewsData);

  generateStaticJson("destinations.json", {
    destinationEntriesData,
  });

  generateStaticJson("our-collection.json", {
    ourCollectionEntriesData,
  });

  generateStaticJson("discover-blog-entries.json", {
    discoverBlogEntriesData,
  });

  generateStaticJson("blog.json", {
    blogsEntriesData,
  });

  generateStaticJson("blog-categories.json", {
    blogCategoryTaxonomies,
  });

  generateStaticJson("meetings-events-article.json", {
    meetingsEventsEntriesData,
  });

  generateStaticJson("meetings-events-suites.json", {
    meetingsEventsSuitesEntriesData,
  });

  generateStaticJson("offers-category.json", offersCategoryTaxonomies);

  generateStaticJson("rooms-suites.json", roomsSuitesEntriesData);

  generateStaticJson("experiences.json", experiencesEntriesData);

  generateStaticJson(
    "exciting-destinations.json",
    excitingDestinationsEntriesData
  );

  generateStaticJson("dining.json", diningEntriesData);

  console.log("New Global Data Generated!");
};
