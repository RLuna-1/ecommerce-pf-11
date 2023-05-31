import "../css/Login.css";


export default function UserLogin() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [state, setState] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({});


    const handleInputChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

        console.log(state)

    }
    
    const validate = (state) => {
        let errors = {};
        if (!state.email) {
            errors.email = 'Por favor, introduzca un email';
        } else if (!state.email.includes("@")) {
            errors.email = 'Por favor, introduzca un formato de email valido';
        }

        if (!state.password) {
            errors.password = 'Por favor, introduzca una contraseña';

        }
        return errors;

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }));
        console.log(e)
        if (state.email && state.password) {
            console.log(state)
            dispatch(loginUser(state))
        }
    }
  return (
    <form onSubmit={handleSubmit} >
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography style={{ color: "black" }} component="h1" variant="h5">
                        Accedé a tu cuenta
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Dirección de email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        {errors.email && (
                            <p style={{ color: "red" }}>{errors.email}</p>
                        )}
                        <TextField
                            onChange={handleInputChange}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        {errors.password && (
                            <p style={{ color: "red" }}>{errors.password}</p>
                        )}
                        <ColorButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            className={classes.submit}
                        >
                            INGRESAR
                        </ColorButton>
                    </form>
                </div>
            </Grid>
        </Grid>
    </form>
);
}
