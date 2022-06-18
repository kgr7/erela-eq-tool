import { useState } from "react";
import Slider from "./Slider";
import SavePreset from "./SavePreset";
import PresetPanel from "./PresetPanel";
import { getSliderValues, IPreset } from "../services/LocalStorageService";
import { toggleClass } from "../util";

interface FreqMapping {
  [key: number]: string;
}

export default () => {
  const [showCopiedMessage, setShowCopiedMessage] = useState<boolean>(false);
  const [presets, setPresets] = useState<IPreset[]>();
  const [activePreset, setActivePreset] = useState<IPreset>();
  const [sliderValues, setSliderValues] = useState<number[]>(Array(15).fill(0));
  const [presetIsActive, setPresetIsActive] = useState<boolean>(false);

  const freqs: FreqMapping = {
    0: "25",
    1: "40",
    2: "62.5",
    3: "100",
    4: "160",
    5: "250",
    6: "400",
    7: "630",
    8: "1k",
    9: "1.6k",
    10: "2.5k",
    11: "4k",
    12: "6.4k",
    13: "10k",
    14: "16k",
  };

  const copyResultToClipboard = () => {
    const eqResult = document.getElementById("result");
    navigator.clipboard.writeText(eqResult?.innerHTML ?? "");
    toggleClass("resultBar", "fadeIn");
  };

  const sliders = [];
  for (let i = 0; i < 15; i++) {
    sliders.push(
      <Slider
        hz={freqs[i]}
        key={i}
        sliderId={i}
        activePreset={activePreset?.sliderValues[i] ?? 0}
        setSliderValues={setSliderValues}
        sliderValue={sliderValues[i]}
        setPresetIsActive={setPresetIsActive}
        presetIsActive
      />
    );
  }

  console.log("re render");

  return (
    <main>
      <section className="main-panel">
        <p className="main-text">
          Configure EQ presets for Discord music bots that use ErelaJS.
        </p>
        <p className="main-text">Copy to clipboard when you've finised.</p>
        <section className="eq-panel">{sliders}</section>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          className="result-container"
        >
          <div id="resultBar" className="result">
            <pre style={{ marginLeft: "4px", marginRight: "4px" }} id="result">
              {presetIsActive
                ? activePreset?.sliderValues.map(
                    (value) => " " + value.toFixed(2)
                  )
                : sliderValues.map((value) => " " + value.toFixed(2))}
            </pre>
            <div className="copy-to-clipboard" onClick={copyResultToClipboard}>
              <span
                style={{
                  fontSize: 32,
                  padding: "0.15em",
                }}
              >
                {showCopiedMessage ? "✅" : "📋"}
              </span>
            </div>
          </div>
        </div>
        <SavePreset setPresets={setPresets} />
      </section>
      <PresetPanel
        presets={presets!}
        setActivePreset={setActivePreset}
        setPresetIsActive={setPresetIsActive}
      />
    </main>
  );
};
