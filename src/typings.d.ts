/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/*
To import Jsons in unit test componenets
*/
declare module "*.json" {
  const value: any;
  export default value;
}