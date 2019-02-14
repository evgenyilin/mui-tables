import { configure, addDecorator } from "@storybook/react";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { withNotes } from "@storybook/addon-notes";
import { withInfo } from "@storybook/addon-info";
const req = require.context("../src", true, /\.stories\.js$/);
const reqTs = require.context("../", true, /\.stories\.tsx$/);


function loadStories() {
    req.keys().forEach(filename => req(filename));
    reqTs.keys().forEach(filename => reqTs(filename));
}

const theme = createMuiTheme();
const ThemeDecorator = storyFn => <MuiThemeProvider theme={theme}>{storyFn()}</MuiThemeProvider>;

addDecorator(withInfo);
addDecorator(ThemeDecorator);
addDecorator(withKnobs);
addDecorator(withNotes);
configure(loadStories, module);
