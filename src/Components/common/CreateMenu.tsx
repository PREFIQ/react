import { useState } from "react";
import Button from "../Input/Button"; // Update import if needed
import { TextInput } from "../Input/TextInput";

type CreateMenuProps = {
  onClose: () => void;
  onAdd: (item: string) => void;
  defaultValue: string;
};

function CreateMenu({ onClose, onAdd, defaultValue }: CreateMenuProps) {
  const [newItem, setNewItem] = useState<string>(defaultValue);

  const handleAdd = () => {
    if (newItem.trim()) {
      onAdd(newItem.trim());
      setNewItem('');
      onClose();
    }
  };

  return (
    <div className='bg-black/80 w-full h-full fixed top-0 left-0 z-50 flex items-center justify-center'>
      <div className="w-[50%] bg-background text-foreground p-5 rounded-md shadow-md border-1 border-ring flex flex-col gap-5">
        <TextInput
          type="text"
          className="p-2 border border-gray-500 rounded-md"
          placeholder="Enter new item"
          value={newItem}
          err=""
          onChange={(e) => setNewItem(e.target.value)} id={""} label={"Product"}/>

        <div className="flex justify-end gap-5">
          <Button
            label="Cancel"
            onClick={onClose}
            className="bg-red-600 w-max text-gray-50" children={undefined}/>
          <Button
            label="Submit"
            onClick={handleAdd}
            className="bg-green-600 w-max text-gray-50" children={undefined}/>
        </div>
      </div>
    </div>
  );
}

export default CreateMenu;
