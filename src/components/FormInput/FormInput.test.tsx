import { useForm } from 'react-hook-form'
import FormInput from './FormInput'
import { fireEvent, render, renderHook, waitFor } from '@testing-library/react'

describe('FormInput', () => {
  test('should render', () => {
    const { result } = renderHook(() => useForm({ mode: 'all' }))
    render(<FormInput name={'test'} control={result.current.control} />)
  })

  test('should show required error', async () => {
    const { result } = renderHook(() => useForm({ mode: 'all' }))
    const { getByRole, getByText } = render(
      <FormInput
        name={'test'}
        control={result.current.control}
        rules={{
          required: 'Password is required',
        }}
      />
    )
    const inputElement = getByRole('textbox')
    inputElement.focus()
    fireEvent.change(inputElement, { target: { value: '' } })
    fireEvent.blur(inputElement)
    await waitFor(() => {
      expect(getByText('Password is required')).toBeDefined()
    })
  })

  test('should show number error', async () => {
    const { result } = renderHook(() => useForm({ mode: 'all' }))
    const { getByRole, getByText } = render(
      <FormInput
        name={'test'}
        control={result.current.control}
        rules={{
          validate: {
            hasNumbers: (value: string) => /\d/.test(value) || 'Has a number',
          },
        }}
      />
    )
    const inputElement = getByRole('textbox')
    inputElement.focus()
    fireEvent.change(inputElement, { target: { value: 'test' } })
    fireEvent.blur(inputElement)
    await waitFor(() => {
      expect(getByText('Has a number')).toBeDefined()
    })
  })

  test('should show uppercase error', async () => {
    const { result } = renderHook(() => useForm({ mode: 'all' }))
    const { getByRole, getByText } = render(
      <FormInput
        name={'test'}
        control={result.current.control}
        rules={{
          validate: {
            hasUppercase: (value: string) =>
              /[A-Z]/.test(value) || 'Has uppercase letter',
          },
        }}
      />
    )
    const inputElement = getByRole('textbox')
    inputElement.focus()
    fireEvent.change(inputElement, { target: { value: 'test' } })
    fireEvent.blur(inputElement)
    await waitFor(() => {
      expect(getByText('Has uppercase letter')).toBeDefined()
    })
  })

  test('should show special char error', async () => {
    const { result } = renderHook(() => useForm({ mode: 'all' }))
    const { getByRole, getByText } = render(
      <FormInput
        name={'test'}
        control={result.current.control}
        rules={{
          validate: {
            hasSpecialCharacters: (value: string) =>
              /(?=.*[!@#$%^&*])/.test(value) || 'Has a special char !@#$%^&*',
          },
        }}
      />
    )
    const inputElement = getByRole('textbox')
    inputElement.focus()
    fireEvent.change(inputElement, { target: { value: 'test' } })
    fireEvent.blur(inputElement)
    await waitFor(() => {
      expect(getByText('Has a special char !@#$%^&*')).toBeDefined()
    })
  })

  test('should show consecutive letters error', async () => {
    const { result } = renderHook(() => useForm({ mode: 'all' }))
    const { getByRole, getByText } = render(
      <FormInput
        name={'test'}
        control={result.current.control}
        rules={{
          validate: {
            hasConsecutiveLetters: (value: string) =>
              !/(.)\1/.test(value) || 'Has no consecutive letters',
          },
        }}
      />
    )
    const inputElement = getByRole('textbox')
    inputElement.focus()
    fireEvent.change(inputElement, { target: { value: 'aa' } })
    fireEvent.blur(inputElement)
    await waitFor(() => {
      expect(getByText('Has no consecutive letters')).toBeDefined()
    })
  })
})
