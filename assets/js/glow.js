/*!
 * tailwind-mouse-glow by @justalever - https://github.com/justalever/tailwind-mouse-glow
*/

// https://stackoverflow.com/questions/1480133/how-can-i-get-an-objects-absolute-position-on-the-page-in-javascript
function cumulativeOffset(element) {
  let top = 0, left = 0

  do {
    top += element.offsetTop || 0
    left += element.offsetLeft || 0
    element = element.offsetParent
  } while (element)

  return { top: top, left: left }
}

export function addEventListenerToCaptures() {
  const captures = document.querySelectorAll(".glow-capture")

  captures.forEach((capture) => {
    // Clone a child element. For example, we can clone the first child.
    const clonedChild = capture.children[0].cloneNode(true)
    const overlay = capture.querySelector(".glow-overlay")

    // Prevent event listener duplicates
    if (!overlay || overlay.childNodes.length > 0) {
      return
    }

    // Append the cloned child to the overlay.
    overlay.appendChild(clonedChild)

    capture.addEventListener("mousemove", (event) => {

      // const x = event.pageX - capture.offsetLeft
      // const y = event.pageY - capture.offsetTop

      // Cumulative offset in case of deep relative bullshit
      const offset = cumulativeOffset(capture)
      const x = event.pageX - offset.left
      const y = event.pageY - offset.top

      overlay.style.setProperty("--glow-x", `${x}px`)
      overlay.style.setProperty("--glow-y", `${y}px`)
      overlay.style.setProperty("--glow-opacity", "1")
    })

    // Add mouseleave event to remove the glow effect
    capture.addEventListener("mouseleave", () => {
      overlay.style.setProperty("--glow-opacity", "0")
    })
  })
}
