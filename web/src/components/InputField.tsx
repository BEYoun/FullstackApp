import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';
import React, {InputHTMLAttributes} from 'react'

type InuptFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    placeholder: string;
    label: string;
}

const InuptField: React.FC<InuptFieldProps> = ({size,...props}) => {
    const [field, {error}] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input {...field} {...props} id={field.name} placeholder={props.placeholder} />
            {error?<FormErrorMessage>{error}</FormErrorMessage>: null}
        </FormControl>
    );
}

export default InuptField;