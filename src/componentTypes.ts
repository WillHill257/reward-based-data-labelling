// allow us to use v-form methods in typescript
export type VueForm = Vue & {
  validate: () => boolean;
  reset: () => void;
  resetValidation: () => void;
};
