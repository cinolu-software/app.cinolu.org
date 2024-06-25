import { CommonUserFormGroupType } from "@/Types/UserType";
import { FormGroup, Input, Label } from "reactstrap";
import React from "react";

interface CommonUserFormGroupProps extends CommonUserFormGroupType {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CommonUserFormGroup: React.FC<CommonUserFormGroupProps> = ({ type, title, placeholder, defaultValue, row, onChange }) => {
    return (
        <FormGroup>
            <Label check>{title}</Label>
            <Input type={type} placeholder={placeholder} defaultValue={defaultValue} rows={row} autoComplete="" onChange={onChange} />
        </FormGroup>
    );
};

export default CommonUserFormGroup;

