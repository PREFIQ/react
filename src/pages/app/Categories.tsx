import CommonForm from '@/Components/common/commonform'

function Categories() {
   const initialData = {
    name: '',
    category: '',
    details: '',
    brand: '',
    dob: null,
  };
  return (
    <div className='w-full'>
      <CommonForm
        fields={[
          { id: "name", label: "Product Name", type: "textinput", className: "w-full", errMsg:"Enter Product Name" },
          { id: "email", label: "email", type: "textinput", className: "w-full", errMsg:"Enter Email ID" },
          { id: "phone", label: "phone", type: "textinput", className: "w-full", errMsg:"Enter Phone" },
          { id: "category", label: "Category Name", type: "textinput", className: "w-full", errMsg:"Enter Category Name" },
          { id: "brand", label: "Brand", type: "dropdown", options: ["Apple", "Samsung"], className: "", errMsg:"brand didnt empty" },
          { id: "dob", label: "Date of Birth", type: "date", className: "", errMsg:"choose date" },
          { id: "password", label: "Password", type: "password", className: "w-full", errMsg:"minimum 8 char" },
          { id: "file", label: "Image", type: "file", className: "", errMsg:"upload image" },
          { id: "details", label: "details", type: "textarea", className: "", errMsg:" Enter About YourSelf" },

        ]}
        isPopUp={false}
        formName="Sample"
        formOpen={true}
        successMsg="from Cat"
        faildMsg="From cat failed"
        initialData={initialData} 

      />
     
    </div>
  );
}

export default Categories;
