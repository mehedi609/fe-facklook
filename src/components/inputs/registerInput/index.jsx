import { useField, ErrorMessage } from 'formik';
import { useMediaQuery } from 'react-responsive';

import './registerInput.css';

export default function RegisterInput({ ...props }) {
  const [field, meta] = useField(props);

  const view1 = useMediaQuery({
    query: '(min-width: 539px)',
  });

  const view3 = useMediaQuery({
    query: '(min-width: 1170px)',
  });

  const test1 = view3 && field.name === 'firstName';
  const test2 = view3 && field.name === 'lastName';

  return (
    <div className="input_wrap register_input_wrap">
      <input
        className={meta.touched && meta.error ? 'input_error_border' : ''}
        style={{
          width: `${
            view1 && (field.name === 'firstName' || field.name === 'lastName')
              ? '100%'
              : view1 && (field.name === 'email' || field.name === 'password')
              ? '370px'
              : '300px'
          }`,
        }}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && (
        <div
          className={view3 ? 'input_error input_error_desktop' : 'input_error'}
          style={{
            transform: 'translateY(2px)',
            left: `${test1 ? '-107%' : test2 ? '107%' : ''}`,
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div
              className={
                view3 && field.name !== 'lastName'
                  ? 'error_arrow_left'
                  : view3 && field.name === 'lastName'
                  ? 'error_arrow_right'
                  : !view3 && 'error_arrow_bottom'
              }
            ></div>
          )}
        </div>
      )}

      {meta.touched && meta.error && <i className="error_icon"></i>}
    </div>
  );
}
