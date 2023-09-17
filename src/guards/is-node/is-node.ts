/**
 * Checks whether a given value is a Node.
 *
 * @param   value   The value being evaluated.
 *
 * @returns         Whether the value is a Node
 */
export const isNode = (value: unknown): value is Node => value instanceof Node;
