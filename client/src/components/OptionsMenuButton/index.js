import React from "react"

function OptionsMenuButton() {

  return (
    <button type="button" class="btn btn-sm btn-dark mt-2" data-toggle="modal" data-target="#options-menu-modal">
        OPTIONS 
        {/* <i class="fas fa-cog"></i> */}
    </button>
  )
}

export default OptionsMenuButton;