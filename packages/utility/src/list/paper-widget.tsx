import React, { ReactNode } from "react";
import Paper from "@material-ui/core/Paper";

interface IProps {
    children?: ReactNode;
    className?: string;
    elevation?: number;
    square?: boolean;
}

const PaperWidget = ({ children, className, elevation, square }: IProps) => {
    return (
        <Paper className={className} elevation={elevation || 1} square={square || false}>
            {children}
        </Paper>
    );
};

export default PaperWidget;
