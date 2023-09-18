export const passwordReqs = {
  hasConsecutiveLetters: (value: string) =>
    !/(.)\1/.test(value) || 'Has no consecutive letters',

  hasSpecialCharacters: (value: string) =>
    /(?=.*[!@#$%^&*])/.test(value) || 'Has a special char !@#$%^&*',

  hasNumbers: (value: string) => /\d/.test(value) || 'Has a number',

  hasUppercase: (value: string) =>
    /[A-Z]/.test(value) || 'Has uppercase letter',
}
