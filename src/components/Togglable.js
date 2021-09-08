import React, { useImperativeHandle, useState } from "react"

const Togglable = React.forwardRef((props, ref) => {
    const [loginVisible, setLoginVisible] = useState(false)

    const whileLoginHidden = {display: loginVisible ? 'none' : ''}
    const whileLoginVisible = {display: loginVisible ? '' : 'none'}

    const toggleVisibility = () => {
      setLoginVisible(!loginVisible)
    }

    useImperativeHandle(ref, () => {
      return {
        toggleVisibility
      }
    })

    return (
      <div>
        <div style={whileLoginHidden}>
          <button onClick={toggleVisibility}>{props.buttonlabel}</button>
        </div>
        <div style={whileLoginVisible}>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    )
})

export default Togglable