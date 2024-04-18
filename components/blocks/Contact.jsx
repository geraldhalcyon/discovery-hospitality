import dynamic from "next/dynamic";
export default function MainBanner({ block }) {
  const ContactForm = dynamic(() =>
    import("@/components/partials/forms/ContactForm").then(
      (module) => module.default
    )
  );
  return (
    <div className="m-auto max-w-[600px] mt-12 p-8 border-2 border-[#cacaca]">
      <ContactForm form={block?.main?.form} />
    </div>
  );
}
