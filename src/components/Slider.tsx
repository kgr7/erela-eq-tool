import { SetStateAction, useEffect, useState } from "react";
import { scale } from "../util";
import Knob from "./Knob";

interface ISliderState {
  hz: string;
  sliderId: number;
  activePreset: number;
  setSliderValues: (value: SetStateAction<number[]>) => void;
  setPresetIsActive: (isActive: boolean) => void;
  sliderValue: number;
  presetIsActive: boolean;
}

export default (props: ISliderState) => {
  useEffect(() => {
    positionKnobFromValue();
    props.setPresetIsActive(false);
  }, []);

  useEffect(() => {
    positionKnobFromValue();
    props.setPresetIsActive(false);
  }, [props.activePreset]);

  const positionKnobFromValue = () => {
    const knob = document.getElementById(`knob-${props.sliderId}`);
    const slider = document.getElementById(`slider-${props.sliderId}`);

    if (slider !== null && knob) {
      const { y, height } = slider?.getBoundingClientRect();
      let relativeKnobPosition = scale(
        +props.activePreset.toFixed(2), // :/
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
        relativeKnobPosition - y - knob.getBoundingClientRect().height + 19
      }px)`;
    }
  };

  return (
    <div>
      <div id={"slider-" + props.sliderId} className="slider">
        <Knob knobId={props.sliderId} setSlider={props.setSliderValues} />
      </div>
      <span className="slider-value">
        {props.presetIsActive
          ? props.activePreset.toFixed(2)
          : props.sliderValue.toFixed(2)}
      </span>
      <br />
      <span className="freq-range">{props.hz}hz</span>
    </div>
  );
};
