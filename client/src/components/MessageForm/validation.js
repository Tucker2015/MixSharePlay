import * as Yup from 'yup';

export const messageFormSchema = Yup.object({
  text: Yup.string()
    .min(1, 'Must be 1 characters at minimum')
    .max(300, 'Must be 300 characters or less')
    .required('Required'),
});
