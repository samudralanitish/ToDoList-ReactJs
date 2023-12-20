import { useEffect, useState } from "react";
import "./useStatePractice.css";
import { IoIosSunny } from "react-icons/io";
import { IoIosMoon } from "react-icons/io";

const TodoList = () => {
  // hooks
  const [message, setMessage] = useState({ text: "", id: "" });
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState({ id: "", isEditing: false });
  const [color, setColor] = useState("white");
  const[text,setText]=useState('');

  useEffect(() => {
    document.body.style.backgroundColor = color;
    {
        color==="black"?document.body.style.color='white':document.body.style.color='#333b3c'
    }
  });

  // functions
  function myFun() {
    if (color === "white") {
      setColor("black");
    } else {
      setColor("white");
    }
  }

  const changeMessage = (e) => {
    setMessage({
      text: e.target.value,
      id: "",
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (message.text == "") {
      window.alert("Enter something");
    } else {
      const Todo = {
        text: message.text,
        id: new Date().getTime().toString(),
      };
      setList([...list, Todo]);
      setMessage({ text: "", id: "" });
    }
  };

  const handleDelete = (comingId) => {
    const filteredOne = list.filter((obj) => {
      return obj.id !== comingId;
    });
    setList(filteredOne);
  };

  const changeEditState = (comingId) => {
    setEdit({
      ...edit,
      id: comingId,
      isEditing: true,
    });
    const editableItem = list.find((obj) => {
      return obj.id === comingId;
    });
    setMessage({ ...message, text: editableItem.text, id: editableItem.id });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const modifyItem = list.map((obj) => {
      if (obj.id === edit.id) {
        return {
          text: message.text,
          id: edit.id,
        };
      } else {
        return obj;
      }
    });
    setList(modifyItem);
    setEdit({ id: "", isEditing: false });
    setMessage({ text: "", id: "" });
  };

  return (
    <section className="box">
      <span className="title">Todo List</span>
      <button onClick={myFun} className="mode">
        {
            color==='white' ? <IoIosMoon/>:<IoIosSunny/>
        }
      </button>
      <form>
        <input
          type="text"
          id="message"
          name="message"
          placeholder="Enter a message"
          value={message.text}
          onChange={changeMessage}
          required
        />
        <br />
        <br />
        {edit.isEditing ? (
          <button className="btn-add" onClick={handleEdit}>
            Edit Todo
          </button>
        ) : (
          <button className="btn-add" onClick={handleAdd}>
            Add to Todo List
          </button>
        )}
      </form>
      <hr />
      {list.length === 0 && (
        <h1 className="no-item-text">There is no items in the List</h1>
      )}
      <ul>
        {list.map((obj) => {
          const { text, id } = obj;
          return (
            <li key={id}>
              <div className="todo-item">{text}</div>
              <button className="todo-edit" onClick={() => changeEditState(id)}>
                Edit
              </button>
              <button className="todo-delete" onClick={() => handleDelete(id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TodoList;
