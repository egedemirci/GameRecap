import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardHeader, Divider } from "@mui/material";

const headerSX = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

const MainCard = forwardRef(
  (
    {
      border = true,
      elevation,
      children,
      codeHighlight,
      content = true,
      contentSX = {},
      secondary,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          ...sx,
          border: border ? "1px solid" : "none",
          borderRadius: 2,
          backgroundColor: "#1d3557",
          borderColor: "#F1FAEE",
          "& pre": {
            m: 0,
            p: "12px !important",
            fontFamily: theme.typography.fontFamily,
            fontSize: "0.75rem",
          },
        }}
      >
        {/* card header and action */}
        {title && (
          <>
            <CardHeader
              sx={headerSX}
              titleTypographyProps={{ variant: "subtitle1" }}
              title={title}
              action={secondary}
            />
            <Divider />
          </>
        )}
        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  children: PropTypes.node,
  elevation: PropTypes.number,
  content: PropTypes.bool,
  contentSX: PropTypes.object,
  codeHighlight: PropTypes.bool,
  secondary: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
  sx: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.object,
  ]),
};

export default MainCard;
