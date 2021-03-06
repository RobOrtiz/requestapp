import React from "react";
import './styles.css'

export function Container({ classes, children }) {
    return <div className={classes ? `container-fluid ${classes}` : `container-fluid`}>{children}</div>
}

export function Row({ classes, children }) {
    return <div className={classes ? `row ${classes}` : `row`}>{children}</div>
}

export function Col({ classes, children }) {
    return <div className={classes ? `col ${classes}` : `col`}>{children}</div>
}