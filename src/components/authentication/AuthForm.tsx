import * as yup from 'yup';
import { useFormik } from 'formik';
import Avatar from '@mui/material/Avatar';
import AuthFormField from './AuthFormField';
import Box from '@mui/material/Box';
import { validationConfig } from './AuthConfig/validationConfig';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

export default function AuthForm({ handleSubmit, formConfig, initialValues = null }: any) {
  const validationData = formConfig?.field?.flatMap((field: any) => {
    if (field.components) {
      return field.components.map((component: any) => ({
        [`${component.name}`]: validationConfig[component.name],
      }));
    } else {
      return { [`${field.name}`]: validationConfig[field.name] };
    }
  });
  
  const initialData = initialValues
    ? formConfig?.field?.flatMap((field: any) => {
        if (field.components) {
          return field.components.map((component: any) => ({
            [`${component.name}`]: initialValues[component.name] || "",
          }));
        } else {
          return { [`${field.name}`]: initialValues[field.name] || "" };
        }
      })
    : formConfig?.field?.flatMap((field: any) => {
        if (field.components) {
          return field.components.map((component: any) => ({
            [`${component.name}`]: "",
          }));
        } else {
          return { [`${field.name}`]: "" };
        }
      });

  const formik = useFormik({
    initialValues: Object.assign({}, ...initialData),
    validationSchema: yup.object().shape(Object.assign({}, ...validationData)),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>{formConfig?.icon}</Avatar>
      <Typography component="h1" variant="h5">
        {formConfig?.title}
      </Typography>
      <Box component="form" className='signInvisible' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        {formConfig?.field?.map((field: any) => (
          <AuthFormField field={field} key={field?.id} formik={formik} />
        ))}
      </Box>
    </Box>
  );
}