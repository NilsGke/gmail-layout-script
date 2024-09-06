export default function waitForElementChange(
  target: Node,
  callback: (mutations: MutationRecord[]) => void
) {
  var observer = new MutationObserver((mutations) => callback(mutations));

  var config = {
    childList: true,
    subtree: true,
    characterData: true,
  };

  observer.observe(target, config);
}

// function (mutations) {
//   mutations.forEach(function (mutation) {
//     if (mutation.removedNodes.length) {
//       console.log("removed nodes", mutation.removedNodes[0].nodeValue);
//       alert("removed nodes");
//     }

//     if (mutation.addedNodes.length) {
//       alert("added nodes");
//       console.log("added nodes", mutation.addedNodes[0].nodeValue);
//     }
//   });
// }
