import Slider from "./Slider";

export default () => {
  interface FreqMapping {
    [key: number]: string;
  }

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

  const getSliderValues = () => {
    const sliderValues = document.querySelectorAll("span[class=slider-value]");
    return Array.from(sliderValues);
  };

  const copyResultToClipboard = () => {
    const eqResult = document.getElementById("result");
    navigator.clipboard.writeText(eqResult?.innerHTML ?? "");
  };

  const sliders = [];
  for (let i = 0; i < 15; i++) {
    sliders.push(
      <Slider hz={freqs[i]} getSliderValues={getSliderValues} key={i} />
    );
  }

  return (
    <section className="main">
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
        <div className="result">
          <pre
            style={{ marginLeft: "4px", marginRight: "4px" }}
            id="result"
          ></pre>
          <div className="copy-to-clipboard" onClick={copyResultToClipboard}>
            <span
              style={{
                fontSize: 32,
                padding: "0.15em",
              }}
            >
              &#128203;
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
