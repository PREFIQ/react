import Dropdown from "@/Components/Input/Dropdown"
import DropdownRead from "@/Components/Input/Dropdown-read"
import { useState } from "react";

function ComboboxComponents() {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  console.log(`${selectedItem} ${selectedItems} from ComboboxComponents`)

  return (
    <div>
        <div className="flex flex-col gap-5 p-5">
          <div>Choose single value with create option</div>
            <Dropdown
              id="brand"
              items={["Apple", "Dell", "Samsung"]}
              placeholder="Choose brand..."
              label="brand"
              className="w-full"
              err=""
              onChange={(val) => console.log("Selected:", val)}
            />
            <div>Choose Multiple value with create option</div>

            <Dropdown
              id="devices"
              multiple
              items={["iPhone", "iPad", "MacBook"]}
              placeholder="Select devices"
              className="w-full"
              err=""
              label="brand"
              onChange={(val) => console.log("Selected:", val)}
            />
            <div>Choose single value without create option</div>

            <DropdownRead
              id="multivalue"
              items={["Apple", "Banana", "Cherry", "Date"]}
              placeholder="Select a fruit"
              label="brand"
              className="w-full"
               err=""
              onChange={(value) => {
                if (typeof value === "string") setSelectedItem(value);
              }}
            />

            <div>Choose multiple value without create option</div>


            <DropdownRead
              id="singlevalue"
              multiple
              items={["Apple", "Banana", "Cherry", "Date"]}
              label="brand"
              placeholder="Select fruits"
              className="w-full"
               err=""
              onChange={(value) => {
                if (Array.isArray(value)) setSelectedItems(value);
              }}
            />

             
          
        </div>
    </div>
  )
}

export default ComboboxComponents