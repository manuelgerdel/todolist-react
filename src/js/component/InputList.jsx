import React, { useEffect, useState } from "react"

// Crear usuario: done con thunder client
// Buscar lista de tareas: done 
// Mostrar lista de tareas: done
// Agregar tarea a base de datos con Enter: done 
// Borrar tarea de la api al borrar:

const urlBase = "https://express-blog-xa7v.onrender.com";
const urlUsername = "https://express-blog-xa7v.onrender.com/todo/users/manuelgerdel";

const emptyTask = { task: "" };
const InputList = () => {


	const [taskCreator, setTask] = useState(emptyTask);
	const [list, setList] = useState([]);
	const [apiTask, setApiTask] = useState({
		label: "",
		done: true,
	});


	const getList = async () => {
		const response = await fetch(urlUsername);
		const data = await response.json();
		//console.log(data)
		setList(data);
	}


	const handleChange = (event) => {
		const newTasks = { ...apiTask, [event.target.name]: event.target.value };
		setApiTask(newTasks);
	};

	const handleEnter = async (event) => {
		if (event.key === "Enter") {
			const array = [...list, apiTask];
			const response = await fetch(urlUsername, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(array),
			});

			if (response.ok) {
				getList();
			}
		};
	};

	const handleDelete = async (deleteIndex) => {
		const newList = list.filter((element, index) => index !== deleteIndex);
		const response = await fetch(urlUsername, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newList)
		});

		if (response.ok) {
			getList();
		};
	};

	useEffect(() => {
		getList();
	}, [])

	return (
		<div className="container"
			onKeyDown={handleEnter}
		>
			<div className="container d-flex justify-content-center w-100 ">
				<ul className="list-group shadow bg-body-tertiary rounded-0 w-50">
					<li className="list-group-item">
						<input type="text" name="label" value={apiTask.label} onChange={handleChange} className="text-area border border-0 w-100" placeholder="What needs to be done?"></input>
					</li>
					{list.map((element, index) => {
						return (
							<li className="list-group-item" key={index}>{element.label} <button className="btn" onClick={() => handleDelete(index)} ><i className="fa-solid fa-trash-can"></i></button></li>
						)
					})}


				</ul>
			</div>

		</div>
	);
};


export default InputList;


{/* Esto es lo que se va a insertar al agregar la lista <li className="list-group-item">Visual example</li> */ }