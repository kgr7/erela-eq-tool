import { useEffect, useState } from "react";
import { scale } from "../util";
import Knob from "./Knob";

interface ISliderState {
  hz: string;
  sliderId: number;
  getSliderValues: () => Array<Element>;
}

export default (props: ISliderState) => {
  const [sliderValue, setSliderValue] = useState(0 as number);

  useEffect(() => {
    positionKnobFromValue();
  }, []);

  useEffect(() => {
    let result = document.getElementById("result")!;
    console.log(props.getSliderValues()[0]);
    result.innerHTML = `${props
      .getSliderValues()
      .map((value: Element) => " " + value.innerHTML)}`.replaceAll(",", "");
  }, [sliderValue]);

  const positionKnobFromValue = () => {
    const knob = document.getElementById(`knob-${props.sliderId}`);
    const slider = document.getElementById(`slider-${props.sliderId}`);

    if (slider !== null && knob) {
      const { x, y, height } = slider?.getBoundingClientRect();
      let relativeKnobPosition = scale(
        +sliderValue.toFixed(2), // :/
        1,
        -0.25,
        0,
        height
      );
      relativeKnobPosition =
        relativeKnobPosition > height ? height : relativeKnobPosition;
      relativeKnobPosition =
        relativeKnobPosition < 0 ? 0 : relativeKnobPosition;

      knob.style.transform = `translateY(${
        relativeKnobPosition - y - knob.getBoundingClientRect().height - 7.5
      }px)`;
    }
  };

  return (
    <div>
      <div id={"slider-" + props.sliderId} className="slider">
        <Knob knobId={"knob-" + props.sliderId} setSlider={setSliderValue} />
      </div>
      <span className="slider-value">{sliderValue.toFixed(2)}</span>
      <br />
      <span className="freq-range">{props.hz}hz</span>
    </div>
  );
};
