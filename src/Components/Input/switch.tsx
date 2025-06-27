import { SwitchComponent } from "./switchComponent"

interface SwitchProps {
  id: string
  agreed: boolean
  label: string
  onChange: (checked: boolean) => void
}

function Switch({ id, agreed, label, onChange }: SwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <SwitchComponent
        id={id}
        checked={agreed}
        onCheckedChange={onChange}
      />
      <label htmlFor={id} className="bg-background text-foreground cursor-pointer">
        {label}
      </label>
    </div>
  )
}

export default Switch


  // usage
  //   const [agreed, setAgreed] = useState(false);
  // <Switch
  //             id="terms"
  //             agreed={agreed}
  //             label={ agreed? " Active" : "Inactive" }
  //             onChange={(checked) => setAgreed(checked)}
  //           />