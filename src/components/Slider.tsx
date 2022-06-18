import { SetStateAction, useEffect, useState } from "react";
import { getSliderValues } from "../services/LocalStorageService";
import { scale } from "../util";
import Knob from "./Knob";

interface ISliderState {
  hz: string;
  sliderId: number;
  setAllSliderValues: (values: string) => void;
}

export default (props: ISliderState) => {
  const [sliderValue, setSliderValue] = useState(0);
  const knob = document.getElementById(`knob-${props.sliderId}`);
  const slider = document.getElementById(`slider-${props.sliderId}`);

  useEffect(() => {
    const resultBar = document.getElementById("result")!;
    resultBar.innerHTML = getSliderValues()
      .map((value) => value.innerHTML + " ")
      .reduce((prev, curr) => {
        return `${prev} ${curr}`;
      }, "");
  }, [sliderValue]);

  if (slider !== null && knob) {
    const { y, height } = slider?.getBoundingClientRect();
    let relativeKnobPosition = scale(sliderValue, 1, -0.25, 0, height);
    relativeKnobPosition =
      relativeKnobPosition > height ? height : relativeKnobPosition;
    relativeKnobPosition = relativeKnobPosition < 0 ? 0 : relativeKnobPosition;

    knob.style.transform = `translateY(${
      relativeKnobPosition - y - knob.getBoundingClientRect().height
    }px)`;
  }

  return (
    <div>
      <div id={"slider-" + props.sliderId} className="slider">
        <Knob knobId={props.sliderId} setSlider={setSliderValue} />
      </div>
      <span className="slider-value">{sliderValue.toFixed(2)}</span>
      <br />
      <span className="freq-range">{props.hz}hz</span>
    </div>
  );
};
