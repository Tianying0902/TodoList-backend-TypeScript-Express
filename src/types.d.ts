export type ITodo = { id: number; task: string; completed: boolean };
export type SqlConnection = () => Object;
export type QueryPromise = (query: string, fn: Function) => Promise<void>;
