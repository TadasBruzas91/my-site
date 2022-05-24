import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export default function CircularProgressWithLabel(props) {
  const { value, min, max } = props;

  let normalized = value;
  if (min && max) {
    normalized = ((value - min) * 100) / (max - min);
  }

  const scale = 1.5;
  const modValue = normalized ? normalized / scale : 0;

  // Set progress bar color
  function getColor(value) {
    //value from 0 to 1
    var hue = ((1 - value / 100) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }
  const newColor = getColor(normalized);

  const modProps = { ...props, value: modValue };

  // Change progress bar orentation
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  let angle = 150;
  if (!matches) angle = 60;

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        style={{
          transform: `rotate(${angle}deg)`,
          strokeLinecap: "round",
          color: "lightgray",
        }}
        variant="determinate"
        {...{ ...modProps, value: 100 / scale }}
      />
      <CircularProgress
        style={{
          transform: `rotate(${angle}deg)`,
          position: "absolute",
          left: "0",
          strokeLinecap: "round",
          color: `${newColor}`,
        }}
        variant="determinate"
        {...modProps}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          fontSize={12}
          component="div"
          color="text.secondary"
          sx={{ position: "absolute", top: "60px" }}
        >
          {`${props.label ? props.label : ""}`}
        </Typography>
        <Typography
          variant="caption"
          fontSize={30}
          component="div"
          color="text.secondary"
        >
          {`${value ? value.toFixed(1) : ""}${props.symbol}`}
        </Typography>
      </Box>
    </Box>
  );
}
