import {
  TextField,
  styled,
} from "@mui/material";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    marginTop: "12px", // Increased top margin to accommodate label
    transition: "all 0.3s ease-in-out",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderWidth: 2,
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiInputLabel-root": {
    backgroundColor: "inherit",
    padding: "0 6px",
    whiteSpace: "break-spaces",
    width: "100%",
    transformOrigin: "left top",
    "&.MuiInputLabel-shrink": {
      transform: "translate(8px, -10px) scale(0.75)", // Moved label higher up
      maxWidth: "133%", // Increased max-width for better text wrapping
      height: "auto",
      padding: "0 6px",
      overflow: "visible",
      zIndex: 1,
      wordBreak: "break-word",
      whiteSpace: "break-spaces",
      lineHeight: 1.2,
    },
  },
  "& .MuiInputLabel-shrink": {
    backgroundColor: "inherit",
  },
  // Mobile-specific adjustments
  [theme.breakpoints.down("sm")]: {
    "& .MuiInputLabel-root": {
      fontSize: "0.9rem",
      "&.MuiInputLabel-shrink": {
        fontSize: "0.75rem",
        transform: "translate(8px, -10px) scale(0.75)",
      },
    },
  },
}));

export default StyledTextField;