import { useEffect, useState } from "react";
import Button from "../Input/Button";
import { TextArea } from "../Input/TextArea";
import Dropdown from "../Input/Dropdown";
import Switch from "../Input/switch";
import Checkbox from "../Input/checkbox";
import Alert from "../Alert/Alert";
import MultiCheckbox from "../Input/MultiCheckbox";
import PasswordInput from "../Input/passwordInput";
import { DatePicker } from "../Datepicker/Datepicker";
import FileUpload from "../Input/FileInput";
import DropdownRead from "../Input/Dropdown-read";
import FloatingInput from "../Input/FloatingInput";
import CommonTable, { type TableRowData } from "./commontable";
type FieldType = "textinput" | "textarea" | "dropdown" | "switch" | "checkbox" | "calendar" | "multicheckbox" | "password" | "date" | "file" | "dropdownread";

type Field = {
  className: string;
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
  errMsg: string;
};

type CommonFormProps = {
  fields: Field[];
  isPopUp: boolean;
  formName: string;
  formOpen: boolean;
  setFormOpen?: (open: boolean) => void;
  successMsg: string;
  faildMsg: string;
  initialData?: Record<string, any>;
  bulkData?: TableRowData[];
  onSubmit?: (data: any) => void;
};

function CommonForm({
  fields,
  isPopUp,
  formName,
  formOpen,
  setFormOpen,
  successMsg,
  faildMsg,
  initialData = {},
  bulkData,
  onSubmit
}: CommonFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "warning" | "update" | "delete">("success");
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
  if (bulkData) {
    setPreviewData(bulkData);
  } else {
    setPreviewData([]);
  }
}, [bulkData]);


//   const handleChange = (id: string, value: any) => {
//   setFormData((prev) => ({ ...prev, [id]: value }));

