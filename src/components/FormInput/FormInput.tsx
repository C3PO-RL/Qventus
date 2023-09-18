import { ChangeEvent } from 'react'
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form'
import InputError from './components/InputError'
import styles from './FormInput.module.css'

export interface ControlledFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  onChange?: (text: string) => void
  onBlur?: () => void
  className?: string
}

const FormInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  rules,
  onChange,
  onBlur,
  className,
  ...rest
}: ControlledFieldProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value)
    onChange?.(e.target.value)
  }

  const handleBlur = () => {
    field.onBlur()
    onBlur?.()
  }

  return (
    <div className={className || styles.formInputWrapper}>
      <input
        {...rest}
        type='text'
        name={name}
        value={field.value ?? ''}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.formInput}
      />
      {error && <InputError errorMessage={error.message} />}
    </div>
  )
}

export default FormInput
