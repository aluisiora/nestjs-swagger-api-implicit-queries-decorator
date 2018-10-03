# nestjs-swagger-api-implicit-queries-decorator

NestJS Swagger definition for an array of queries.

# Installation

```bash
npm install nestjs-swagger-api-implicit-queries-decorator --save
```

# Usage

Typescript:
```typescript
import { ApiImplicitQueries } from 'nestjs-swagger-api-implicit-queries-decorator';
```

```typescript
@ApiOperation({ title: 'Fetch cats' });
@ApiResponse({ status: 200, description: 'OK', isArray: true })
@ApiImplicitQueries([
    { name: 'fields', description: 'Select fields to display', required: false },
    { name: 'sort', description: 'Field to sort the result', required: false },
])
@UseInterceptor(SomeImplicitQueryUsageFromAnInterceptorAsExample)
@Get()
async index(@Query() query) {
  return await this.catsService.find(query);
}
```

You can create a custom decorator with all queries added:

```typescript
// custom-api-implicit-query.decorator.ts
import { ApiImplicitQueries } from 'nestjs-swagger-api-implicit-queries-decorator';

export const CustomApiImplicitQuery = () => ApiImplicitQueries([
    { name: 'fields', description: 'Select fields to display', required: false },
    { name: 'sort', description: 'Field to sort the result', required: false },
]);
```

And import using the previous example:

```typescript
@ApiOperation({ title: 'Fetch cats' });
@ApiResponse({ status: 200, description: 'OK', isArray: true })
@CustomApiImplicitQuery()
@UseInterceptor(SomeImplicitQueryUsageFromAnInterceptorAsExample)
@Get()
async index(@Query() query) {
  return await this.catsService.find(query);
}
```

# Credits

Thanks for the amazing work of all [NestJS Contributors](https://github.com/nestjs/nest/graphs/contributors).

# License
MIT License

Copyright (c) 2017 Aluísio Rodrigues Amaral

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.