//   const field = fields.find((f) => f.id === id);
//   if (field) {
//     const error = validateField(field, value);
//     setFormErrors((prev) => ({ ...prev, [id]: error }));
//   }
// };
const handleChange = (id: string, value: any) => {
  setFormData((prev) => ({ ...prev, [id]: value }));
};



 const validateField = (field: Field, value: any): string => {
  const label = field.label.toLowerCase();

  if (
    (Array.isArray(value) && value.length === 0) ||   
    value === "" || value === undefined || value === null ||
    (typeof value === "boolean" && value === false)   
  ) {
    return field.errMsg;
  }

  if (label.includes("phone") && !/^[6-9]\d{9}$/.test(value)) return field.errMsg;
  if (label.includes("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return field.errMsg;

  return "";
};



  const triggerAlert = (type: "success" | "warning" | "update" | "delete", message: string) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // const handleSubmit = () => {
  //   const errors: Record<string, string> = {};
  //   fields.forEach((field) => {
  //     const value = formData[field.id];
  //     const error = validateField(field, value);
  //     if (error) errors[field.id] = error;
  //   });

  //   setFormErrors(errors);

  //   if (Object.keys(errors).length === 0) {
  //     onSubmit?.(formData); 
  //     triggerAlert("success", successMsg);
  //     setFormOpen?.(false);
  //     console.log("Form submitted:", formData);
  //   } else {
  //     console.log("Validation failed", errors);
  //   }
  // };

 const handleSubmit = () => {
  if (previewData.length === 0) {
    const errors: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData[field.id];
      const error = validateField(field, value);
      if (error) errors[field.id] = error;
    });

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    triggerAlert("warning", "No entries to submit.");
    return;
  }

  // Convert temp IDs to permanent unique IDs before submit
  const cleanedData = previewData.map((entry) => ({
    ...entry,
    id: `perm-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
  }));

  onSubmit?.(cleanedData);

  setPreviewData([]);
  setFormOpen?.(false);
  triggerAlert("success", successMsg);
};



  if (!formOpen) return null;

  const wrapperClass = isPopUp
    ? "bg-black/80 w-full h-full z-100 fixed top-0 left-0 z-50 flex backdrop-blur-sm items-center justify-center"
    : "";

  const containerClass = isPopUp
    ? "w-full m-5 lg:w-[50%] max-h-[90vh] overflow-y-auto bg-background scrollbar-hide text-foreground p-10 rounded-md shadow-md border border-ring flex flex-col gap-5"
    : "bg-background h-full m-5 lg:my-10 text-foreground p-5 rounded-md shadow-lg border border-ring flex flex-col gap-5";


   const [previewData, setPreviewData] = useState<TableRowData[]>([]);
const [editPreviewIndex, setEditPreviewIndex] = useState<number | null>(null);


const handleAdd = () => {
  const errors: Record<string, string> = {};
  fields.forEach((field) => {
    const value = formData[field.id];
    const error = validateField(field, value);
    if (error) errors[field.id] = error;
  });

  setFormErrors(errors);
  if (Object.keys(errors).length > 0) return;

  if (editPreviewIndex !== null) {
    const updated = [...previewData];
    updated[editPreviewIndex] = {
      ...updated[editPreviewIndex],
      ...formData,
      id: previewData[editPreviewIndex].id, // ✅ keep original ID
    };
    setPreviewData(updated);
    setEditPreviewIndex(null);
  } else {
    const entryWithId: TableRowData = {
      id: `temp-${Date.now()}`,
      ...formData,
    };
    setPreviewData((prev) => [...prev, entryWithId]);
  }

  setFormData({});
  setFormErrors({});
};




const handleEditPreviewRow = (index: number) => {
  const rowToEdit = previewData[index];
  const sanitizedRow = fields.reduce((acc, field) => {
    acc[field.id] = rowToEdit[field.id] ?? "";
    return acc;
  }, {} as Record<string, any>);

  setFormData(sanitizedRow);
  setEditPreviewIndex(index);
};


  return (
    <div className={wrapperClass}>
      <div className={containerClass}>
        <h1 className="text-lg mb-5">{formName} Form</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
             {fields.map((field) => {
              const err = formErrors[field.id] || "";
              const value = formData[field.id] || "";

              switch (field.type) {
                case "textinput":
                  return (
                    <FloatingInput
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      type="text"
                      placeholder={`Enter ${field.label}`}
                      value={value}
                      err={err}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className={`p-2 border border-gray-500 rounded-md ${field.className}`}
                    />
                  );
                case "textarea":
                  return (
                    <TextArea
                      key={field.id}
                      id={field.id}
                      label={field.label}
                      placeholder={`Enter ${field.label}`}
                      value={value}
                      err={err}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                      className={`p-2 border border-gray-500 rounded-md ${field.className}`}
                    />
                  );
                case "dropdown":
                  return (
                    <Dropdown
                      key={field.id}
                      id={field.id}
                      items={field.options || []}
                      placeholder={`Select ${field.label}`}
                      label={field.label}
                      onChange={(val) => handleChange(field.id, val)}
                      err={err}
                      className={`border-gray-400 w-full rounded-md p-2 ${field.className}`}
                    />
                  );
                  case "dropdownread":
                  return (
                    <DropdownRead
                      key={field.id}
                      id={field.id}
                      items={field.options || []}
                      placeholder={`Select ${field.label}`}
                      label={field.label}
                      onChange={(val) => handleChange(field.id, val)}
                      err={err}
                      className={`border-gray-400 w-full rounded-md p-2 ${field.className}`}
                    />
                  );
                case "switch":
                  return (
                    <Switch
                      key={field.id}
                      id={field.id}
                      agreed={!!value}
                      label={!!value ? "Active" : "Inactive"}
                      onChange={(checked) => handleChange(field.id, checked)}
                    />
                  );
                case "checkbox":
                  return (
                  <Checkbox
                    key={field.id}
                    id={field.id}
                    agreed={!!value}
                    label={field.label}
                    err={err}
                    onChange={(checked) => handleChange(field.id, checked)}
                    className={`p-2 border border-gray-500 rounded-md ${field.className}`}
                  />

                  );
                case "multicheckbox":
                  return (
                  <MultiCheckbox
                      key={field.id}
                      id={field.id}
                      options={field.options || []}
                      value={value || []}
                      err={err}
                      className={field.className}
                      label={field.label}
                      onChange={(newSelected) => handleChange(field.id, newSelected)}
                    />

                  );

              case "date":
                return (
                 <DatePicker
                    key={field.id}
                    id={field.id}
                    label={field.label}
                    model={value ? new Date(value) : undefined}
                    formatStr="MMM dd, yyyy"
                    err={err}
                    onChange={(date) => handleChange(field.id, date)}
                    className={field.className}
                  />

                );

                case "password":
                  return (
                    <PasswordInput
                      id={field.id}
                      label={`Enter ${field.label}`}
                      value={value}
                      error={err}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                  );
                  case "file":
                  return (
                    <FileUpload
                      key={field.id}
                        />
                  );
                default:
                  return null;
              }
            })}
        </div>

        <div className="flex justify-end gap-5 mt-4">
          <Button
            label="Add"
            className="bg-create w-max text-create-foreground"
            onClick={handleAdd}
            children={undefined}
          />
        </div>

        {/* show user enter data */}
        <CommonTable
          head={["id", ...fields.map((f) => f.id), "Action"]}
          body={previewData.map((entry, i) => {
            const row: TableRowData = {
          ID: entry.id, // used for display

          ...fields.reduce((acc, field) => {
            if (field.id !== "ID") {
              acc[field.id] = entry[field.id] ?? "";
            }
            return acc;
          }, {} as TableRowData),

          Action: (
            <div className="flex gap-2">
              <button
                onClick={() => handleEditPreviewRow(i)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
            </div>
          ),
        };

            return row;
          })}
          onEdit={() => {}}
          currentPage={1}
          rowsPerPage={10}
          totalCount={previewData.length}
          onPageChange={() => {}}
        />


      <div className="flex justify-end gap-5 mt-4">
          <Button
            label="Cancel"
            className="bg-delete text-create-foreground w-max"
            onClick={() => {
              setFormData({});
              setFormErrors({});
               setPreviewData([]);
              triggerAlert("delete", faildMsg);
              setFormOpen?.(false);
            }}
            children={undefined}
          />
          <Button
            label="Submit"
            className="bg-create w-max text-create-foreground"
            onClick={handleSubmit}
            children={undefined}
          />
        </div>
      </div>

    <div className="absolute top-0 right-0">
        <Alert
        type={alertType}
        message={alertMessage}
        show={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
    </div>

    </div>
  );
}

export default CommonForm;
