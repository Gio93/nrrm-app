import { number, array } from "prop-types"

export interface AppPage {
  url: string;
  icon: object;
  title: string;
}

export interface ProgressChartInfo{
  data:Array<any>;
  width:number;
  height:number;
  innerRadius:number;
  outerRadius:number;
}

export interface CardInfo {
  cardId:number;
  title:string;
  description:string;
  technologies:Array<TechnologiesInvolvedDto>;
  types : Array<RippleTypeDto>;
  implementationType : Array<RippleImplementationTypeDto>;
  owner: string;
  progress: number;
  onClick : Function;
}

export interface searchableRippleInfo extends RippleInfo{
    selected? : boolean
}
export interface RippleInfo{

    id :	number;    

    uuid:string;    

    name:string;   

    predecessor: RippleInfo;

    smallDescription:string;

    progressDegree:number;

    rippleOwner:string;        

    plImpactRangeLower:number;
    //Impact range lower of the ripple

    plImpactRangeHigher:number;
    //Impact range higher of the ripple
    
    costRangeLower:number;
    //Cost range lower of the ripple
    
    costRangeHigher:number;
    //Cost range higher of the ripple
    
    timeRangeLower:number;
    //Time range lower of the ripple
    
    timeRangeHigher:number;
    //Time range higher of the ripple
    
    complexityPercentage:number;
    //Complexity percentage of the ripple
    
    impactPercentage:number;
    //Impact percentage of the ripple
    
    reefBreak:boolean;
    //Reef break of the ripple
    
    tenant : TenantDto;

    type: RippleTypeDto;

    businessArea:RippleBussinesAreaDto;

    implementationType:RippleImplementationTypeDto;

    technologiesInvolved:Array<TechnologiesInvolvedDto>;

    texts : Array<TextDto>;

    rippleRoleables : Array<RoleableDto>;
    
    
}

export interface TechnologiesInvolvedDto{
  id:number;
  //Technologies involved numeric id
  
  uuid:string;
  //Technologies involved string uuid
  
  technologiesType:string;
  //Technologies involved type string field
  
  tenant:TenantDto;
  }

export interface TechnologicalDto{
  //Ripple to belong to this technological
  
  id:number;
  //Text numeric id
  
  uuid:string;
  //Text string uuid
  
  tenant:TenantDto;
  technologiesInvolved:TechnologiesInvolvedDto;
  ripples:Array<RippleInfo>;
  
  }

export interface TechnologiesInvolvedDto{
  id:number;
  //Technologies involved numeric id
  
  uuid:string;
  //Technologies involved string uuid
  
  technologiesType:string;
  //Technologies involved type string field
  tenant:TenantDto;
  }
export interface RoleableDto{
  //Ripple to belong to this roleable
  
  id:number;
  //Ripple roleable numeric id
  
  uuid:string;
  //Ripple roleable string uuid
  
  percentage:number;
  //Ripple roleable percentage field
  
  tenant:TenantDto;
  rol:RolDto;
  }

export interface RolDto{
    id:number;
    //rol numeric id

    uuid:string;
    //rol string uuid

    rolType:string;
    //rol type string field

    tenant:TenantDto;

}
export interface TextDto{
  //Ripple to belong to this text
  
  id:number;
  //Text numeric id
  
  uuid:string;
  //Text string uuid
  
  type:string;
  //Type of rol
  
  text:string;
  //Text string field
  
  tenant:TenantDto;
  }

export interface RippleImplementationTypeDto{
  //Ripple implementation type to belong to this ripples
  
  id:number;
  //Ripple implementation type numeric id
  
  uuid:string;
  //Ripple implementation type string uuid
  
  implementationType:string;
  //Ripple implementation type string field
  
  tenant:TenantDto;
  }

export interface RippleBussinesAreaDto{
    //Ripple bussines area to belong to this ripples
    
    id:number;
    //Ripple bussines area numeric id
    
    uuid:string;
    //Ripple bussines area string uuid
    
    businessArea:string;
    //Ripple bussines area string field
    
    tenant:TenantDto;
    
}
export interface RippleTypeDto{
    //Ripple type to belong to this ripples
    
    id:number;
    //Ripple Type numeric id
    
    uuid:string;
    //Ripple Type string uuid
    
    rippleType:string;
    //Ripple Type string field
    
    tenant:TenantDto;
}

export interface TenantDto{
  
  //Tenant to belong to this ripples
  
  id:number;
  //Tenant numeric id
  
  uuid:string;
  //Tenant string uuid
  
  customer:string;
  //Customer to identify tenant
  
  description:string;
  //Description of the tenant
  
  users:Array<User>;
}

export interface RippleDiagramNode{
  id:number
  name:string,
  smallDescription:string,
  father:number,
  type:number,
  hasChildren:boolean,
  isOpened:boolean,
  highlighted:boolean,
  typeUUID:string,
  implementationTypeUUID:string,
  businessAreaUUID:string
} 

export interface User {

}

export interface RippleIndicator {
  id:	number,
  uuid:	string,
  tenant:	TenantDto,
  name:	string,
  alias: string,
  description: string,
  weight:	number,
  percentage:	number,
  partialPercentage:number,
  indicators: [RippleIndicator],
  indicatorGroup: RippleIndicator,
  grade: RippleGrade
}

export interface RippleGrade {
  id:	number,
  uuid:	string,
  tenant:	TenantDto,
  totalPercentage:	number,
  indicators: [RippleIndicator]
}

export interface RippleIndicatorInfo {
  State: string,
  current: number,
  remainder: number,
  total: number
}

export interface Filter  {key:string, value:string, type:number};
