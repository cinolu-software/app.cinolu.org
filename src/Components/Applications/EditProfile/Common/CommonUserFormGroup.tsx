import { CommonUserFormGroupType } from "@/Types/UserType";
import { FormGroup, Input, Label } from "reactstrap";
import React from "react";

interface CommonUserFormGroupProps extends CommonUserFormGroupType {
    name : string,
    defaultValue: string
    placeholder: string
    title: string
    type: any
}

const CommonUserFormGroup: React.FC<CommonUserFormGroupProps> = ({ type, title, placeholder, defaultValue, name }) => {
    return (
        <FormGroup>
            <Label check>{title}</Label>
            <Input type={type} placeholder={placeholder} defaultValue={defaultValue}  autoComplete="off" name={name} />
        </FormGroup>
    );
};

export default CommonUserFormGroup;

