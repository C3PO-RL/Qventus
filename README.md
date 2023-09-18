# FormInput Component

The FormInput component is a reusable React component designed to simplify the integration of input fields within forms. It is built to work seamlessly with the **_React Hook Form_** library and provides a straightforward way to handle input changes, validation, and error display.

### Props

**name**: Specifies the name attribute for the input field. This is required for React Hook Form integration.

**control**: Passes the control object from React Hook Form to enable form control and validation.

**rules**: Defines validation rules for the input field. You can use built-in validation rules or custom validation functions. If validation fails, error messages will be displayed.

**onChange**: An optional callback function that allows you to handle input changes.

**onBlur**: An optional callback function that allows you to handle input blur.

**className**: An optional CSS class name that can be used to customize the input's appearance. If not provided, the default styling from FormInput.module.css will be applied.

# Usage

```
export const passwordReqs = { // passwordReqs object example
  hasConsecutiveLetters: (value: string) =>
    !/(.)\1/.test(value) || 'Has no consecutive letters',

  hasSpecialCharacters: (value: string) =>
    /(?=.*[!@#$%^&*])/.test(value) || 'Has a special char !@#$%^&*',

  hasNumbers: (value: string) => /\d/.test(value) || 'Has a number',

  hasUppercase: (value: string) =>
    /[A-Z]/.test(value) || 'Has uppercase letter',
}
```

```
import React from 'react';
import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { passwordReqs } from './utils/paswordReqs'

const MyForm = () => {
  const { control, handleSubmit } = useForm();


  const onSubmit = (data) => {
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Use the FormInput component within your form */}
      <FormInput
        name="fieldName" // Specify the name attribute for the input field
        control={control} // Pass the control object from useForm
        rules={{ required: 'Field is required', validations: passwordReqs}} // Define validation rules by modifying the passwordReqs object, you could use a yup schema too
        onChange={(text) => {
          // Handle input changes (optional)
        }}
        onBlur={() => {
          // Handle input blur (optional)
        }}
        className="custom-input-style" // Apply custom CSS class (optional)
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```

## Installation

type `yarn` to install all the depencies

## Run the app locally

type `yarn dev` to run the vite script

## Testing

type `yarn test` to run the **_vitest_** script for testing enviroment
