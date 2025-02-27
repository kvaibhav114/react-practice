import { useEffect, useState } from "react";

const App = () => {
  const [task, settask] = useState("");
  const [addTask, setaddTask] = useState([]);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem("tasks"));
    if (result) setaddTask(result);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(addTask));
  }, [addTask]);

  const handleonClick = () => {
    const updatedTask = [...addTask, task];
    setaddTask(updatedTask);
    settask("");
  };

  return (
    <div className="container mx-auto bg-gray-800 h-screen text-white">
      <div className="w-full max-w-3xl mx-auto p-5 rounded-lg">
        <h1 className="text-4xl text-center font-bold">ToDo List</h1>
        <div className="flex overflow-hidden mt-8">
          <input
            type="text"
            className="outline-none w-full p-2 mt-5 text-center text-black bg-white rounded-lg"
            placeholder="Add Task 📝"
            value={task}
            onChange={(e) => settask(e.target.value)}
          />
          <button
            className="bg-green-500 p-2 text-sm outline-none px-3 py-0.5 mt-5 mx-1 shrink-0 rounded-md hover:cursor-pointer"
            onClick={handleonClick}
          >
            Add Task
          </button>
        </div>
        <div className="mt-8">
          {addTask.map((item, index) => {
            return (
              <div key={index} className="flex justify-between mt-4">
                <p className="text-lg">{item}</p>
                <div>
                  <button
                    className="bg-blue-500 p-2 text-sm outline-none px-3 py-0.5 mt-5 mx-1 shrink-0 rounded-md hover:cursor-pointer"
                    onClick={() => {
                      const editTask = addTask[index];
                      settask(editTask);
                      const result = addTask.filter((_, i) => i !== index);
                      setaddTask(result);
                      localStorage.setItem("tasks", JSON.stringify(result));
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 p-2 text-sm outline-none px-3 py-0.5 mt-5 mx-1 shrink-0 rounded-md hover:cursor-pointer"
                    onClick={() => {
                      const result = addTask.filter((_, i) => i !== index);
                      setaddTask(result);
                      localStorage.setItem("tasks", JSON.stringify(result));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
