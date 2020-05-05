import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import Draggable from './Draggable';
import {range, inRange} from 'lodash';
import './App.css';

const HEIGHT = 80;

function App() {
  var MAX = 5;
  console.log("max", MAX);
  var items = range(MAX);
  
  const [state, setState] = useState({
    order: items,
    dragOrder: items,
    draggedIndex: null,
    id : null
  });
  const getDustbinCoordinates = () => {
    console.log(state);

    var index = items.indexOf(state.id);
    if (index > -1) {
    items.splice(index, 1);
    MAX--;
    
    }
    //items.splice(state.id, 1)
    //console.log(items);
  }
//   if (state.id){
//   setState(state => ({
//     ...state,
//   dragOrder: state.dragOrder.splice(state.id, 1)
// }));
// }
//console.log(state);
  const handleDrag = useCallback(({translation, id}) => {
    const delta = Math.round(translation.y / HEIGHT);
    const index = state.order.indexOf(id);
    const dragOrder = state.order.filter(index => index !== id);

    if (!inRange(index + delta, 0, items.length)){
      return;
    }
    dragOrder.splice(index + delta, 0, id);
    
    // var last = dragOrder.splice(-1, 1);
     //console.log(id);
     
    //  var arr = items;
    //  console.log(arr);
    //   arr = arr.splice(id, id);
    //  console.log(arr);
    // setState(state => ({
    //   ...state,
    //   draggedIndex: id,
    //   dragOrder: 
    // }));
    
    
    //console.log(dragOrder);
    setState(state => ({
      ...state,
      draggedIndex: id,
      id : id,
      //order : state.order.splice(state.id, 1),
      dragOrder
    }));
  }, [state.order, items.length]);

  const handleDragEnd = useCallback(() => {
    setState(state => ({
      ...state, 
      order: state.dragOrder,
      draggedIndex: null
    }));
    //console.log(state.dragOrder);
    

  }, []);

  return (
    <div >
    <Container>
      {items.map(index => {
        const isDragging = state.draggedIndex === index;
        const draggedTop= state.order.indexOf(index) * (HEIGHT + 10);
        const top = state.dragOrder.indexOf(index) * (HEIGHT + 10);
        return (
          <Draggable
          key={index}
          id={index}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          >
          <Rect 
          isDragging={isDragging}
          top={isDragging ? draggedTop : top}
          >
            {index}
          </Rect>
          </Draggable>
        );
      })}
    </Container>
    <div onMouseOver={getDustbinCoordinates} id= "dustbin" className="dustbin-icon"></div>
    </div>
  );
}

export default App;

const Container = styled.div`
  margin-top: 100px;
  width: 100vw;
  min-height: 100vh;
`;

const Rect = styled.div.attrs(props => ({
  style: {
    top: `${props.top}px`,
    transition: props.isDragging ? 'none' : 'all 250ms'
  }
}))`
  width: 300px;
  height: ${HEIGHT}px;
  user-select: none;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%,
  rgba(0,212,255,1) 100%);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: calc(50vw - 150px);
  font-size: 20px;
  border-radius: 10px;

  color: #fff;
  top: ${({ top }) => `${top}px`};
  
`;