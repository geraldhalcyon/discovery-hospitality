import Image from "next/image";
import styles from "@/styles/blog.module.css";
import Link from "next/link";
import blogEntries from "@/lib/preBuildScripts/static/blog.json";
export default function BlogPage({ page }) {
  const { title, id, data, metaData, published_at, mediaHandler } = page;

  const blogs = blogEntries.blogsEntriesData;

  const getPrevOrNextObject = (array, id, direction) => {
    const currentIndex = array.findIndex((obj) => obj.id === id);
    if (currentIndex === -1) {
      return null; // If the id is not found in the array
    }

    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= array.length) {
      return null; // If trying to access beyond array boundaries
    }

    return array[nextIndex];
  };

  const prevPost = getPrevOrNextObject(blogs, id, -1); // Get previous object
  const nextPost = getPrevOrNextObject(blogs, id, 1); // Get next object

  const date = new Date(published_at);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const post_date = date.toLocaleDateString("en-US", options);

  return (
    <article className="bg-[#F1F1F1]">
      <div className="container overflow-hidden">
        <h2
          className={`text-primary text-[25px] tracking-[1px] text-center py-[30px] border-b-[1px] border-[#ccc] mb-[30px] ${
            process.env.NEXT_PUBLIC_TEMPLATE == 1 ? "font-tenor" : "font-domine"
          }`}
        >
          {title}
        </h2>
        <figure>
          <Image
            className="mb-[30px]"
            src={mediaHandler["main.image"]?.[0]?.conversions?.blog_show}
            alt={title || "Thumbnail"}
            width={1200}
            height={400}
          />
        </figure>
        <div
          className={`px-[30px] ${styles.description} text-[14px]`}
          dangerouslySetInnerHTML={{ __html: data.main.description }}
        />

        <time
          className="text-[#aaa] text-[14px] mt-[50px] block mb-[10px]"
          dateTime={post_date}
        >
          {post_date}
        </time>

        <span className="h-[1px] w-[50px] bg-[#aaa] block"></span>
        <div className="py-[60px] items-center text-[14px] flex mx-[-10px]">
          {prevPost && (
            <>
              <div className="px-[10px]">
                <Link
                  className="text-primary hover:text-[#aaa] underline"
                  href={prevPost.route_url}
                >
                  Previous Post
                </Link>
              </div>
              <span className="h-[15px] w-[1px] bg-primary block"></span>
            </>
          )}

          {nextPost && (
            <>
              <div className="px-[10px]">
                <Link
                  className="text-primary hover:text-[#aaa] underline"
                  href={nextPost.route_url}
                >
                  Next Post
                </Link>
              </div>
              <span className="h-[15px] w-[1px] bg-primary block"></span>
            </>
          )}

          <div className="px-[10px]">
            <Link
              className="text-primary hover:text-[#aaa] underline"
              href={"/blog"}
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
