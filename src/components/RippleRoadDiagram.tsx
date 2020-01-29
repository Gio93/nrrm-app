import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import * as d3 from "d3";
import './RippleRoadDiagram.css'
import * as Treeviz from 'treeviz';
import { tsv } from "d3";
import { RippleDiagramNode } from "../declarations";
import { zoom } from "d3-zoom";



type State = {data:Array<RippleDiagramNode>};

class RippleRoadDiagram extends React.Component<any,State>{

  ref:any;
  myTree:any;
  allData:Array<RippleDiagramNode>;
  tmpData:Array<RippleDiagramNode>;

  constructor(props:any){
    super(props);
    //this.ref = useRef(null);
    console.debug("constructor");

    this.state = {
      data: props.data
    };

    if(this.state.data)
      {
        this.allData = this.state.data.slice();
        this.tmpData = this.state.data.slice();
      }

    this.ref = React.createRef(); 
  }

  

  componentDidMount(){
    console.debug("componentDidMount::Height:"+this.ref.current.clientHeight+" width:"+this.ref.current.clientWidth);
    setTimeout(() => {
      console.debug("Height:"+this.ref.current.clientHeight+" width:"+this.ref.current.clientHeight);
      if(this.ref.current.clientHeight+this.ref.current.clientHeight>0){
        this.paintDiagram();
      }
    }, 200);
    
  }

  getColorForType(type:any){
    switch(type){
      case 0:
        return "#ccc";
      case 1:
        return "#FFC107";
      case 2:
        return "#8BC34A";
      case 3:
        return "#00BCD4";
      default:
        return "#ddd"
    }
  }

  getBorderColorForType(type:any){
    switch(type){
      case 0:
        return "#aaa";
      case 1:
        return "#FFB107";
      case 2:
        return "#8BA34A";
      case 3:
        return "#009CD4";
      default:
        return "#bbb"
    }
  }

  getNodeTemplate(node:any){
    let border = this.getBorderColorForType(node.data.type);
    let color= this.getColorForType(node.data.type);

    return `<div 
              class='nodeBox' 
              style='cursor:pointer;
              height:${node.settings.nodeHeight}px; 
              width:${node.settings.nodeWidth}px;
              display:flex;
              flex-direction:column;
              justify-content:center;
              align-items:center;
              border-color:${border};
              background-color:${color};
              border-radius:20px;'>
              <div style='border-left:2px;border-color:red;width:150px'>
              <div style='margin-bottom:100px;text-align: center;'>${node.data.name}</div>
              </div>
            </div>`;
  }

  paintDiagram () {
    this.myTree = Treeviz.create({
      htmlId: this.ref.current.id,
      idKey: "id",
      hasFlatData: true,
      relationnalField: "father",
      hasZoom: true,
      hasPan:true,
      nodeWidth:20,
      nodeHeight:20,
      marginLeft:12,
      marginRight:4,
      marginTop:0,
      marginBottom:0,
      mainAxisNodeSpacing:"auto",
      secondaryAxisNodeSpacing:1,
      isHorizontal:true,
      renderNode: (node)=>this.getNodeTemplate(node),
      linkWidth : (nodeData)=> 1,
      linkShape:"curve",
      linkColor : (nodeData) => "#B0BEC5" ,
      onNodeClick : (nodeData) => {
        console.log(nodeData);
        if(this.props.onClickNode){
          // Call father onClickNode
          //this.props.onClickNode(nodeData);
        }
        //debugger;
        //this.removeChildrenFromParent(nodeData.data.id,[]);
        // while(let found = this.state.data.findIndex((a)=>a.father===nodeData.data.id)!==-1){
        //   this.state.data.splice(found,1);
        // }
        //this.setState({data:this.state.data.splice(1,1)});
        //this.setState({data:this.state.data.filter((el)=>el.father!==nodeData.data.id)});
        //this.state.data.push({ id: this.state.data.length+1, text_1: "new!", text_2: "new", father: nodeData.id,  color:"#00BCD4" });
        //this.updateData();
        // if(nodeData.id > 2)
        //   this.myTree.refresh(this.allData);
        // else this.updateData();
        if(this.findIfShowingChildren(nodeData.data.id)){
          //close
          let nArray = this.removeChildrenFromParent(nodeData.data.id);
          let obj=nArray.find((a)=>a.id==nodeData.data.id);
          obj.isOpened=false;
          this.tmpData=nArray;
          this.myTree.refresh(this.tmpData);
        }else{
          //open
          let nArray = this.addChildrenFromParent(nodeData.data.id);
          
          this.tmpData=this.tmpData.concat(nArray);
          let obj=this.tmpData.find((a)=>a.id==nodeData.data.id);
          obj.isOpened=true;
          this.tmpData.sort(function(a,b){ return a.id - b.id; });
          this.myTree.refresh(this.tmpData);
        }
      }
    });
    this.updateData();
  }

