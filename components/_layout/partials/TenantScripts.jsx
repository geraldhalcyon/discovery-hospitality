import tenantScripts from "@/lib/preBuildScripts/static/tenantScripts.json";
export default function TenantScripts() {
  return (
    <>
      {tenantScripts && tenantScripts.length > 0 && (
        <>
          {tenantScripts?.map((item, index) => {
            return (
              <div
                key={index}
                id={`tenantScript-${index + 1}`}
                dangerouslySetInnerHTML={{ __html: item?.code }}
              />
            );
          })}
        </>
      )}
    </>
  );
}
