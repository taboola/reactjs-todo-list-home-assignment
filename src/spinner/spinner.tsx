import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

export function Spinner({text, label, className}) {
    return <div className={className} aria-label={label}><CircularProgress/>{text}</div>
}