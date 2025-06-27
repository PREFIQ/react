import CommonForm from '@/Components/common/commonform';

function CheckboxComponent() {
  const initialData = {
    conditions: false,
    gender: [],
  };
  return (
    <div  className='w-[100%]'>
        <CommonForm fields={[ 
            { id: "conditions", label: "Conditions", type: "checkbox", className: "", errMsg:"Enter Product Name" },
            { id: "gender", label: "Gender", options: ["Male", "Female", "Other"], type: "multicheckbox", className: "w-[100%]", errMsg: "Select at least one gender" }
        ]} 
        isPopUp={false} 
        formName={''} 
        formOpen={true} 
        successMsg={'Successfully Submit'} 
        faildMsg={'Clear all Field'}        
         initialData={initialData} 
        />
    </div>
  )
}

export default CheckboxComponent