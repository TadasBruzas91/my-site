import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function CircularProgressWithLabel(props) {
  const { value, min, max } = props;

  let normalized = value;
  if (min && max) {
    normalized = ((value - min) * 100) / (max - min);
  }

  const scale = 1.5;
  const modValue = normalized / scale;

  function getColor(value) {
    //value from 0 to 1
    var hue = ((1 - value / 100) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }
  const newColor = getColor(normalized);

  const modProps = { ...props, value: modValue };

  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        style={{
          transform: "rotate(150deg)",
          strokeLinecap: "round",
          color: "lightgray",
        }}
        variant="determinate"
        {...{ ...modProps, value: 100 / scale }}
      />
      <CircularProgress
        style={{
          transform: "rotate(150deg)",
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
