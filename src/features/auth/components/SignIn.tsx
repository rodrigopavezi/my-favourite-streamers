import React from "react";
import { Box, Button } from "grommet";

type Props = {
  handleSignIn: () => void;
};

export default function SignIn({ handleSignIn }: Props) {
  return (
    <Box
      margin="medium"
      width="100%"
      height="100vh"
      align="center"
      justify="center"
    >
      <Box
        width="large"
        height="large"
        border
        pad="large"
        align="center"
        justify="center"
      >
        <Box width="medium" justify="center" align="center">
          <Button
            label="Sign in with Twitch Account"
            onClick={handleSignIn}
          ></Button>
        </Box>
      </Box>
    </Box>
  );
}
