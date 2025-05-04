import { useEffect, useState } from "react";
import "./App.css";
import { FiX } from "react-icons/fi";
import axios from "axios";
import {Toaster} from 'sonner'
import { toast } from "sonner";


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen,setIsUpdateOpen]=useState(false)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [array, setArray] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [taskId,setTaskId]=useState('')

  // Toggles create task box
  const handleTaskOpen = () => {
    setIsOpen(!isOpen);
    setTitleError("");
    setDescriptionError("");
  };

  // Toggles update task box
const handleUpdateTaskOpen=(id)=>{
  setTaskId(id)
  setIsUpdateOpen(!isUpdateOpen)
  setTitleError("");
  setDescriptionError("");
}

// Fetches data from database
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks/get-tasks`
        );

        setArray((prev) => response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [refresh]);

// Function for creating task
  const handleClick = async () => {
    if (title == "") {
      setTitleError("Title is required");
      return;
    }
    if (description == "") {
      setDescriptionError("Description is required");
      return;
    }

    const newTask = {
      title: title,
      description: description,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/create-task`,
        newTask
      );
      setTitle("");
      setDescription("");
      handleTaskOpen();
      setRefresh((prev) => !prev);

      toast.success("Task Created Successfully", {
        style: {
          background: "black",
          color: "white",
          border: "1px solid black",
          borderRadius: "12px",
          padding: "15px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.5)",
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "30px",
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };


// Function for updating task
  const handleUpdateTask = async (id) => {
    if (title == "") {
      setTitleError("Title is required");
      return;
    }
    if (description == "") {
      setDescriptionError("Description is required");
      return;
    }

    const updatedTask = {
      title: title,
      description: description,
    };
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/update-task/${id}`,updatedTask
      );
      toast.success("Task Updated Successfully", {
        style: {
          background: "black",
          color: "white",
          border: "1px solid black",
          borderRadius: "12px",
          padding: "15px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.5)",
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "30px",
        },
      });
      setTitle("");
      setDescription("");
      handleUpdateTaskOpen();
      setRefresh((prev) => !prev);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Function for deleting task
  const handleDeleteTask = async(id) => {
    try {
      const response=await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/delete-task/${id}`)
      toast.success("Task Deleted Successfully", {
        style: {
          background: "black",
          color: "white",
          border: "1px solid black",
          borderRadius: "12px",
          padding: "15px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.5)",
          fontSize: "1rem",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "30px",
        },
      });
      setRefresh((prev) => !prev);
      return response.data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Toaster position='top-right' duration={1000}/>
      <div className="min-h-screen w-full bg-gray-100">
        <div className="flex items-center justify-center">
          <div className=" text-4xl font-bold text-center h-24  flex items-center justify-center ">
            Task Manager
          </div>
        </div>

        <div className="flex items-center justify-center mt-16">
          <div>
            <button
              className="bg-black w-full text-white px-4 py-2 rounded-lg text-xl font-semibold"
              onClick={handleTaskOpen}
            >
              Create Task
            </button>
          </div>
        </div>

        {isOpen ? (
          <div className="fixed top-0 w-full h-screen flex items-center justify-center z-10">
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-0"></div>

            <div className="bg-white w-[470px] z-10 flex flex-col lg:w-[700px]  rounded-lg p-8 lg:px-10 lg:pt-8 lg:h-[90%] ">
              <div className="p-2 text-2xl">
                <div className="flex items-center justify-between border-b-2 border-gray-400">
                  <label className="text-2xl font-bold">Create Task</label>
                  <button className="" onClick={handleTaskOpen}>
                    <FiX className=" w-8 h-12 text-gray-700 hover:text-black" />
                  </button>
                </div>

                <div>
                  <div className="mt-4 text-lg">Title:</div>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-300 border-2 mt-2  p-2 rounded-lg outline-none text-base"
                  value={title}
                  placeholder="Enter your title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (e.target.value) {
                      setTitleError("");
                    }
                  }}
                />
              </div>
              <p className="h-5 text-red-600 ml-4">{titleError}</p>
              <div className="p-2 text-lg">
                <label>Description:</label>
                <textarea
                  type="text"
                  className="w-full border-gray-300 border-2 mt-2 h-72  p-2 rounded-lg outline-none text-base"
                  value={description}
                  placeholder="Enter description here"
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (e.target.value) {
                      setDescriptionError("");
                    }
                  }}
                />
              </div>
              <p className="h-5 text-red-600 ml-4">{descriptionError}</p>
              <div className="flex items-center justify-end mt-4">
                <div className=" ">
                  <button
                    className="mr-2 bg-black text-white px-4 py-1  text-lg rounded-lg"
                    onClick={handleClick}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {isUpdateOpen ? (
          <div className="fixed top-0 w-full h-screen flex items-center justify-center z-10">
            <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-0"></div>

            <div className="bg-white w-[470px] z-10 flex flex-col lg:w-[700px]  rounded-lg p-8 lg:px-10 lg:pt-8 lg:h-[90%] ">
              <div className="p-2 text-2xl">
                <div className="flex items-center justify-between border-b-2 border-gray-400">
                  <label className="text-2xl font-bold">Update Task</label>
                  <button className="" onClick={handleUpdateTaskOpen}>
                    <FiX className=" w-8 h-12 text-gray-700 hover:text-black" />
                  </button>
                </div>

                <div>
                  <div className="mt-4 text-lg">Title:</div>
                </div>
                <input
                  type="text"
                  className="w-full border-gray-300 border-2 mt-2  p-2 rounded-lg outline-none text-base"
                  value={title}
                  placeholder="Enter your title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (e.target.value) {
                      setTitleError("");
                    }
                  }}
                />
              </div>
              <p className="h-5 text-red-600 ml-4">{titleError}</p>
              <div className="p-2 text-lg">
                <label>Description:</label>
                <textarea
                  type="text"
                  className="w-full border-gray-300 border-2 mt-2 h-72  p-2 rounded-lg outline-none text-base"
                  value={description}
                  placeholder="Enter description here"
                  onChange={(e) => {
                    setDescription(e.target.value);
                    if (e.target.value) {
                      setDescriptionError("");
                    }
                  }}
                />
              </div>
              <p className="h-5 text-red-600 ml-4">{descriptionError}</p>
              <div className="flex items-center justify-end mt-4">
                <div className=" ">
                  <button
                    className="mr-2 bg-black text-white px-4 py-1  text-lg rounded-lg"
                    onClick={() => handleUpdateTask(taskId)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {array.length > 0 ? (
          <div className="flex xl:items-center xl:justify-center overflow-x-auto w-full  font-medium text-base mt-8">
            <div className="min-w-[1150px] xl:w-[95%] mt-8 mb-2  mx-6 lg:ml-8 xl:mx-0  border-2 border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="text-lg font-bold">
                  <tr className="bg-gray-200 text-gray-900 ">
                    <th className="border-gray-200 border-b-2 px-4 py-4 w-[50px] border-r-2 border-t-2">
                      S.No
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-4 md:w-[200px] border-r-2  border-t-2">
                      Title
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-4 border-r-2 border-t-2">
                      Description
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-4 w-[170px] border-t-2">
                      Created at
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-4 w-[100px] border-r-2 border-t-2">
                      Update
                    </th>
                    <th className="border-gray-200 border-b-2 px-4 py-4 w-[100px] border-r-2 border-t-2">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {array.map((arr, index) => (
                    <tr
                      key={arr._id}
                      className="text-center hover:bg-gray-200 bg-white text-[16px] text-gray-900"
                    >
                      <td className="border-gray-100 border-b-2 border-r-2 px-4 py-2">
                        {index + 1 + "."}
                      </td>
                      <td className="border-gray-100 border-b-2 px-4 py-2 border-r-2 text-left">
                        {arr.title}
                      </td>
                      <td className="border-gray-100 border-b-2 px-4 py-2 text-left border-r-2">
                        {arr.description}
                      </td>
                      <td className="border-gray-100 border-b-2 px-2 py-2 font-normal">
                        {new Date(arr.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })}
                      </td>
                      <td className="border-gray-100 border-b-2 px-4 py-2 border-r-2">
                        <button
                          className="bg-black w-full text-white px-2 py-1 rounded-lg"
                          onClick={() => handleUpdateTaskOpen(arr._id)}
                        >
                          Update
                        </button>
                      </td>
                      <td
                        className={`border-gray-100 border-b-2 px-3 py-2 border-r-2 `}
                      >
                        <button
                          className="bg-black w-full text-white px-2 py-1 rounded-lg"
                          onClick={() => handleDeleteTask(arr._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <div className="bg-gray-200 mt-8 text-2xl font-bold text-center h-24 w-[90%] flex items-center justify-center sm:w-[95%] ">
              No tasks created
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
