# Workspace Rules

- **Workspace Scope Constraint**: Strictly do NOT modify or delete any file, directory, or application outside of the current workspace directory (`d:\Vibe Coding\nu`). All edits, creations, command executions, and deletions must strictly remain inside this project folder.

## Project-Wide Coding Standards for Nu

### 1. Coding Style
- Use standard TypeScript conventions.
- Prefer functional programming patterns where appropriate.
- Maintain consistent formatting with Prettier (usually auto-detected).

### 2. Documentation Standards
- **Required**: All new classes, interfaces, and public functions *must* include JSDoc-style comments explaining their purpose, parameters, and return values.
- **Example**:
  ```typescript
  /**
   * Calculates the factorial of a non-negative integer.
   * @param n The number to calculate the factorial of.
   * @returns The factorial of n.
   */
  function factorial(n: number): number {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    return n <= 1 ? 1 : n * factorial(n - 1);
  }
  ```

### 3. Error Handling
- Use `Result<T, E>` types for recoverable errors (implement `Result.ts` if not already available).
- Use `try-catch` blocks for operations that might throw synchronous errors.
- Avoid using `!` (non-null assertion) unless the condition is logically guaranteed.

### 4. State Management
- **General**: Prefer immutable state updates.
- **React**: Use hooks (`useState`, `useReducer`, `useEffect`) correctly.
- **Stores**: Follow the existing `Store<T>` pattern defined in `src/core/state/store.ts`.
  - Use `Store.create(initialState)` for new stores.
  - Use `store.get()` to read state.
  - Use `store.set(transform)` to update state immutably.
  - Use `store.subscribe(callback)` for side effects.

### 5. Testing
- All new features should include corresponding unit tests in `src/tests/`.
- Tests should be written using the existing Jest setup.
- Keep tests isolated and deterministic.
