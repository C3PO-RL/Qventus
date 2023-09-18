import { FC } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'
import styles from './InputError.module.css'

interface Props {
  errorMessage: string | undefined
}

const InputError: FC<Props> = ({ errorMessage }) => {
  return (
    <>
      {errorMessage && (
        <span className={styles.errorWrapper}>
          <IoIosCloseCircle className={styles.icon} />
          {errorMessage}
        </span>
      )}
    </>
  )
}

export default InputError
