import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
interface CommonUserFormGroupProps {
    name: string;
    defaultValue: any;
    placeholder: string;
    title: string;
    type: string;
    inputRef?: React.Ref<HTMLInputElement>;
};

const CommonUserFormGroup: React.FC<CommonUserFormGroupProps> = ({type, title, placeholder, defaultValue, name, inputRef,}) => {

    return (
        <FormGroup>
            <Label>{title}</Label>
            <Input
                type={type as any}
                placeholder={placeholder}
                defaultValue={defaultValue}
                autoComplete="off"
                name={name}
                innerRef={inputRef}
            />
        </FormGroup>
    );
};

export default CommonUserFormGroup;


