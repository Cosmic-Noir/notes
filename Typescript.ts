// Typescript notes - TypeScript is a superset of JavaScript that adds types.
// Codecademy course - 06/6/21

// Typescript adds strict typing to javascript code - this helps overcome the fact that when JS code breaks other code, it doesn't really tell you.
// Typescript uses a transcompiler to turn `.ts` (typescript) files into js files `.js`. You can run the "TypeScript transcompiler" command in your terminal with:

tsc

// This command creates the .js file and also shows any surface errors found by the Typescript transcompiler.

// You can also run specific files with:

tsc fileName.ts

// Once you configure the tsconfig.json file, this will allow you to run the "tsc" command. See below.

// Note in Typescript, that when you assign a variable, it can never be re-assigned to a different data type. "TypeScript expects the data type of the variable to match the type of the value initially assigned to it at declaration."

/* Typescript recognizes JS's primitive data types:
- boolean
- number
- null
- string
- undefined
*/

// Type Shapes - an object's shape describes what properties and methods the object does or does not contain, along with other things.

// Remember that all JS data tpes have access to known properties and methods, like the string type's `.length` property.

// In typescript, the `tsc` command will inform you when you are trying to use a method that does not belong to that data type.

// Sometimes you can initialize a variable without assigning a value - therefore typescript will consider the type to be "any". This actually means that you can assign it different data types later on, and it will not throw errors.

// You can actually assign a variable's current or future data type using "Type Annotation", or "type declarations", by adding this just after the naming of the variable - do this using a colon and the data type like so:

let mustBeAString : string;

mustBeAString = "totesAString";

// if you try:
mustBeAString = 1234;
// this will throw an error for the wrong type.

// Note that when the .ts files are converted to .js, the type declarations are removed, making the code easier to read.


// The tsconfig.json File - Allows you to customize which rules of TypeScript are enforced and on what files. Ex:

{
  "compilerOptions": {
    "target": "es2017", // Using 2017 version of EcmaScript for JS
    "module": "commonjs", // import export syntax
    "strictNullChecks": true // variables can only have null or undefined values if they are explicitly assigned those values.
  },
  "include": ["**/*.ts"] // Which files these rules should apply to - in this case it means all .ts files.
}

// Function Parameter Type Annotation - even parameters to functions can be given an explicit type.

function greet(name: string) {
  console.log(`Hello, ${name}!`);
}

greet('Katz'); // Prints: Hello, Katz

greet(1337); // Error: argument '1337' is not assignable to parameter of type 'string'

// Parameters without an explicit type stated are of type "any".

function printKeyValue(key: string, value) {
  console.log(`${key}: ${value}`);
}

printKeyValue('Courage', 1337); // Prints: Courage: 1337
printKeyValue('Mood', 'scared'); // Prints: Mood: scared

// Optional Parameters -

function greet(name: string) {
  console.log(`Hello, ${name || 'Anonymous'}!`);
}

greet('Anders'); // Prints: Hello, Anders!
greet(); // TypeScript Error: Expected 1 arguments, but got 0.

// To declare that a parameter is actually optional, use `?` before the `:` in the type declaration:

function greet(name?: string) {
  console.log(`Hello, ${name|| 'Anonymous'}!`);
}

greet(); // Prints: Hello, Anonymous!

// You can also just set default parameters without the `?` operator, as you're giving a default param of the correct type already: - it will assume the type here based on the default params given to it.

function proclaim(status = 'not ready...', repeat = 1) {
  for (let i = 0; i < repeat || 0; i += 1) {
    console.log(`I'm ${status || 'not ready...'}`);
  }
}

proclaim();
proclaim('ready?');
proclaim('ready!', 3);

// Inferring Return types - Typescript automatically evaluates the code after the `return` statement and infers the return type of that function. If you have a variable assigned to a certain type, and that value is the return of a function, the types need to match, or it will throw an error, like below:

function ouncesToCups(ounces: number) {
  return `${ounces / 16} cups`;
}

const liquidAmount: number = ouncesToCups(3);
// Type 'string' is not assignable to type 'number'.

