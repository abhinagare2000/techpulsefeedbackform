import React, { useState, FormEvent } from "react";
import emailjs from '@emailjs/browser';
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Card,
  useTheme,
  useMediaQuery,
  styled,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Checkbox,
  FormGroup,
  Grid,
} from "@mui/material";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Send as SendIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material";

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: theme.spacing(2),
  border: "1px solid rgba(255, 255, 255, 0.3)",
  position: "relative",
  overflow: "visible",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    transition: "all 0.3s ease-in-out",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: 2,
      borderColor: theme.palette.primary.main,
    },
  },
}));

// Form data interface
interface FormData {
  name: string;
  email: string;
  phone: string;
  phoneNo: string;
  feedback: string;
  features: string;
  communities: string;
  importance: string;
  organizingFeatures: string;
  motivations: string;
  additionalComments: string;
  satisfaction: number;
  subscribe: boolean;
}

const FeedbackForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for form data, submission, success, etc.
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    phoneNo: "",
    feedback: "",
    features: "",
    communities: "",
    importance: "Medium",
    organizingFeatures: "",
    motivations: "",
    additionalComments: "",
    satisfaction: 50,
    subscribe: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");

  // Check if email has already been used
  const isEmailUsed = (email: string): boolean => {
    const usedEmails: string[] = JSON.parse(localStorage.getItem("usedEmails") || "[]");
    return usedEmails.includes(email);
  };

  // Save email in localStorage to prevent duplicates
  const saveEmail = (email: string): void => {
    const usedEmails: string[] = JSON.parse(localStorage.getItem("usedEmails") || "[]");
    localStorage.setItem("usedEmails", JSON.stringify([...usedEmails, email]));
  };

  // Form submit handler
  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isEmailUsed(formData.email)) {
      setEmailError("This email has already submitted feedback.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate sending data to backend
      console.log("Submitting data:", formData);
      saveEmail(formData.email);
      const dataToSend = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      phoneNo: formData.phoneNo,
      feedback: formData.feedback,
      features: formData.features,
      communities: formData.communities,
      importance: formData.importance,
      organizingFeatures: formData.organizingFeatures,
      motivations: formData.motivations,
      additionalComments: formData.additionalComments,
      satisfaction: formData.satisfaction,
      subscribe: formData.subscribe,
    };
      await emailjs.send(
        'service_533swr7', // Replace with your EmailJS service ID
        'template_56bp0mi', // Replace with your EmailJS template ID
        dataToSend,
        'GqcG-qWTRU8OhepQW' // Replace with your EmailJS public key
      );
      setShowSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        phoneNo: "",
        feedback: "",
        features: "",
        communities: "",
        importance: "Medium",
        organizingFeatures: "",
        motivations: "",
        additionalComments: "",
        satisfaction: 50,
        subscribe: false,
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ minHeight: "100vh", display: "flex", alignItems: "center", py: { xs: 4, md: 8 } }}>
      <StyledCard sx={{ width: "100%", p: { xs: 4, sm: 4 }, backgroundColor: "#f5f5f5" }}>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            align="center"
            sx={{
              fontWeight: "bold",
              mb: 1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Share Your Feedback
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "grid", gap: 3 }}>
              {/* Full Name */}
              <StyledTextField
                label="Full Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                fullWidth
                variant="outlined"
              />

              {/* Email Address */}
              <StyledTextField
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setEmailError("");
                }}
                required
                fullWidth
                error={!!emailError}
                helperText={emailError}
                variant="outlined"
              />

              {/* Phone and Phone No (side by side) */}
              <Grid container spacing={2} alignItems="center">
                {/* Country Code */}
  <Grid item xs={2}>
    <PhoneInput
      international
      defaultCountry="IN" // India country code
      value={formData.phone}
      onChange={(phone) => setFormData({ ...formData, phone: phone || '' })}
      style={{
        width: '100%',
        height: '50px', // Set height to 50px
        borderRadius: '4px',
        backgroundColor: '#f5f5f5',
        border: '1px solid #ccc',
        padding: '0 10px', // Adjust padding for better spacing
        fontSize: '14px',
      }}
    />
  </Grid>


                {/* Phone Number */}
                <Grid item xs={10}>
                  <StyledTextField
                    label="Phone No"
                    variant="outlined"
                    value={formData.phoneNo}
                    onChange={(e) => {
                      const phoneNumber = e.target.value;

                      // Only allow numeric input and limit the length to 10 digits
                      if (/^\d{0,10}$/.test(phoneNumber)) {
                        setFormData({ ...formData, phoneNo: phoneNumber });
                      }
                    }}
                    fullWidth
                    InputProps={{
                      style: {
                        backgroundColor: "#f5f5f5",
                        borderRadius: "4px",
                        height: "50px",  // Ensure consistent height
                      },
                      inputProps: {
                        maxLength: 10,  // Limit to 10 digits
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Feedback Section */}
              <StyledTextField
                label="Your Feedback"
                placeholder="Tell us what you think"
                value={formData.feedback}
                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                required
                fullWidth
                multiline
                rows={4}
                variant="outlined"
              />

              {/* Features Section */}
              <StyledTextField
                label={
    <span style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
      What features do you think are most important for an online community platform?
    </span>
  }
                placeholder="E.g. instant messaging, voice/video chat, community discussion, content sharing, etc."
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
              />

              {/* Communities Section */}
              <StyledTextField
                label={
    <span style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
      What kind of communities or groups would you like to be part of?
    </span>
  }
                placeholder="E.g., Artificial Intelligence, Software Engineering, Cyber Security, Blockchain Development, etc."
                value={formData.communities}
                 onChange={(e) => setFormData({ ...formData, communities: e.target.value })}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
              />

              {/* Importance Radio Group */}
              <Typography variant="subtitle1" gutterBottom>
                How important is the ability to connect with people from around the world to you?
              </Typography>
              <RadioGroup
                row
                value={formData.importance}
                onChange={(e) => setFormData({ ...formData, importance: e.target.value })}
              >
                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                <FormControlLabel value="High" control={<Radio />} label="High" />
              </RadioGroup>

              {/* Other Sections */}
              <StyledTextField
                label={
    <span style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
      Would you like to see features that help in organizing or managing communities or groups?
    </span>
  }
                value={formData.organizingFeatures}
                onChange={(e) => setFormData({ ...formData, organizingFeatures: e.target.value })}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
              />

              <StyledTextField
                label={
    <span style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
      What motivates you to stay active and engaged in a community?
    </span>
  }
                value={formData.motivations}
                onChange={(e) => setFormData({ ...formData, motivations: e.target.value })}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
              />

              <StyledTextField
                label={
    <span style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
      Is there anything else you would like to see or expect from this platform?
    </span>
  }
                value={formData.additionalComments}
                onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                fullWidth
                multiline
                rows={3}
                variant="outlined"
              />

              {/* Satisfaction Slider */}
              <Typography variant="subtitle1" gutterBottom>
                How satisfied are you with current social media platforms?
              </Typography>
              <Slider
                value={formData.satisfaction}
                onChange={(_, value) =>
    setFormData({ ...formData, satisfaction: value as number })
  }
                min={10}
                max={100}
                step={10}
                marks
                valueLabelDisplay="auto"
              />

              {/* Newsletter Subscription Checkbox */}
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.subscribe}
                      onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
                    />
                  }
                  label="Subscribe to our email newsletter for updates"
                />
              </FormGroup>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  py: 1.5,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                }}
                fullWidth
              >
                {isSubmitting ? "Submitting..." : <><SendIcon sx={{ mr: 1 }} />Submit Feedback</>}
              </Button>

              {showSuccess && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 3,
                    color: theme.palette.success.main,
                  }}
                >
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Thank you for your feedback!</Typography>
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </StyledCard>
    </Container>
  );
};

export default FeedbackForm;