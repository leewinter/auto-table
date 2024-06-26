# @leewinter/auto-table

[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@leewinter/auto-table)

![Latest Stable Release](https://img.shields.io/npm/v/@leewinter/auto-table)
![Downloads](https://img.shields.io/npm/d18m/@leewinter/auto-table)
![Build Status](https://github.com/leewinter/auto-table/workflows/Build%20and%20Publish%20storybook%20to%20GitHub%20Pages/badge.svg)

Simple react component to auto generate tables from arrays or objects.

Demo of the latest Storybook build can be found on github pages [https://leewinter.github.io/auto-table](https://leewinter.github.io/auto-table).

### Getting Started

Install using npm

```shell
npm install @leewinter/auto-table
```

### Usage

```javascript
import { AutoTable } from "@leewinter/auto-table";

const testData = [
      { id: 1, name: "Lee", mobile: "na" },
      { id: 2, name: "Danny", mobile: "0192272727" },
      { id: 3, name: "Tom", mobile: "987654321" },
      { id: 4, name: "Mark", mobile: "000000000" }
    ];

// From array
<AutoTable data={testData} options={{
    humanReadableHeaders: true,
    pagination: {
      itemsPerPage: 10,
      usePagination: false
    }
  }} />

// From object
<AutoTable data={testData[0]} />
```

### Options

```javascript
{
  // Any object or array
  data: [{col1: "1", col2: "test", embedded: ["test1", "test2"]}]
        || {col1: "1", col2: "test"}
        || ["test1", "test2"],
  options: {
    pagination: {
      usePagination: true,
      itemsPerPage: 10,
    },
    showSearch: false,
    humanReadableHeaders: true,
  }
}
```

### Styling

[@emotion/react](https://www.npmjs.com/package/@emotion/react) is used for styling.

![example](./docs/images/basic-example.png)

The table will default to the dark theme. This behaviour can be overriden using the ThemeProvider component.

```javascript
import { AutoTableThemeProvider, lightTheme } from "@leewinter/auto-table";

...

const myTheme = {...lightTheme, bgColorHead: "purple" }

<AutoTableThemeProvider theme={myTheme}>
  <AutoTable data={[{col1: "1", col2: "test"}]} />
</AutoTableThemeProvider>
```

AutoTableThemeProvider accepts the following type.

```javascript
export interface AutoTableTheme extends Theme {
  colors: {
    txtColorActive: string;
    bgColorActive: string;
    borderColorStandard: string;
    borderColorTr: string;
    txtColorDisabled: string;
    bgColorHead: string;
    bgColorEvenRow: string;
    txtColorEvenRow: string;
    txtColorHead: string;
    borderColorBotTr: string;
  };
  font: {
    fontFamily: string;
  };
}
```

If you want to use the current theme in your code.

```javascript
import { useAutoTableTheme } from "@leewinter/auto-table";

...

const { theme } = useAutoTableTheme();

const headerTextColor = theme.txtColorHead;
```
