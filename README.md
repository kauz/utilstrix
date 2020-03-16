## Build
```bash
cd node-utils/

npm i

npm run build
```

## Examples

```javascript
const { getSubDirs, get, put, post } = require('@opinov8/utils');

setImmediate(async () => {
  try {
    const getSubDirsResponse = await getSubDirs('./');

    const getResponse = await get('https://reqres.in/api/users');
    const postResponse = await post('https://reqres.in/api/users', JSON.stringify({
      name: "morpheus",
      job: "leader"
    }), { headers: { 'Content-Type': 'application/json' }, timeout: 5 });
    const putResponse = await put('https://reqres.in/api/users/2', JSON.stringify({
      name: "morpheus",
      job: "zion resident"
    }), { headers: { 'content-type': 'application/json; charset=UTF-8', 'accept': '*/*' } });

    [getSubDirsResponse, getResponse, postResponse, putResponse].forEach(r => {
      console.log(r.body || r, '\n');
    });
  } catch (e) {
    console.log(e.message);
  }
});
```
