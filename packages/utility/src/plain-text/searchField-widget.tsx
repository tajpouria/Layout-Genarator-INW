import React, { ChangeEvent, KeyboardEvent } from "react";
import TextField from "@material-ui/core/TextField";

type Margin = "none" | "dense" | "normal";

interface IProps {
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    className?: string;
    label?: string;
    margin?: Margin;
    autoFocus?: boolean;
    disabled?: boolean;
    error?: boolean;
    placeholder?: string;
    required?: boolean;
}

const SearchFieldWidget = ({ className, label, margin, autoFocus, disabled, error, placeholder, required, value, onChange, onKeyDown, name }: IProps) => {
    return (
        <TextField
            type="search"
            id="standard-search"
            className={className}
            label={label || ""}
            margin={margin || "normal"}
            autoFocus={autoFocus || false}
            disabled={disabled || false}
            error={error || false}
            placeholder={placeholder || ""}
            required={required || false}
            value={value}
            name={name}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};

export default SearchFieldWidget;
