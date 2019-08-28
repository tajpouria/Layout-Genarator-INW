import React, { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";

type Align = "inherit" | "left" | "center" | "right" | "justify";
type Color = "initial" | "inherit" | "primary" | "secondary" | "textPrimary" | "textSecondary" | "error";
type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | "srOnly" | "inherit";

interface IProps {
    children?: ReactNode;
    className?: string;
    align?: Align;
    color?: Color;
    variant?: Variant;
}

const TypographyWidget = ({ children, className, align, color, variant }: IProps) => {
    return (
        <Typography className={className} align={align || "inherit"} color={color || "initial"} variant={variant || "body1"}>
            {children}
        </Typography>
    );
};

export default TypographyWidget;
