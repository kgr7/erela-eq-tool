import { BarChart, YAxis, Bar } from "recharts";
import { IPreset } from "../services/LocalStorageService";

interface IPresetProps {
  key: number | null;
  preset: IPreset;
  setActivePreset: (preset: IPreset) => void;
  setPresetIsActive: (isActive: boolean) => void;
}

export default (props: IPresetProps) => {
  const onClick = () => {
    props.setPresetIsActive(true);
    props.setActivePreset(props.preset);
  };

  return (
    <div key={props.key} className="preset-item" onClick={onClick}>
      <BarChart
        width={255}
        height={100}
        data={props.preset.sliderValues.map((value) => {
          return { pv: value + 0.01 };
        })}
      >
        <YAxis hide domain={[-0.25, 1]} />
        <Bar dataKey="pv" fill="#560d91" />
      </BarChart>
      <h4 style={{ marginTop: "0px" }}>{props.preset.name}</h4>
    </div>
  );
};
