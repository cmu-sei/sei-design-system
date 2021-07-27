export default async function (element: HTMLElement, position: number) {
  position = Math.round(position);

  if (element.scrollTop === position) {
    return;
  }

  let resolveFn;
  let timeoutId;

  const promise = new Promise((resolve) => {
    resolveFn = resolve;
  });

  const finished = () => {
    element.removeEventListener("scroll", scrollListener);
    resolveFn();
  };

  const scrollListener = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(finished, 100);
  };

  element.addEventListener("scroll", scrollListener);

  element.scrollTo({
    top: position,
    behavior: "smooth",
  });

  return promise;
}
