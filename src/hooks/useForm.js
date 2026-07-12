import { useState } from 'react';

export function useForm({
  initialValues,
  validate,
  onSubmit,
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextValues = {
      ...values,
      [name]: value,
    };
    setValues(nextValues);

    // Validate on-the-fly for inputs already touched
    if (touched[name]) {
      const validationErrors = validate(nextValues);
      setErrors(validationErrors);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const setFieldValue = (name, value) => {
    const nextValues = {
      ...values,
      [name]: value,
    };
    setValues(nextValues);
    if (touched[name]) {
      const validationErrors = validate(nextValues);
      setErrors(validationErrors);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(values).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
    setFieldValue,
    resetForm,
  };
}
