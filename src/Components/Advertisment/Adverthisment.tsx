import { useState } from "react";
import ImageButton from "../Button/ImageBtn";

function Adverthisment() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="ad-container flex items-center justify-between bg-foreground/10 px-4 py-2">
      <div className="scroll-wrapper overflow-hidden whitespace-nowrap flex-1">
        <div className="ad-text inline-block font-bold">
          🚀 Welcome to LogicX! Enjoy smooth modern experiences. 🎉
        </div>
      </div>

      <ImageButton
        className="text-delete bg-foreground/10 p-2 hover:bg-delete hover:text-delete-foreground ml-2"
        icon="close"
        onClick={() => setVisible(false)}
      />
    </div>
  );
}

export default Adverthisment;
