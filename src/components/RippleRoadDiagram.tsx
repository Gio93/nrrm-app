import React , { useState }  from "react";
import './RippleRoadDiagram.css'
import * as Treeviz from 'treeviz';
import { RippleDiagramNode } from "../declarations";
import { IonPopover, IonButton } from '@ionic/react';
// import { PropTypes } from 'react';

type State = {
  data: Array<RippleDiagramNode>, 
  border: any, 
  color: any,
  
};

class RippleRoadDiagram extends React.Component<any,State>{

  
  ref:any;
  myTree:any;
  allData:Array<RippleDiagramNode>;
  tmpData:Array<RippleDiagramNode>;
  maxLevels: number = 0;
  ev:any;
  nodeValue:any;
  selectedNode: RippleDiagramNode;
  nodeData: number;



  constructor(props:any){
    super(props);
    //this.ref = useRef(null);
    this.getNodeTemplate = this.getNodeTemplate.bind(this);
    // console.debug("constructor");
    // debugger;
    this.state = {
      data: props.data,
      border: props.getBorderFromParent,
      color: props.getColorFromParent,
      
    };
    
    if(this.state.data){
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
    }, 1000);
  }
  
  getNodeTemplate(node:any){
    let border = this.props.getBorderFromParent(node.data.type);
    let color = this.props.getColorFromParent(node.data.type);
    
    return `<div 
              class='nodeBox' 
              style='cursor:pointer;
              height:${node.settings.nodeHeight}px; 
              width:${node.settings.nodeWidth}px;
              display:flex;
              flex-direction:column;
              justify-content:center;
              align-items:center;
              border-color:${node.data.isSelected ? 'gray' : border};
              border-width: ${node.data.isSelected ? '5px' : '1px'};
              background-color:${color};
              ${(node.data.highlighted)?"box-shadow: 0px 0px 20px 9px "+border+";":"box-shadow:none;"}
              border-radius:20px;'>
                <div style='border-left:2px;border-color:red;width:150px'>
                  <div style='margin-bottom:100px;text-align: center;'>${node.data.name} </div>
                </div>
            </div>`;
  }


  // border-color:${node.data.hasChildren && !node.data.isOpened && !node.children ? 'gray' : border};
  // border-width: ${node.data.hasChildren && !node.data.isOpened && !node.children ? '5px' : '1px'};

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
      marginLeft:20,
      marginRight:20,
      marginTop:0,
      marginBottom:0,
      mainAxisNodeSpacing:"auto",
      secondaryAxisNodeSpacing:1,
      isHorizontal:true,
      renderNode: (node) => this.getNodeTemplate(node),
      linkWidth: (nodeData) => 1,
      linkShape: "curve",
      linkColor: (nodeData) => "#B0BEC5" ,
      onNodeClick: (nodeData) => {
        if(this.findIfShowingChildren(nodeData.data.id)){
          // close
          let nArray = this.removeChildrenFromParent(nodeData.data.id);
          let obj=nArray.find((a)=>a.id===nodeData.data.id);
          obj.isOpened=false;
          console.log("Esto es la nodeData", nodeData);
          
          this.tmpData=nArray;
          // this.myTree.refresh(this.tmpData);
          
        }else{
          // open
          let nArray = this.addChildrenFromParent(nodeData.data.id);
          this.tmpData=this.tmpData.concat(nArray);
          let obj=this.tmpData.find((a)=>a.id===nodeData.data.id);
          obj.isOpened=true;
          this.tmpData.sort(function(a,b){ return a.id - b.id; });
          // this.myTree.refresh(this.tmpData);
        }
        this.setSelectedNode(nodeData.data.id);
        this.myTree.refresh(this.tmpData);
      }
    });
    this.updateData();
  }


  setSelectedNode(nodeId: number) {
    let node = this.tmpData.find((a)=>a.id === nodeId);
    this.allData.forEach((node) => {
      node.isSelected = false;
    });
    node.isSelected = true;
    this.selectedNode = node;
    console.log("QUE ME TRAE EL NODE?", node);
    this.sendData();

  }

  sendData() {
    this.props.parentCallback(this.selectedNode);
  }
  
  findIfShowingChildren(nodeId:number){
    let children = this.tmpData.filter((el)=>el.father===nodeId);
    return children.length>0;
  }

  getIndicesFromChildrenForRemove(nodeId:number){
    let tmpData = this.tmpData.slice();
    let children = tmpData.filter((el) => el.father === nodeId);
    let indices:Array<number> = [];
    children.forEach((node) => {
      indices.push(tmpData.findIndex((a) => a.id === node.id));
      if (indices && indices.length>0) {
        indices = indices.concat(this.getIndicesFromChildrenForRemove(node.id));
      }
    });
    return indices;
  }

  getIndicesFromChildren(nodeId:number){
    let tmpData = this.allData.slice();
    let children = tmpData.filter((el) => el.father === nodeId);
    let indices:Array<number> = [];
    children.forEach((node)=>{
      indices.push(tmpData.findIndex((a)=>a.id===node.id));
      if (indices && indices.length>0) {
        indices=indices.concat(this.getIndicesFromChildren(node.id));
      }
    });
    return indices;
  }

  addChildrenFromParent(nodeId:number){
    let tmpData:Array<RippleDiagramNode> = []; 
    let toAdd = this.getIndicesFromChildren(nodeId);
    for (var i = toAdd.length -1; i >= 0; i--) {
      tmpData.push(this.allData[toAdd[i]]);
    }
    return tmpData;
  }

  removeChildrenFromParent(nodeId:number){   
    let tmpData = this.tmpData.slice();
    let toRemove = this.getIndicesFromChildrenForRemove(nodeId);
    toRemove.sort(function(a,b){ return b - a; });
    for (var i = 0; i < toRemove.length ; i++) {
      tmpData.splice(toRemove[i],1);
    }
    return tmpData;
  }

  updateData(){
    if(!this.myTree || !this.state.data) return;
    // Display the tree based on the data
    this.myTree.refresh(this.state.data);
  }

  componentDidUpdate(prevProps:any, prevState:any){
    console.debug("componentDidUpdate::Height:"+this.ref.current.clientHeight+" width:"+this.ref.current.clientWidth);
    if(prevState.data!== this.props.data){
      if (this.props.data) {
        this.setState({
          data: this.props.data
        });
      }
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
      <div ref={this.ref} id="tree" style={{
        width: this.props.maxLevels > 0 ? (this.props.maxLevels * 200) + 'px' : '90%',
        margin: this.props.maxLevels * 200 > window.innerWidth ? '0 5%' : '0 auto'
      }}>
      </div>
    );
  }
};

export default RippleRoadDiagram;
