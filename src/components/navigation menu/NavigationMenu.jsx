import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { CgNotes } from "react-icons/cg";
import "./NavigationMenu.css";
const NavigationMenu = () => {
  return (
    <div className="navigation-menu">
      <IoMusicalNotesOutline className="navigation-icon"/>
      <CgNotes className="navigation-icon"/>
      <IoSettingsOutline className="navigation-icon" />

    </div>
  )
}

export default NavigationMenu
