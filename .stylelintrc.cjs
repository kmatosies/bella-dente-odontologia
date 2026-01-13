module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  rules: {
    // Allow Tailwind at-rules like @apply
    'at-rule-no-unknown': null,
  },
};