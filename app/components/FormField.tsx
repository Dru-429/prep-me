import React from 'react'
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Control, Path } from 'react-hook-form'

interface FormFieldProps {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder: string;
    type?: 'text' | 'email' | 'password' | 'file';
}

const FormField = ( { control, name, label, placeholder, type ="text" } :FormFieldProps<T> ) => (

    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormItem >
                <FormLabel className={label} >Username</FormLabel>
                <FormControl>
                    <Input type={type} placeholder={placeholder} {...field} />
                </FormControl>
                <FormDescription>
                    This is your public display name.
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />

)

export default FormField