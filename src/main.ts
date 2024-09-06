import "./style.css";

import { trustedTypes as tt } from "trusted-types";
import waitForElementExist from "./utils/waitForElementExist";
import waitForElementChange from "./utils/waitForElementChange";
import SidebarToggleIcon from "./assets/SidebarToggleIcon.svg";

const previewPaneSelector = "#\\:1h";
const buttonBarSelector =
  "#\\:1 > div > div.bGI.nH.oy8Mbf.aE3.S4 > div.D.E.G-atb > div.nH.aqK > div.Cr.aqJ";

console.log("%c> gmail-fix-layout", "background:purple");

const trustedTypes = window.trustedTypes || tt;

const escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
  createHTML: (to_escape: string) => to_escape,
});

console.log(escapeHTMLPolicy);

// show and hide preview pane
await waitForElementExist(previewPaneSelector).then((previewPane) => {
  if (previewPane === null)
    throw Error(
      "> GMAIL-FIX-LAYOUT: could not find previewPane element - should be there though"
    );

  // on every children change, check if an email is opened
  waitForElementChange(previewPane, () => {
    if (previewPane.innerText.includes("Keine Konversationen ausgewählt"))
      previewPane.classList.add("previewPaneHidden");
    else previewPane.classList.remove("previewPaneHidden");
    previewPane.style.height = "100%";
  });
});

// add "close preview button" to top bar
waitForElementExist(buttonBarSelector).then((buttonBar) => {
  if (buttonBar === null)
    throw Error(
      "> GMAIL-FIX-LAYOUT: could not find buttonBar element - should be there though"
    );

  const buttonElm = document.createElement("div");
  buttonElm.id = "toggleSidebarButtonContainer";

  buttonElm.innerHTML = escapeHTMLPolicy.createHTML(`
      <button>
        <img src="${SidebarToggleIcon}" alt="toggleSidebar" title="toggle sidebar"/>
      </button>
    `) as unknown as string; // need to overwrite type because ts does not know how to assign `safeHTML` to `string`

  buttonElm.addEventListener("click", () => {
    const previewPane = document.querySelector(previewPaneSelector);
    if (previewPane === null)
      throw Error("> GMAIL-FIX-LAYOUT: could not find previewPane");
    previewPane.classList.toggle("previewPaneHidden");
  });

  buttonBar.appendChild(buttonElm);
});
