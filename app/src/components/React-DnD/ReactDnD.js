import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Setting up the Drag and Drop Context
const Board = () => <DndProvider backend={HTML5Backend}>...</DndProvider>;

// Define Drag Typs
export const ItemTypes = {
  KNIGHT: "knight",
};

// Make the Knight Draggable
/*
useDrag - accepts a specification object. The item.typeproperty is required, and specifies the type of item being dragged. We could also attach extra information here to identify the kind of piece being dragged, but since this is a toy application we only need to define the type.
collect - defines a collector function: this is basically a way to transform state from the drag-and-drop system into usable props for your components.

The result array contains:
- A props object as the first item - this contains the properties you collected from the drag-and-drop system.
- A ref function as the second item. This is used to attach your DOM elements to react-dnd.
*/

export const Knight = () => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.KNIGHT },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      ♘
    </div>
  );
};

export const BoardSquare = ({ x, y, children }) => {
  const black = (x + y) % 2 === 1;
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    drop: () => moveKnight(x, y),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
    </div>
  );
};
