import { createTheme } from "@mui/material/styles";

export default createTheme({
    components:{
        MuiTextField:{
            defaultProps:{
                size: "small",
                disabled: false,
                variant: "outlined",
                margin: "dense",
                fullWidth: true,
                InputLabelProps:{
                    shrink: true,
                    color: "primary"
                }
            }
        },
        MuiButton:{
            defaultProps:{
                size: 'small',
                color: 'primary',
                variant: 'contained'
            },
            styleOverrides:{
                root:{
                    textTransform: 'none'
                }
            }
        }
    }
    
});