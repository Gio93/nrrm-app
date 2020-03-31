export const  getColorForType = (type:any)=>{
    switch(type){
      case 0:
        return "#ccc";
      case 1:
        return "#FFC107";
      case 2:
        return "#00BCD4";
      case 3:
        return "#8BC34A";
      case 4:
        return "#D35BD7";
      case 5:
        return "#734ccf";
      case 6:
        return "#ed785a";
      case 7:
        return "#ab5d0f";
      case 8:
        return "#0be6a8";
      case 9:
        return "#edba77";
      case 10:
        return "#bf3f43";
      default:
        return "#ddd"
    }
  };