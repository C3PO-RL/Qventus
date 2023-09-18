import { FC } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '../FormInput/FormInput'
import { passwordReqs } from './utils/paswordReqs'
import styles from './Form.module.css'

const Form: FC = () => {
  const { handleSubmit, control } = useForm({ mode: 'all' })
  // eslint-disable-next-line
  const onSubmit = (data: any) => alert(data.reusableInput)

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2>Password Component</h2>
      <FormInput
        name={'reusableInput'}
        control={control}
        rules={{
          required: 'Password is required',
          validate: passwordReqs,
        }}
      />
      <button type='submit'>Submit</button>
    </form>
  )
}

export default Form
