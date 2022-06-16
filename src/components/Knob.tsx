import React, { useEffect, useRef } from "react";
import { transform } from "typescript";

export default (props: any) => {
  const elemRef: any = useRef(null);
  const dragProps: any = useRef();

  const initialiseDrag = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;
    const knob = event.target as HTMLElement;
    const { offsetTop, offsetLeft } = knob;
    const { left, top } = elemRef.current.getBoundingClientRect();

    const slider = knob.parentElement as HTMLElement;
    const sliderTop = slider.getBoundingClientRect().top;
    const sliderMaxHeight = sliderTop;
    const sliderMinHeight = sliderTop + slider?.offsetHeight;

    dragProps.current = {
      maxY: sliderMaxHeight,
      minY: sliderMinHeight,
      dragStartLeft: left - offsetLeft,
      dragStartTop: top - offsetTop,
      dragStartX: clientX,
      dragStartY: clientY,
    };
    window.addEventListener("mousemove", startDragging, false);
    window.addEventListener("mouseup", stopDragging, false);
  };

  const startDragging = ({ clientY }: any) => {
    if (clientY < dragProps.current.maxY) {
      clientY = dragProps.current.maxY;
    }

    if (clientY > dragProps.current.minY) {
      clientY = dragProps.current.minY;
    }

    elemRef.current.style.transform = `translate(${
      dragProps.current.dragStartLeft
    }px, ${
      dragProps.current.dragStartTop + clientY - dragProps.current.dragStartY
    }px)`;
  };

  const stopDragging = () => {
    window.removeEventListener("mousemove", startDragging, false);
    window.removeEventListener("mouseup", stopDragging, false);
  };

  const scale = (
    number: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number => {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  const getSliderValue = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const element = event.target as HTMLElement;
    const { top, bottom }: any = element.parentElement?.getBoundingClientRect();
    const lengthOfSlider =
      bottom - top - element.getBoundingClientRect().height;
    const knobRelativeY = element.getBoundingClientRect().y - top;
    let db = scale(knobRelativeY, lengthOfSlider, 0, -0.25, 1);
    db = db > 1 ? 1 : db;
    db = db < -0.25 ? -0.25 : db;

    props.setSlider(db);
  };

  return (
    <div
      className="knob"
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        initialiseDrag(e)
      }
      onMouseMove={(e) => getSliderValue(e)}
      ref={elemRef}
      style={{ transform: "translate(0px, 129px)" }}
    ></div>
  );
};
