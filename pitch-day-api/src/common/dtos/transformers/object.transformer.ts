import { Transform, TransformFnParams } from 'class-transformer';
import R from 'ramda';

export function TransformObject() {
  return Transform((param: TransformFnParams) => {
    try {
      if (Array.isArray(param.value)) {
        const objects = param.value.map((value) => JSON.parse(value));

        return R.mergeAll(objects);
      }

      return JSON.parse(param.value);
    } catch (error) {
      console.error(
        `Someone tried to parse a query with a non-JSON string: ${JSON.stringify(
          param.value,
        )}\nOriginal error: ${error}\nOk... now let's ignore it.`,
      );
    }
  });
}
