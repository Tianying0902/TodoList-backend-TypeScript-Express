import Connection from 'mysql/lib/Connection';
import {type} from 'os';
type ITodo = {id:number,task:string,completed:boolean}
type SqlConnection = ()=>Connection;
type QueryPromise = (query:string,fn:Function)=>Promise<void>;
