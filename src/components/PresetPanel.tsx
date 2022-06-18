import { useEffect, useState } from "react";
import { readAll, IPreset } from "../services/LocalStorageService";
import Preset from "./Preset";

interface IPresetPanel {
  presets: IPreset[];
  setActivePreset: (preset: IPreset) => void;
  setPresetIsActive: (isActive: boolean) => void;
}

export default (props: IPresetPanel) => {
  const [loadedPresets, setLoadedPresets] = useState<IPreset[]>();

  useEffect(() => {
    setLoadedPresets(readAll() ?? []);
  }, []);

  const eagerRenderNewPreset = () => {
    if (props.presets)
      return props.presets.map((preset) => {
        return (
          <Preset
            key={null}
            preset={preset}
            setActivePreset={props.setActivePreset}
            setPresetIsActive={props.setPresetIsActive}
          />
        );
      });
  };

  const getPresets = () => {
    if (loadedPresets)
      return loadedPresets?.map((preset, i) => {
        return (
          <Preset
            key={i}
            preset={preset}
            setActivePreset={props.setActivePreset}
            setPresetIsActive={props.setPresetIsActive}
          />
        );
      });
  };

  return (
    <section id="savePresetPanel" className="main-panel preset-panel">
      <div className="center">
        {eagerRenderNewPreset()}
        {getPresets()}
      </div>
    </section>
  );
};
