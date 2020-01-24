export interface AppConfig {    
    API_ENDPOINT : string
   
  }  
  
export const CONFIG: AppConfig = {
    API_ENDPOINT : "https://hades-nrm-dot-techedge-es-nrm-des.appspot.com"
  };

export enum COMMAND {
    COUNT = "COUNT",
    LIMIT = "LIMIT",
    OFFSET = "OFFSET",
    ORDER_BY = "ORDER_BY",
    WHERE = "WHERE"
}

export enum Operator {
  ASC = "ASC",
  CONTAINS = "CONTAINS",
  DESC = "DESC",
  EQUALS = "EQUALS",
  GREATER = "GREATER",
  GREATER_OR_EQ = "GREATER_OR_EQ",
  IN = "IN",
  IS_NOT_NULL = "IS_NOT_NULL",
  IS_NULL = "IS_NULL",
  LOWER = "LOWER",
  LOWER_OR_EQ = "LOWER_OR_EQ",
  NOT_CONTAINS = "NOT_CONTAINS",
  NOT_EQUALS = "NOT_EQUALS"
}

export enum TextType {
  ASIS = "ASIS",
  CHALLENGE = "CHALLENGE",
  VALUE = "VALUE",
  SOLUTION = "SOLUTION",
  BENEFITS = "BENFITS"
}