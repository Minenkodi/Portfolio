import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useAppDispatch} from "../../../store/hooks";
import {loginSuccessMock} from "../../../store/user/userSlice.ts";

type RegisterFormProps = {
    onCloseModal: () => void;
}
const RegisterForm: React.FC<RegisterFormProps> = ({onCloseModal}) => {
    const dispatch = useAppDispatch();
    const [formState, setFormState] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    // Stub to send form data
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Registration Data:', formState);
        //dispatch(registerUser(formState))
        dispatch(loginSuccessMock());
        onCloseModal();
    };

    const handleCancel = () => {
        onCloseModal();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                p: 2,
                minWidth: 300
            }}
        >
            <Typography variant="h5" gutterBottom align="center">
                Sign Up
            </Typography>

            <Grid container spacing={2}>
                <TextField
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    label="Lastname"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    label="Repeat password"
                    name="repeatPassword"
                    type="password"
                    value={formState.repeatPassword}
                    onChange={handleChange}
                />
            </Grid>

            {/* Buttons */}
            <Box sx={{display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3}}>
                <Button
                    variant="outlined"
                    onClick={handleCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Sign Up
                </Button>
            </Box>
        </Box>
    );
}

export default RegisterForm;