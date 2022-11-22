import React from "react"
const Region = props => {
  return (
    <section
      id={props.idProp || ""}
      className="region"
      style={
        props.bottomPadding && {
          paddingBottom: `${props.bottomPadding}`,
        }
      }
    >
      {props.children}
    </section>
  )
}

export default Region
