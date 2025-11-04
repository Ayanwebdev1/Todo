"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'


const Main = () => {
  const [isDark, setisDark] = useState(true)
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [editindex, seteditindex] = useState(null)


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos")) || [];
    settodos(saved);
  }, [])

  const Savetolc = (data) => {
    localStorage.setItem("todos", JSON.stringify(data))
  }


  const AddorUpdate = () => {

    //   if (todo === "") return
    //   if (editindex !== null) {
    //     const newTodos = [...todos]
    //     newTodos[editindex].text = todo
    //     settodos(newTodos)

    //     Savetolc(newTodos)

    //     seteditindex(null)
    //     settodo("")

    //   } else {
    //     const newTodos = ([...todos, { text: todo, completed: false }])
    //     settodos(newTodos)
    //     Savetolc(newTodos)
    //     settodo("")

    //   }
    if (todo === "") return
    if (editindex !== null) {
      const newTodos = [...todos]
      newTodos[editindex].text = todo
      settodos(newTodos)
      Savetolc(newTodos)
      settodo("")
    } else {
      const newTodos = [...todos, { text: todo, completed: false }]
      settodos(newTodos)
      Savetolc(newTodos)
      settodo("")
    }

  }


  const HandleToggle = (e) => {
    settodo(e.target.value)

  }

  const toggleComplete = (index) => {

    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed
    settodos(newTodos)
    Savetolc(newTodos)
  }

  const Delete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index)
    settodos(newTodos)
    Savetolc(newTodos)
    settodo("")
    seteditindex(null)


  }

  const Edit = (index) => {
    settodo(todos[index].text)
    seteditindex(index)
  }


  useEffect(() => {

    document.body.style.backgroundColor = isDark ? "#000" : "#ffff"
    document.body.style.color = isDark ? "#ffff" : "#000"
    document.body.style.border = isDark ? "#ffff" : "#000"


  }, [isDark])




  return (
    <>
      <nav className='flex justify-between items-center p-4 border-none bg-[#0AB6AB] rounded-xl '>
        <div className="logo text-[30px] font-bold">Task<span>Pro</span></div>
        <ul className='flex gap-20 items-center'>
          <li className='hidden md:block'>Home</li>
          <li className='hidden md:block'>About</li>
          <li className='hidden md:block'>Contact</li>
          <li><Image onClick={() => setisDark(!isDark)} width={30} height={30} alt='Lightmode' src={isDark ? "/Lightmode.png" : "/Darkmode.png"}></Image></li>
        </ul>
      </nav>

      <h1 className='font-bold text-[25px] md:text-[30px] text-center mt-7'>Get It Done, with TaskPro</h1>

      <div className='flex justify-center mt-7 gap-3.5 '>
        <input onChange={HandleToggle} value={todo} className='border font-bold p-[15px] w-[60%]' type="text" placeholder='Enter your task' />
        <button onClick={() => AddorUpdate()} className='p-[15px] w-[70px] text-center border hover:scale-103 cursor-pointer bg-[#0AB6AB]  '>{editindex !== null ? "Update" : "Add"}</button>
      </div>
      <div>
        <ul className="flex flex-col items-center">
          {todos.map((t, index) => (
            //     <li
            //       key={index}
            //       className={`border mt-7 p-5 w-[90vw] overflow-hidden min-h-3 m-auto flex justify-between items-center 
            // ${isDark ? "bg-gray-400" : "bg-white"}`}
            //     >
            //       {/* Left side (checkbox + text) */}
            //       <div className="flex items-center gap-3">
            //         <input
            //           type="checkbox"
            //           checked={t.completed} // har task ka completed state
            //           onChange={() => toggleComplete(index)} // function to toggle
            //         />
            //         <span className={t.completed ? "line-through" : ""}>{t.text}</span>
            //       </div>

            //       {/* Right side (icons) */}
            //       <div className="flex items-center gap-3">
            //         <Image className='min-w-5 min-h-5' onClick={() => Edit(index)} width={20} height={20} alt="Edit" src="/Edit.png" />
            //         <Image className='min-w-5 min-h-5' onClick={() => Delete(index)} width={20} height={20} alt="Delete" src="/Delete.png" />
            //       </div>
            //     </li>
            <li
              key={index}
              className={`border mt-7 p-5 w-[90vw] overflow-hidden min-h-3 m-auto flex justify-between items-center 
    ${isDark ? "bg-gray-400" : "bg-white"}`}
            >
              {/* Left side (checkbox + text) */}
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="checkbox"
                  checked={t.completed} // har task ka completed state
                  onChange={() => toggleComplete(index)} // function to toggle
                />
                <span className={`${t.completed ? "line-through" : ""} wrap-break-word`}>
                  {t.text}
                </span>
              </div>

              {/* Right side (icons) */}
              <div className="flex items-center gap-3">
                <Image className='min-w-5 min-h-5' onClick={() => Edit(index)} width={20} height={20} alt="Edit" src="/Edit.png" />
                <Image className='min-w-5 min-h-5' onClick={() => Delete(index)} width={20} height={20} alt="Delete" src="/Delete.png" />
              </div>
            </li>

          ))}
        </ul>

      </div>
    </>
  )
}

export default Main