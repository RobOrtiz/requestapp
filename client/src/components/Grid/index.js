import React from "react";

export function Container({children }) {
    return <div className="container mt-5 pt-5">{children}</div>;
}

export function Row({children}) {
    return <div className="row">{children}</div>
}

export function Col({children}) {
    return <div className="col">{children}</div>
}