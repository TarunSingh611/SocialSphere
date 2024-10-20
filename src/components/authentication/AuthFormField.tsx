import Button from '@mui/material/Button';
import { authConfig } from "./AuthConfig/authConfig";
import { Select, FormControlLabel, Checkbox, Grid, TextField, MenuItem } from '@mui/material';
import TimerButtonComponent from './TimerButtonComponent';

const AuthformField = ({field , formik}: any) => {
    const config = authConfig?.[field?.name];
    if(config){
        if(config?.componentType === 'field'){
            return (
                <TextField
                margin="normal"
                required={config?.required}
                fullWidth
                id={field?.id}
                label={config?.label}
                name={field?.name}
                type={config?.type}
                autoComplete={field?.name}
                autoFocus={field?.autoFocus}
                error={!!formik.touched[field?.name] && !!formik.errors[field?.name]}
                helperText={formik.touched[field?.name] && formik.errors[field?.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field?.name]}
                />
            );
        }
        else if (config?.componentType === 'multiComponent') {
            const spacing = config?.spaceX || 2;
            return (
              <Grid container spacing={spacing} >
                {field?.components?.map((component:any, index:number) =>{ 
                    const {
                        id = index,
                        gridXs = 12,
                        gridSm = 12,
                        gridMd = 12,
                        alignContent = 'center',
                        } = component;
                    return(
                        <Grid
                            key={component?.id}
                            item
                            xs={gridXs}
                            sm={gridSm}
                            md={gridMd}
                            alignContent={alignContent}
                        >
                            <AuthformField field={component} formik={formik} />
                        </Grid>
                    )
                })}
              </Grid>
            );
        }
        else if (config?.componentType === 'dropdown') {
            const {
                gridXs = 12,
                gridSm = 12,
                gridMd = 12,
            } = field

            return (
                <Grid item xs={gridXs} sm={gridSm} md={gridMd}>
                    <Select
                        fullWidth
                        id={field?.id}
                        label={config?.label}
                        name={field?.name}
                        value={formik.values[field?.name] || ''}
                        onChange={(e) => formik.setFieldValue(field?.name, e.target.value)}
                        error={!!formik.touched[field?.name] && !!formik.errors[field?.name]}
                    >
                        {config?.options.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            );
        }
        else if(config?.componentType === 'checkbox'){
            return (<FormControlLabel control={<Checkbox value={field?.name} color="primary" />} label={config?.label} />)
        }
        else if(config?.componentType === 'link')
            {
                return(
                        <Grid item xs>        
                            <p
                                className='text-sm text-gray-500 hover:text-blue-400 cursor-pointer'
                                onClick={field?.action}
                            >
                                {config?.label}
                            </p>
                        </Grid> 
                )
            }
        else if(config?.componentType === 'button'){
            return(
                <Button 
                    className={`${field?.class}`}
                    fullWidth
                    type={config?.type}
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                    onClick = {field?.action}
                > 
                {config?.label} </Button>
            )
        }
        else if(config?.componentType === 'timer-button'){
        
            return <TimerButtonComponent config={config} field={field} />;
        }
        else{
            return <></>
        }
    }
    else{
        return <></>
    }

}

export default AuthformField