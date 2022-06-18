import { FormEvent, useState, SetStateAction } from "react";
import {
  IPreset,
  getSliderValues,
  save as localSave,
} from "../services/LocalStorageService";
import { toggleClass } from "../util";

interface ISavePreset {
  setPresets: (value: SetStateAction<IPreset[] | undefined>) => void;
}

export default (props: ISavePreset) => {
  const [presetName, setPresetName] = useState<string>("");

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    setPresetName(input.value);
  };

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!presetName.length) {
      toggleClass("presetName", "input-error");
      return;
    }

    props.setPresets((prevState: IPreset[] | undefined) => {
      return [
        {
          name: presetName,
          sliderValues: getSliderValues().map((item) =>
            parseFloat(item.innerHTML)
          ),
        },
        ...(prevState ?? []),
      ];
    });
    localSave(presetName);
    setPresetName("");
  };

  return (
    <div className="save-preset">
      <form onSubmit={save}>
        <input
          placeholder="name"
          id="presetName"
          type="text"
          onChange={handleChange}
          value={presetName}
        />
        <input id="savePresetBtn" type="submit" value="Save" />
      </form>
    </div>
  );
};
