import styles from "@/styles/description.module.css";

export default function Description({ block }) {
  const { description } = block.main;
  return (
    <section className="bg-[#f1f1f1] pt-[10px] sm:pt-[30px] pb-[50px]">
      <div
        className={`${styles.description} container mb-[30px]`}
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </section>
  );
}
