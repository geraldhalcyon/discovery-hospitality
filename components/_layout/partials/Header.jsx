import Head from "next/head";
import tenantDetailsMain from "@/lib/preBuildScripts/static/tenantDetailsMain.json";
import tenantMetatags from "@/lib/preBuildScripts/static/tenantMetatags.json";
export default function Header({ meta, page }) {
  const findMeta = (type) => {
    switch (type) {
      case "title":
        return meta?.title || page?.title || tenantMetatags?.title;
      case "favicon":
        return tenantDetailsMain?.favicon || "/favicon.ico";
      case "description":
        return meta?.description || tenantMetatags?.description;
      case "image":
        return meta?.image || tenantMetatags?.image;
      case "author":
        return tenantDetailsMain?.site_name;
      case "keywords":
        return meta?.keywords || tenantMetatags?.keywords;
      case "url":
        return process.env.NEXT_PUBLIC_SITE_URL;
    }
  };

  const imageType = () => {
    const image = meta?.image || tenantMetatags?.image;
    const arr = image ? image?.split(".") : null;
    return arr ? arr[arr.length - 1] : "webp";
  };

  return (
    <Head>
      {/* META FAVICON */}
      <link rel="icon" href={findMeta("favicon")} />

      {/* META TITLE */}
      <title>{findMeta("title")}</title>
      <meta name="twitter:title" content={findMeta("title")} />

      {/* META KEYWORDS */}
      <meta name="keywords" content={findMeta("keywords")} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="url" property="og:url" content={findMeta("url")} />

      {/* META AUTHOR */}
      <meta name="author" content={findMeta("author")} />
      <meta
        name="site_name"
        property="og:site_name"
        content={findMeta("author")}
      />
      <meta name="twitter:site" content={findMeta("author")} />
      <meta name="twitter:creator" content={findMeta("author")} />

      {/* META DESCRIPTION */}
      <meta
        name="description"
        property="og:description"
        content={findMeta("description")}
      />
      <meta name="description" content={findMeta("description")} />
      <meta name="twitter:description" content={findMeta("description")} />

      {/* META IMAGE */}
      <meta
        name="secure_url"
        property="og:image:secure_url"
        content={findMeta("image")}
      />
      <meta name="twitter:image" content={findMeta("image")} />
      <meta name="image" property="og:image" content={findMeta("image")} />

      {/* META TYPES */}
      <meta name="type" property="og:image:type" content={imageType()} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* META DOMAIN */}
      <meta name="twitter:domain" content={findMeta("url")} />
    </Head>
  );
}
