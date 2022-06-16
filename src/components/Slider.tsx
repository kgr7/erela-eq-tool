import { useEffect, useState } from "react";
import Knob from "./Knob";

export default (props: any) => {
  const [sliderValue, setSliderValue]: any = useState<number>(0);

  useEffect(() => {
    let result = document.getElementById("result")!;
    result.innerHTML =
      "[" +
      `${props
        .getSliderValues()
        .map((value: any) => " " + value.innerHTML)}`.trimStart() +
      "]";
  }, [sliderValue]);

  return (
    <div>
      <div className="slider">
        <Knob setSlider={setSliderValue} />
      </div>
      <span className="slider-value">{sliderValue.toFixed(3)}</span>
      <br />
      <span className="freq-range">{props.hz}hz</span>
    </div>
  );
};
