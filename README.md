# @leewinter/auto-table

Simple react component to auto generate tables from arrays or objects

```javascript
import { AutoTable } from "@leewinter/auto-table";

const testData = [
    {id: 1, name: 'Lee', canBeMilked: 'No'},
    {id: 2, name: 'Danny', canBeMilked: 'Yes'}
    ];

<AutoTable data={testData} />

<AutoTable data={testData[0]} />
```

![example](./docs/images/basic-example.png)
