import PropTypes from "prop-types"

export default function Button(props) {
   return (
      <button className={`btn ${props.className}`} onClick={props.onClick ? () => props.onClick() : null}>
         {props.children}
      </button>
   )
}

export const OutlineButton = (props) => (
   <Button className={`btn-outline ${props.className}`} onClick={props.onClick ? () => props.onClick() : null}>
      {props.children}
   </Button>
)

Button.propTypes = {
   onClick: PropTypes.func,
}
