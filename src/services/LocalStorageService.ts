export interface IPreset {
    name: string,
    sliderValues: number[]
}

const save = (name: string): void => {
    const sliderValues: number[] = getSliderValues()
      .map((item) => parseFloat(item.innerHTML));

    let currentItems: Array<object> = JSON.parse(localStorage.getItem("presets") ?? "[]") ?? [];
    currentItems.push({name: name, sliderValues});
    localStorage.setItem("presets", JSON.stringify(currentItems));
}

const readAll = (): IPreset[] | null => {
    try {
        const presets: string = localStorage.getItem("presets") ?? "";
        return JSON.parse(presets);
    }
    catch {
        return null;
    }
}

const read = (name: string): IPreset | null => {
    try {
        const presets = JSON.parse(localStorage.getItem("presets") ?? "") as IPreset[];
        return presets.find((preset) => preset.name == name) ?? null;
    }
    catch {
        return null;
    }
}

const getSliderValues = (): Array<Element> => {
    const sliderValues = document.querySelectorAll("span[class=slider-value]");
    return Array.from(sliderValues);
  };

export { save, readAll, getSliderValues };
