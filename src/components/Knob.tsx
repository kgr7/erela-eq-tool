import React, { useRef } from "react";
import { scale } from "../util";

interface IKnobState {
  knobId: number;
  setSlider: (db: number) => void;
}

interface IDragProps {
  maxY: number;
  minY: number;
  dragStartLeft: number;
  dragStartTop: number;
  dragStartY: number;
}

interface IStartDrag {
  clientY: number;
}

export default (props: IKnobState) => {
  const elemRef = useRef<HTMLDivElement>(null);
  const dragProps = useRef<IDragProps>();

  const initialiseDrag = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { clientY } = event;
    const knob = event.target as HTMLElement;
    const { offsetTop, offsetLeft } = knob;
    const { left, top } = elemRef?.current?.getBoundingClientRect() as DOMRect;

    const slider = knob.parentElement as HTMLElement;
    const sliderTop = slider.getBoundingClientRect().top;
    const sliderMaxHeight = sliderTop;
    const sliderMinHeight = sliderTop + slider?.offsetHeight;

    dragProps.current = {
      maxY: sliderMaxHeight,
      minY: sliderMinHeight,
      dragStartLeft: left - offsetLeft,
      dragStartTop: top - offsetTop,
      dragStartY: clientY,
    };
    window.addEventListener("mousemove", startDragging, false);
    window.addEventListener("mouseup", stopDragging, false);
  };

  const startDragging = ({ clientY }: IStartDrag) => {
    if (clientY < dragProps.current!.maxY) clientY = dragProps.current!.maxY;
    if (clientY > dragProps.current!.minY) clientY = dragProps.current!.minY;

    elemRef!.current!.style!.transform = `translate(${
      dragProps.current!.dragStartLeft
    }px, ${
      dragProps.current!.dragStartTop + clientY - dragProps.current!.dragStartY
    }px)`;
  };

  const stopDragging = () => {
    window.removeEventListener("mousemove", startDragging, false);
    window.removeEventListener("mouseup", stopDragging, false);
  };

  const getSliderValue = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const element = event.target as HTMLElement;
    const { top, bottom } =
      element.parentElement?.getBoundingClientRect() as DOMRect;

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
      id={`knobId-${props.knobId}`}
      className="knob"
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        initialiseDrag(e)
      }
      onMouseMove={(e) => getSliderValue(e)}
      ref={elemRef}
      style={{ transform: "translate(0px, 115px)" }}
    ></div>
  );
};
