import React from "react";
import './styles.css'

export function Container({ classes, children }) {
    return <div className={classes ? `container-fluid ${classes}` : `container-fluid`}>{children}</div>
}

export function Row({ classes, children }) {
    return <div className={classes ? `row ${classes}` : `row`}>{children}</div>
}

export function Col({ size, classes, children }) {

    if (size) {
        return (
            <div
                className={classes ? `${size
                .split(" ")
                .map(size => "col-" + size)
                .join(" ")} ${classes}` : `${size
                    .split(" ")
                    .map(size => "col-" + size)
                    .join(" ")} `}
            >
                {children}
            </div>
        )
    } else {
        return <div className={classes ? `col ${classes}` : `col`}>{children}</div>
    }


}