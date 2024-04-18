export default function VenueDescription({ ...props }) {
  const { className, description } = props;
  return (
    <section
      className={`w-full block text-[14px] mb-[30px] ${className || ""}`}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}
