# @leewinter/auto-table

Simple react component to auto generate tables from arrays or objects

```javascript
import { AutoTable } from "@leewinter/auto-table";

const testData = [
      { id: 1, name: "Lee", mobile: "na" },
      { id: 2, name: "Danny", mobile: "0192272727" },
      { id: 3, name: "Tom", mobile: "987654321" },
      { id: 4, name: "Mark", mobile: "000000000" }
    ];

<AutoTable data={testData} />

<AutoTable data={testData[0]} tableClass="styled-table" />
```

![example](./docs/images/basic-example.png)

Table class can be set via tableClass param. Default is `tableClass="styled-table"`
