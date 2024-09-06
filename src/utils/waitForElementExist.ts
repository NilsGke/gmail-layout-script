export default function waitForElementExist<T extends HTMLElement>(
  selector: string
) {
  return new Promise<T | null>((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector<T>(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector<T>(selector));
      }
    });

    // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
