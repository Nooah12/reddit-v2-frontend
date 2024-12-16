'use client'

import { logOut } from "@/actions/log-out"
import { Button } from "./button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons"

export const LogOutButton = () => {
    return (
        <Button className="w-10 h-10 p-0 lg:w-auto lg:h-auto lg:py-2 lg:px-4 scale-75 lg:scale-100 flex items-center justify-center" 
            variant="primary" onClick={() => logOut()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="lg:![display:none]"/>
            <span className="hidden lg:inline">Log Out</span>
        </Button>
    )

}