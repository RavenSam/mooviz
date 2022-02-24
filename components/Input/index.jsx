import React from "react"

export default function Input(props) {
   return (
      <input
         className="input"
         type={props.type}
         placeholder={props.placeholder}
         value={props.value}
         onChange={props.onChange ? (e) => props.onChange(e) : null}
      />
   )
}