// Explicit return types - If you do not want the type to be inferred by what is returned by the function, you can explicitly declre this as well with a `:` after the function declaration - note if the inferred return type is different from the explicit return type, an error is thrown.

function createGreeting(name?: string): string {
  if (name) {
    return `Hello, ${name}!`;
  }

  return undefined;
  //Typescript Error: Type 'undefined' is not assignable to type 'string'.
};

// Arrow function version:

const createArrowGreeting = (name?: string): string => {
  if (name) {
    return `Hello, ${name}!`;
  }

  return undefined;
  // Typescript Error: Type 'undefined' is not assignable to type 'string'.
};

// Void Return Type - sometimes a function should not return anything - like just logging to the console - you can explicitly declare that type like so:

function logGreeting(name:string): void{
  console.log(`Hello, ${name}!`)
}

// Comments - even though TypeScript uses JS comments, there is a particular documentation comment type, using two ** in the begining, a * at every line, and closing with just one */

/**
* This is a documentation comment
*/

// In some TypeScript projects documentaiton commnets, you can use this to describe parameter and return types, like so:

  /**
   * Returns the sum of two numbers.
   *
   * @param x - The first input number
   * @param y - The second input number
   * @returns The sum of `x` and `y`
   *
   */
   function getSum(x: number, y: number): number {
    return x + y;
  }

// Complex Types -

// Array Type Annotations - you simply add an '[]' after the type declaraion of the variable:

let names: string[] = ['Danny', 'Sunny'];

// Or alternitively

let names: Array<string> = ['Jake', 'Josoh'];

// Multi-dimensional Arrays - You can declare them as multi-dimensional with an additional []:

let arr: string[][] = [['str1', 'str2'], ['more', 'strings']];

// Empty arrays are compatible with any assigned array type:

let names: string[] = [];

let numers: number[] = [];

// I guess it is also appropriate to annotate the actual depth of arrays within arrays, like this one, which has 3 levels deep array:

let numbersMulti: number[][][] = [ [[1],[2,3]], [[7],bestNumbers] ];

// Tuples - You can also have arrays that DO have different element types. Tuples even define the number of expected elements in an array - specifying type and length at the same time.

// Defining an array with a fixed sequence of types:

let ourTuple: [string, number, string, boolean] = ['Is', 7, 'our fave', false];

// Useful errors when length or type is incorrect:

let numbersTuple: [number, number, number] = [1,2,3,4]; // Type Error! numbersTuple should only have three elements.
let mixedTuple: [number, string, boolean] = ['hi', 3, true] // Type Error! The first elements should be a number, the second a string, and the third a boolean.

// Note that when you create a tuple, you cannot assign an array to a tuple variable, even if the elements are of the correct type:

let tup: [string, string] = ['hi', 'bye'];
let arr: string[] = ['there','there'];
tup = ['there', 'there']; // No Errors.
tup = arr; // Type Error! An array cannot be assigned to a tuple.

// Array Type Interface - Know that when no type is specificed for an array - it will be typed per the type of elements, not inferred into a tuple

let examAnswers= [true, false, false];
// Is the same as
let examAnswers: boolean[] = [true, false, false];

// It does not care about length, as it is not a Tuple, and therefore does not restrict length. In fact, if you create a new variable that simply adds or concats a Tuple array into a new array without a defined type, the array's type is simply the type of elements in the array, not a tuple:

let dogTup: [string, string, string, string] = ['dog', 'brown fur', 'curly tail', 'sad eyes'];

const myArr = dogTup.concat('tail');

// Rest Parameters - In the example below, the `rest` operator is used to allow as many other args as you want. This below example is untyped.

function smush(firstString, ...otherStrings){
  let output = firstString;
  for(let i = 0; i < otherStrings.length; i++){
    output = output.concat(otherStrings[i]);
  }
  return output;
}

// Ex:
smush('a','h','h','H','H','H','!','!'); // Returns: 'ahhHHH!!'.

// To make the rest parameter typed and to keep the code safe, we can give the rest parameter a type:

function smush(firstString, ...otherStrings: string[]) {
  // rest of func
}

// Ex of a function with both params typed and return is also typed:

function addPower(p: number, ...numsToAdd: number[]): number{
  let answer = 0;
  for(let i = 0; i < numsToAdd.length; i++){
    answer += numsToAdd[i] ** p;
  }
  return answer;
}

// Spread syntax -

// Sometimes you have complex functions that take a tooooon of args, like this gps function, for ex, that has all typed args:

function gpsNavigate(startLatitudeDegrees:number, startLatitudeMinutes:number, startNorthOrSouth:string, startLongitudeDegrees: number, startLongitudeMinutes: number, startEastOrWest:string, endLatitudeDegrees:number, endLatitudeMinutes:number , endNorthOrSouth:string, endLongitudeDegrees: number, endLongitudeMinutes: number,  endEastOrWest:string) {
  /* navigation subroutine here */
}

// Instead of doing this crazy-pants stuff above, we can actually use tuple variables that represent the args, and use the spread operator to input the args.

// So instead of this call:
gpsNavigate(40, 43.2, 'N', 73, 59.8, 'W', 25, 0, 'N', 71, 0, 'W')

// We create two variables to represent the args above, and then use the spread operator to call:

let codecademyCoordinates: [number, number, string, number, number, string] = [40, 43.2, 'N', 73, 59.8, 'W'];
let bermudaTCoordinates: [number, number, string, number, number, string] = [25, 0 , 'N' , 71, 0, 'W'];

gpsNavigate(...codecademyCoordinates, ...bermudaTCoordinates);
// And by the way, this makes the return trip really convenient to compute too:
gpsNavigate(...bermudaTCoordinates, ...codecademyCoordinates);
// If there is a return trip . . .

// Custom Types

// Enums - Enum values are assigned a numerical value according to their listed order.

enum Direction {
  North,
  South,
  East,
  West
}

let whichWayToArcticOcean: Direction;
whichWayToArcticOcean = Direction.North; // No type error.
whichWayToArcticOcean = Direction.Southeast; // Type error: Southeast is not a valid value for the Direction enum.
whichWayToArcticOcean = West; // Wrong syntax, we must use Direction.West instead.

// If we set the below variable like so:

whichWayToArcticOcean = Direction.North;

// then

whichWayToArcticOcean === 0 // evals to true

// This even allows you to reassign variables to an integer without breaking the type:

whichWayToArcticOcean = 2;  // Does not throw an error.

// If you want, you can designate the starting integer like so:

enum Direction {
  North = 7,
  South,
  East,
  West
}

// So values are now 7, 8, 9, and 10 respectively.

// You can also specify the designation of all enums in  a set:

enum Direction {
  North = 8,
  South = 2,
  East = 6,
  West = 4
}

// Enums are a type, when using them, you type the variable to the enum like so:

enum Pet {
  Hamster,
  Rat,
  Chinchilla,
  Tarantula
}

let petOnSaleTS: Pet = Pet.Chinchilla;

// SECION ON CUSTOM TYPING THAT I SHOULD REDO SO I HAVE NOTES TO REFERENCE



// Unions - when you have a variable that needs to be more than one type, instead of saying : any - you can actually use what is called a "union" to allow more than one type, but not any. Ex:

let ID: string | number;

// function union type:

function getMarginLeft(margin: string | number) {
  return { 'marginLeft': margin };
}

// Type Guard - when a function has a union type of parameter, sometimes you want teh fucntion to do different things for different types - a type guard is a conditional that checks if a variable is a certain type:

function getMarginLeft2(margin: string | number) {
  // string or number here

  if (typeof margin === 'string') {
    // margin must be a string - then we can do string thingies
    return margin.toLowerCase();
  }
}

// The above is called "Type Narrowing" - it allows some flexibility to handle more than one type. Codecademy defined this as when TypeScript can infer more specific types based on the variable's surrounding code.

// Unions and Arrays - When defining the union type of array, wrap the union in parens - NOTE - that if you don't use parentheses, it will interpret this as an array of EITHER strings or numbers, not either type.

const dateNumber = 7;
const dateString = '7';

const timeList: (string | number)[] = [dateNumber, dateString];

// Note that when you use a union, if you try to call a method on a union-typed variable, it must be a method that is avialable to BOTH types:

const batteryStatus: boolean | number = false;