  findIfShowingChildren(nodeId:number){
    let children = this.tmpData.filter((el)=>el.father==nodeId);
    return children.length>0;
  }

  getIndicesFromChildrenForRemove(nodeId:number){
    let tmpData = this.tmpData.slice();
    let children = tmpData.filter((el)=>el.father==nodeId);
    console.log("CHILDREN OF "+nodeId+" are "+JSON.stringify(children));
    let indices:Array<number>=[];
    children.forEach((node)=>{
    console.log("looking for children of "+node.id);
    indices.push(tmpData.findIndex((a)=>a.id==node.id));
    if(indices && indices.length>0)console.log("found "+JSON.stringify(indices));
    indices=indices.concat(this.getIndicesFromChildrenForRemove(node.id))
    });
    return indices;
    }

  getIndicesFromChildren(nodeId:number){
    let tmpData = this.allData.slice();
    let children = tmpData.filter((el)=>el.father==nodeId);
    console.log("CHILDREN OF "+nodeId+" are "+JSON.stringify(children));
    let indices:Array<number>=[];
    children.forEach((node)=>{
    console.log("looking for children of "+node.id);
    indices.push(tmpData.findIndex((a)=>a.id==node.id));
    if(indices && indices.length>0)console.log("found "+JSON.stringify(indices));
    indices=indices.concat(this.getIndicesFromChildren(node.id))
    });
    return indices;
    }

    addChildrenFromParent(nodeId:number){
      let tmpData:Array<RippleDiagramNode> = []; 
      let toAdd = this.getIndicesFromChildren(nodeId);
      for (var i = toAdd.length -1; i >= 0; i--)
        tmpData.push(this.allData[toAdd[i]]);
      return tmpData;
    }
  removeChildrenFromParent(nodeId:number){   
    let tmpData = this.tmpData.slice(); 
    let toRemove = this.getIndicesFromChildrenForRemove(nodeId);
    toRemove.sort(function(a,b){ return b - a; });
    for (var i = 0; i < toRemove.length ; i++)
      tmpData.splice(toRemove[i],1);
    return tmpData;
  }

  updateData(){
    if(!this.myTree || !this.state.data) return;
    // Display the tree based on the data
    this.myTree.refresh(this.state.data);

    //debugger;
  }

  componentDidUpdate(prevProps:any, prevState:any){
    console.debug("componentDidUpdate::Height:"+this.ref.current.clientHeight+" width:"+this.ref.current.clientWidth);
    if ( prevState.data!== this.props.data) {
      if(this.props.data)this.setState({data:this.props.data});
      if(this.state.data){
        this.allData = this.state.data.slice();
        this.tmpData = this.state.data.slice();
        
      }
    }
    if(this.ref.current.clientHeight+this.ref.current.clientHeight>0){
      this.updateData();
    }
  }


  render() {
    return (
      <div ref={this.ref} id="tree" style={{ height:"700px", width:"100%"}}></div>
    );
  }
  

  
};

export default RippleRoadDiagram;
