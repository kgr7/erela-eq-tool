const scale = (
    number: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number => {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

const toggleClass = (target: string, className: string) => {
  const element: HTMLElement | null = document.getElementById(target);
  if (element) {
    element.classList.add(className);
    element.onanimationend = () => {
      element.classList.remove(className);
    };
  }
};

export { scale, toggleClass }
  