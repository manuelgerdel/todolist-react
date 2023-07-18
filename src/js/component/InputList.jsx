import React, { useState } from "react"

const emptyTask = { task: "" };
const InputList = () => {

	const [taskCreator, setTask] = useState(emptyTask)
	const [list, setList] = useState([])

	const handleChange = (event) => {
		const newTasks = { ...taskCreator, [event.target.name]: event.target.value };
		setTask(newTasks);
	};

	const handleEnter = (event) => {
		if (event.key === "Enter") {
			const array = [...list, taskCreator];
			setList(array);
		};
	};

	const handleDelete = (deleteIndex) => {
		const filterArray = list.filter((element, index) => index !== deleteIndex ) 
		setList(filterArray);
	};

	return (
		<div className="container" onKeyDown={handleEnter}>
			<div className="container d-flex justify-content-center w-100 ">
				<ul className="list-group shadow bg-body-tertiary rounded-0 w-50">
					<li className="list-group-item">
						<input type="text" name="task" onChange={handleChange} className="text-area border border-0 w-100" placeholder="What needs to be done?"></input>
					</li>
					{list.map((element, index) => {
						return (
							<li className="list-group-item" key={index}>{element.task} <button onClick={() => handleDelete(index)} >X</button></li>
						)
					})}


				</ul>
			</div>

		</div>
	);
};


export default InputList;


{/* Esto es lo que se va a insertar al agregar la lista <li className="list-group-item">Visual example</li> */ }