batteryStatus.toString(); // No TypeScript error
batteryStatus.toFixed(2); // TypeScript error

// This is true of our own custom types as well, in this example, calling 'hasHoofs' doesn't work because it does not belong to both types:

type Goose = {
  isPettable: boolean;
  hasFeathers: boolean;
  canThwartAPicnic: boolean;
}

type Moose = {
  isPettable: boolean;
  hasHoofs: boolean;
}

const pettingZooAnimal: Goose | Moose = { isPettable: true };

console.log(pettingZooAnimal.isPettable); // No TypeScript error
console.log(pettingZooAnimal.hasHoofs); // TypeScript error

// Unions with Literal Types - Union below shows the arg can be of either type string or number.

// Type Narrowing - when TypeScript can infer more specific types based on the variable's surrounding code.

// Type Guards - When your code checks the type of the parameter and then does something different based on the type. Often uses `typeof`

// Ex:
function formatDate(date: string | number) {
  // date can be a number or string here

  if (typeof date === 'string') {
    // date must be a string here
  }
}

// in - the JavaScript operator checks if a property exists on an object itself, or anywhere in the prototype chain. In the below example, instead of checking the type of the parameter, it checks if the method exists on the parameter object:

type Tennis = {
  serve: () => void;
}

type Soccer = {
  kick: () => void;
}

function play(sport: Tennis | Soccer) {
  if ('serve' in sport) {
    return sport.serve();
  }

  if ('kick' in sport) {
    return sport.kick();
  }
}

// Alternitvely you can use else blocks for when there are only two types:

function formatPadding(padding: string | number) {
  if (typeof padding === 'string') {
    return padding.toLowerCase();
  } else {
    return `${padding}px`;
  }
}

// You can further reduce the above code by removing the `else`, since there is a return statement in the type guard, you know that it will not execute the below code unless the type is something else. So  you can write:

type Tea = {
  steep: () => string;
}

type Coffee = {
  pourOver: () => string;
}

function brew(beverage: Coffee | Tea) {
  if ('steep' in beverage) {
    return beverage.steep();
  }

  return beverage.pourOver();
}

// Interfaces and Types - Interface keyword is another way to define types. Note the difference from using the type keyword where we use the `=` assignment. The biggest difference between using the type and interface keywords is that `interface` can only be used to type objects. Ex:

interface Mail {
  postagePrice: number;
  address: string;
}

// The reason you would use `interface` is is for when you literally need to type many objects - which is useful when programing in object-oriented-programming languages. The interface keyword is also great for adding types to a class using the `implements` keyword:

interface Robot {
  identify: (id: number) => void;
}

class OneSeries implements Robot {
  identify(id: number){
    console.log('Beep, I am ${id.toFixed(2)}');
  }

  answerQuestion() {
    console.log('42!');
  }
}

// Composed Types - because nesting can become very complex as we need more nested attributes, we can instead break a type into smaller types, then "compose" them into a single type that can be used elsehwere when needed:

interface About {
  general: General;
}

interface General {
  id: number;
  name: string;
  version: Version;
}

interface Version {
  versionNumber: number;
}

// Extending Interfaces - You can use the extends keyword to copy all the type members from one type into another. This can be really helpful to organize code by abstracting out common type members into their own interface, then copying them into more specific types .

interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

const mySquare: Square = { sideLength: 10, color: 'blue' }

// Index Signatures - When you don't know what the actual Key will be and cannot explicitly type it, you can use index signatures. So that it looks like this: (note that `latitude` is for humans to read so we know genraally what the key represents, - here we're saying that we should have a key that is of type string, with a value of type boolean) (Additionally, I think this means you could have multiple keys with a type of string and value of boolean)

interface SolarEclipse {
  [latitude: string]: boolean;
}

// Optional Type Members - Sometimes types can be optional using ?. The below code states that in a type of OptionsType, size is an optional property. In the function listFile, we check for size before calling it, as it may not be included.

interface OptionsType {
  name: string;
  size?: string;
}

function listFile(options: OptionsType) {
  let fileName = options.name;

  if (options.size) {
    fileName = `${fileName}: ${options.size}`;
  }

  return fileName;
}
