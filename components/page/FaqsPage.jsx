export default function FaqsPage({ page }) {
  const { description } = page.data.main;
  return (
    <article className="py-[30px]">
      <div className="container">
        {page.title && (
          <div className="text-primary text-[25px] tracking-[1px] text-center py-[30px] border-b-[1px] border-[#ccc] mb-[30px]">
            {page.title}
          </div>
        )}
        {description && (
          <div
            className="description text-[14px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </article>
  );
}
