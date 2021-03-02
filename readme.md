# TypeScript

## basics

TypeScirpt is a typed version of JavaScript that compile to native JavaScript.
The basic types are `string`, `number` and `boolean`.
You can also have an array of types. So for example an array of strings would be `string[]` or `Array<string>`.

Also when setting a type you can choose to give it multiple types.
In this example `age` can either be of type `string` or type `number`. And `ages` is an array that can hold values of types `number` and `string`.
```ts
const age: string | number = '32 years old';
const ages: Array<string | number> = [32, '32 years old'];
```


You can type variables by putting a type after the variable name.
```ts
const name: string = 'John Doe';
const age: number = 32;
const isMarried: boolean = true;

const names: string[] = ['John', 'Jane'];
```

When using functions you can type the parameters and the return type.
In functions you can also make the parameters optional by putting a question mark after the parameter name.
In the following function `street` is required and of type `string`. `houseNumber` is optional and of type `number` and the function will return a `string`.
```ts
const getAddress = (street: string, houseNumber?: number): string => {
    if (houseNumber === undefined) {
        return street;
    }

    return `${street} ${houseNumber}`;
}
```

When using an object you can use `type` or `interface` to define its values. Both type and interface names are written with a capital letter.
Also in both `type` and `interface` you can make properties optional by putting a questionmark after the property name.
```ts
type User = {
    name: string;
    age?: number;
}
const user: User = {
    name: 'John',
    age: 32,
}
```

```ts
interface User {
    name: string;
    age?: number;
}
const user: User = {
    name: 'John',
    age: 32,
}
```

When using `interface` you can merge properties.
```ts
interface User {
    name: string;
    age: number;
}

interface User {
    isMarried: boolean;
}

const user: User = {
    name: 'John',
    age: 32,
    isMarried: true
}
```

`type` cannot merge properties but it can be used to define custom types.
```ts
type Age = string | number;
type UserAge = User['age'];
```

### assignment
Create a typescript file and write the createUser function that is used below. Do this with specifying the parameter types and return type.
```ts
interface User {
    name: string;
    age: number;
    isMarried: boolean;
}

const user: User = createUser('John', 32, true);
```
You can `npm install tsc` in a project direcory and run `tsc index.ts` after writing the code to compile it to JavaScript.

### answer
```ts
const createUser = (name: string, age: number, isMarried: boolean): User => {
    return {
        name: name,
        age: age,
        isMarried: isMarried
    };
};
```

## generics
With generics variable types you can write functions interfaces or types where a certain type is not of a specific type.
In the following example strings uses the `createList` function with `string` as input. So the return type of the function will be of type `string` array.
Whereas numbers uses a number and the function will have return type `number` array.
```ts
const createList = <T>(par: T): T[] => {
    return [par];
};

const strings: string[] = createList('hello world');
const numbers: number[] = createList(5);
```

TypeScript will detect the type of this function. But you can also specify it yourself.
In this example the type is set to `string`. So if `response.data` is of type number TypeScript will give an error.
```ts
const dataList: string = createList<string>(response.data);
```

When using it in a `type` or `interface` you can do it like this.
```ts
type List<T> = T[];
const list: List<string> = ['hello'];

interface Data<T> {
    data: T;
}
const data: Data<string> = {
    data: 'hello'
};
```

### assignment
Write the `getData` function using generics.
```ts
interface Data<T> {
    data: T;
}
const welcome: Data<string> = {
    data: 'hello'
}
const welcomeData: string = getData<string>(welcome);
```

### answer
```ts
const getData = <T>(par: Data<T>): T => {
    return par.data;
};
```


### Type casting and type guards
When using variables that can have different types you have to sometimes use type casting or type guards.
Type casting can be done using the `as` keyword or with angle bracket.

below are two examples using the following code.
```ts
interface Human {
    sayHello: () => string;
}

interface Dog {
    bark: () => string
}

const getCreature = (isHuman: boolean): Human | Dog => {
    if (isHuman) {
        return {
            sayHello: () => 'hello'
        }
    }

    return {
        bark: () => 'woof'
    }
}
```

`as` example:
```ts
const creature: Human | Dog = getCreature(true);

const human: Human = creature as Human;

human.sayHello();
```
angle bracket example:

```ts
const creature: Human | Dog = getCreature(true);

const human: Human = <Human>creature;

human.sayHello();
```

type guards can be used using the `is` keyword in a return type of a function.
```ts
const creature: Human | Dog = getCreature(true);
const isHuman = (creature: Human | Dog): creature is Human => {
    return "sayHello" in creature;
}

if (isHuman(creature)) {
    creature.sayHello()
} else {
    creature.bark()
}
```

Type guards and type casting can also be used on methods like filter on arrays.

Type casting example:
```ts
const names: Array<string | null> = ['John', null, 'Jane', 'Walter', null];
const nameList: string[] = names.filter((name: string | null) => name !== null) as string[];
```

Type guard example:
```ts
const names: Array<string | null> = ['John', null, 'Jane', 'Walter', null];
const nameList: string[] = names.filter((name: string | null): name is string => name !== null);
```