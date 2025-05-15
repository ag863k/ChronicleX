import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { signupUser } from "../../services/authService";
// import useAuth from '../../hooks/useAuth'; // Not strictly needed here unless auto-login after signup

const SignupForm = ({ onSwitchMode, onSignupSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  // const { login } = useAuth(); // If you want to auto-login after signup

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      console.log("SignupForm: Attempting signup with data:", { username, email, password }); // Log data being sent
      const responseData = await signupUser({ username, email, password });
      console.log("SignupForm: Signup API call successful. Response:", responseData); // Log successful response
      setSuccess("Signup successful! Please login.");
      if (onSignupSuccess) onSignupSuccess(); // Notify parent to switch to login
    } catch (err) {
      console.error("SignupForm: Signup API call failed. Full error object:", err); // Log the full error object
      
      let errorMessage = "Failed to sign up. Please check console for details."; // Default/fallback error

      // Attempt to parse more specific errors from the backend if available
      // err might be the error object from Axios, where err.response.data contains backend errors
      if (err.response && err.response.data) {
        const backendErrors = err.response.data;
        console.error("SignupForm: Backend error data:", backendErrors);
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
            // Generic way to show available error message from backend
            const firstErrorKey = Object.keys(backendErrors)[0];
            const firstErrorMessage = backendErrors[firstErrorKey];
            if (Array.isArray(firstErrorMessage) && firstErrorMessage.length > 0) {
                errorMessage = `${firstErrorKey}: ${firstErrorMessage.join(" ")}`;
            } else if (typeof firstErrorMessage === 'string') {
                errorMessage = `${firstErrorKey}: ${firstErrorMessage}`;
            }
        }
      } else if (err.message) { // Fallback to err.message if no response data
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
