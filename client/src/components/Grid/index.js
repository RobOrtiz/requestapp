import React from "react";
import './styles.css'

export function Container({ classes, children }) {
    return <div className={`container ${classes}`}>{children}</div>;
}

export function Row({children}) {
    return <div className="row">{children}</div>
}

export function Col({children}) {
    return <div className="col">{children}</div>
}