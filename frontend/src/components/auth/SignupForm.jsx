import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { signupUser } from "../../services/authService";

const SignupForm = ({ onSwitchMode, onSignupSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }    try {
      await signupUser({ username, email, password });
      setSuccess("Signup successful! Please login.");
      if (onSignupSuccess) onSignupSuccess();
    } catch (err) {
      let errorMessage = "Failed to sign up. Please try again.";

      if (err.response && err.response.data) {
        const backendErrors = err.response.data;
        if (backendErrors.username && Array.isArray(backendErrors.username)) {
          errorMessage = `Username: ${backendErrors.username.join(" ")}`;
        } else if (backendErrors.email && Array.isArray(backendErrors.email)) {
          errorMessage = `Email: ${backendErrors.email.join(" ")}`;
        } else if (backendErrors.password && Array.isArray(backendErrors.password)) {
          errorMessage = `Password: ${backendErrors.password.join(" ")}`;
        } else if (backendErrors.detail) {
          errorMessage = backendErrors.detail;
        } else if (typeof backendErrors === 'string') {
            errorMessage = backendErrors;
        } else if (Object.keys(backendErrors).length > 0) {
            const firstErrorKey = Object.keys(backendErrors)[0];
            const firstErrorMessage = backendErrors[firstErrorKey];
            if (Array.isArray(firstErrorMessage) && firstErrorMessage.length > 0) {
                errorMessage = `${firstErrorKey}: ${firstErrorMessage.join(" ")}`;
            } else if (typeof firstErrorMessage === 'string') {
                errorMessage = `${firstErrorKey}: ${firstErrorMessage}`;
            }
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography component="h1" variant="h5">
        Sign Up
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 1 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 2, mb: 1 }}>
          {success}
        </Alert>
      )}
      <TextField
        margin="normal"
        required
        fullWidth
        id="username-signup"
        label="Username"
        name="username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email-signup"
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password-signup"
        label="Password"
        type="password"
        id="password-signup"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
      <Button fullWidth onClick={onSwitchMode} disabled={loading}>
        Already have an account? Sign In
      </Button>
    </Box>
  );
};
export default SignupForm;
