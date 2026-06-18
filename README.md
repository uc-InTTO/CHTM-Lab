Dev Notes:
1. leverage type Inference. dont over-annotate: if TypeScript can automatically figure out a variables type you dont need to specify it explicitly. 
Bad: let name: string = "Alice";
Good: let name = "Alice";

2. Avoid the any TypeNever use any: it completely disables TypeScripts type-checking and essentially turns your code back into regular JavaScript. Use unknown instead: if the data type is truly unknown, use unknown, and then use type guards or typeof checks to narrow the type safely before executing operations on it.

3. Types vs. InterfacesUse Interfaces for Objects: the TypeScript documentation recommends using interface by default to describe the shape of objects and classes. Use Type Aliases for Everything Else: If you are defining unions (type ID = string | number;), tuples, or complex mapped types, use type.

4. Use Union and Literal TypesAvoid "mystery switches" (booleans): Instead of passing booleans, use string literal union types to make your code intent crystal clear.
Bad: function setTheme(isDark: boolean)
Good: type Theme = "light" | "dark" | "auto"; function setTheme(theme: Theme)

5. Null SafetyAvoid unhandled null and undefined: In strict mode, null and undefined will not be assignable to other types unless explicitly allowed.
Use Optional Chaining: safely access deeply nested properties using the "?". operator.