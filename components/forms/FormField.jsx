import Input from "@/components/forms/Input";
import FileInput from "@/components/forms/FileInput";
import Textarea from "@/components/forms/Textarea";
import Select from "@/components/forms/Select";
import Checkbox from "@/components/forms/Checkbox";
import Radio from "@/components/forms/Radio";
export default function FormField(props) {
  const error = props?.error || "";
  const required = props?.rules.includes("required");
  const fieldClass = props?.className;
  const inputProps = {
    ...props,
    name: props?.state_name,
    label: props?.title,
    // placeholder: `${props?.title}${required ? "*" : ""}`,
  };
  const errortype = props?.errortype || "text";
  delete inputProps.reorder;
  delete inputProps.wrapperclassname;
  delete inputProps.errors;
  delete inputProps.can_download;
  delete inputProps.children;
  delete inputProps.helpText;
  const renderInput = () => {
    switch (props?.type) {
      case "textarea":
        return (
          <div className={props?.wrapperclassname}>
            <label
              htmlFor={props?.state_name}
              className="text-[14px] mb-[5px] block"
            >
              {props?.title}
              {required ? " *" : ""}
            </label>
            <Textarea
              {...inputProps}
              className={`${fieldClass} ${
                error && errortype === "border" ? "!border-1 !border-[red]" : ""
              }`}
            />
            {error && errortype === "text" && (
              <div className="text-[12px] mt-[-5px] text-red-600">{error}</div>
            )}
          </div>
        );
      case "select":
        return (
          <div className={props?.wrapperclassname}>
            <label
              htmlFor={props?.state_name}
              className="text-[14px] mb-[5px] block"
            >
              {props?.title}
              {required ? " *" : ""}
            </label>
            <Select
              instanceId={inputProps.state_name}
              {...inputProps}
              className={`${fieldClass} ${
                error && errortype === "border" ? "!border-1 !border-[red]" : ""
              }`}
            />
            {error && errortype === "text" && (
              <div className="text-[12px] mt-[2px] text-red-600">{error}</div>
            )}
          </div>
        );
      case "radio":
        return (
          <div className={props?.wrapperclassname}>
            <label
              htmlFor={props?.state_name}
              className="text-[14px] mb-[5px] block"
            >
              {props?.title}
              {required ? " *" : ""}
            </label>
            <Radio
              {...inputProps}
              className={`${fieldClass} ${
                error && errortype === "border" ? "!border-1 !border-[red]" : ""
              }`}
            />
            {error && errortype === "text" && (
              <div className="text-[12px] mt-[2px] text-red-600">{error}</div>
            )}
          </div>
        );
      case "file":
        return (
          <div className={props?.wrapperclassname}>
            <label
              htmlFor={props?.state_name}
              className="text-[14px] mb-[5px] block"
            >
              {props?.title}
              {required ? " *" : ""}
            </label>
            <FileInput
              {...inputProps}
              className={`${fieldClass} ${
                error && errortype === "border" ? "!border-1 !border-[red]" : ""
              }`}
            />
            {error && errortype === "text" && (
              <div className="text-[12px] mt-[2px] text-red-600">{error}</div>
            )}
          </div>
        );
      case "checkbox":
        return (
          <div className={props?.wrapperclassname}>
            <label
              htmlFor={props?.state_name}
              className="text-[14px] mb-[5px] block"
            >
              {props?.title}
              {required ? " *" : ""}
            </label>
            <Checkbox {...inputProps} />
            {error && errortype === "text" && (
              <div className="text-[12px] mt-[2px] text-red-600">{error}</div>
            )}
          </div>
        );
      default:
        return (
          <div className={props?.wrapperclassname}>
            <label
              htmlFor={props?.state_name}
              className="text-[14px] mb-[5px] block"
            >
              {props?.title}
              {required ? " *" : ""}
            </label>
            <Input
              {...inputProps}
              className={`${fieldClass} ${
                error && errortype === "border" ? "!border-1 !border-[red]" : ""
              }`}
            />
            {error && errortype === "text" && (
              <div className="text-[12px] mt-[2px] text-red-600">{error}</div>
            )}
          </div>
        );
    }
  };

  return <>{renderInput()}</>;
}
