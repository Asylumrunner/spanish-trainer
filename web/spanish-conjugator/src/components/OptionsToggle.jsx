import { useEffect, useState } from "react";
import Options from "./Options"
import OptionsModalButton from "./OptionsModalButton"

function OptionsToggle() {
    const narrowWindowThreshold = 1024
    const [narrowWindow, setNarrowWindow] = useState(window.innerWidth < narrowWindowThreshold)

    const checkForNarrowToggle = (width) => {
      let resizeRequired = (width >= narrowWindowThreshold) === narrowWindow
      if (resizeRequired) {
        setNarrowWindow(!narrowWindow)
      }
    }

    useEffect(() => {
      function handleResize() {
        checkForNarrowToggle(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [narrowWindow])

    if (narrowWindow) {
        return <OptionsModalButton />
    } else {
        return <Options />
    }
}

export default OptionsToggle;