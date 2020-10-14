import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import style from "./style.css";
const ItemWrap = styled.div`
  text-align: center;
`;

const SignalVertical = () => {
  const [taskList, setTaskList] = useState([]);

  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item-${k}`,
    }));

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: "8px",
    margin:"8px",
    width: "100px",
    height: "60px",
    lineHeight: "45px",
    textAlign: "center",
    display: "inline-block",

    // change background color if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    display: "flex",
    padding: "8px",
    // width: window.innerWidth,
    width: "100%",
    flexWrap: "wrap",
  });

  /**
   * 重排数组
   * @param {*} list 改变的数据源
   * @param {*} startIndex 起始位置的索引
   * @param {*} endIndex 结束位置的索引
   */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }

    const newTaskList = reorder(
      taskList,
      result.source.index,
      result.destination.index
    );
    setTaskList(newTaskList);
  };

  useEffect(() => {
    setTaskList(getItems(22));
  }, []);

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
      {/* droppableId="drop" direction="horizontal" */}
        <Droppable  droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className={style.SignalVertical}
            >
              {taskList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <ItemWrap>{item.content}</ItemWrap>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SignalVertical;
