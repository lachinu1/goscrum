/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/aria-props */
import { useState, useEffect } from "react"
import Skeleton from "react-loading-skeleton"
import { useResize } from "../../../hooks/useResize" // custom hook

import { Header } from "../../Header/Header"
import { TaskForm } from "../../TaskForm/TaskForm"
import { Card } from "../../Card/Card"

import { Radio, RadioGroup, FormControlLabel, FormControl } from "@mui/material"
import debounce from "lodash.debounce" // para evitar que se ejecute el submit cada vez que se presiona una tecla

import "./tasks.css"

// Redux
import { useSelector, useDispatch } from "react-redux"
import { getTasks, deleteTask, editTaskStatus } from "../../../store/actions/tasksActions" // acceso a la acción de obtener tareas

export const Tasks = () => {
	const [list, setList] = useState([]) // declaramos lista de tareas que recibimos de la API (nuevas)
	const [renderList, setRenderList] = useState([]) // declaramos lista de tareas a editar
	const [tasksFromWho, setTasksFromWho] = useState("ALL") // lista de tareas (Tareas de quien?)
	const [search, setSearch] = useState("") // declaramos search
	const { isPhone } = useResize()

	// Redux
	const dispatch = useDispatch()

	const { loading, error, tasks } = useSelector(state => { // trae el estado de la acción de obtener tareas de tasksReducer
		return state.tasksReducer // se obtiene el estado de la acción de getTasks
	})

	useEffect(() => {
		dispatch(getTasks(tasksFromWho === "ME" ? "/me" : "")) // se ejecuta el dispatch de getTasks, hace el fetch
	}, [tasksFromWho, dispatch]) // se ejecuta cuando cambia tasksFromWho, despachamos la acción de getTasks que actualiza el estado

	useEffect(() => {
		// se ejecuta cuando cambia la lista de tareas
		if (tasks?.length) { // si hay tareas
			setList(tasks) // se guardan las tareas en la lista
			setRenderList(tasks) // se guardan las tareas en la lista a editar
		}
	}, [tasks]) // se ejecuta cuando cambia la lista de tareas

	useEffect(() => {
		if (search) // si hay una búsqueda
			setRenderList(list.filter(data => data.title.startsWith(search))) // se filtra la lista de tareas por título
        else
            setRenderList(list)
	}, [search]) // se ejecuta cuando cambia search

    
	const renderAllCards = () => { // Función para renderizar Todas las cards
		return renderList.map(data => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus} />) // renderiza Todas las tareas
	}

	const renderColumnCards = text => { // Función para renderizar las cards tareas
		return renderList
			.filter(data => data.status === text) // filtra las tareas
			.map(data => <Card key={data._id} data={data} deleteCard={handleDelete} editCardStatus={handleEditCardStatus} />) // renderiza las tareas
	}

	const handleChangeImportance = e => {
		// Función para cambiar la importancia de las tareas
		if (e.target.value === "ALL") setRenderList(list) // si selecciona ALL se setea la lista de tareas
		else setRenderList(list.filter(data => data.importance === e.currentTarget.value)) // filtra las tareas por importancia
	}

	const handleSearch = debounce(e => { // Función para buscar tareas
		setSearch(e?.target?.value) // se setea el valor de search
	}, 1000) // se setea el debounce

	// Función para eliminar tareas, le pasa el id como parámetro
	const handleDelete = id => dispatch(deleteTask(id)) // se ejecuta el dispatch de deleteTask, hace el fetch

	// Función para editar el estado de las tareas
	const handleEditCardStatus = data => dispatch(editTaskStatus(data)) // se ejecuta el dispatch de editTasksStatus, hace el fetch

	if (error) return <div>Error</div> // si hay error, se muestra un mensaje

	return (
		<>
			<Header />
			<main id="tasks">
				<TaskForm />
				<section className="wrapper_list">
					<div className="list_header">
						<h2>Mis Tareas</h2>
					</div>
					<div className="filters">
						<FormControl>
							<RadioGroup
								row
								aria-labelledby="demo-row-radio-buttons-group-label"
								onChange={e => setTasksFromWho(e.currentTarget.value)} // Las dos opciones ALL y ME
							>
								<FormControlLabel value="ALL" control={<Radio color="primary" />} label="Todas" />
								<FormControlLabel value="ME" control={<Radio color="primary" />} label="Mis Tareas" />
							</RadioGroup>
						</FormControl>
						<div className="search">
							<input type="text" placeholder="Buscar por título..." onChange={handleSearch} />
						</div>
						<select name="importance" id="importance" onChange={handleChangeImportance}>
							<option value="">Selecciona una prioridad</option>
							<option value="ALL">Todas</option>
							<option value="HIGH">Alta</option>
							<option value="MEDIUM">Media</option>
							<option value="LOW">Baja</option>
						</select>
					</div>
					{/* Lista de tareas Mobile */}
					{isPhone ? (
						!renderList.length ? (
							<div>No hay tareas creadas</div>
						) : loading ? (
							<Skeleton heigth={90} />
						) : (
							<div className="list phone">{renderAllCards()}</div>
						)
					) : (
						//Lista de tareas Escritorio
						<div className="list_group">
							{!renderList.length ? (
								<div>No hay tareas creadas</div>
							) : loading ? (
								<Skeleton heigth={90} />
							) : (
								<>
									<div className="list">
										<h4>Nuevas</h4>
										{renderColumnCards("NEW")}
									</div>
									<div className="list">
										<h4>En Progreso</h4>
										{renderColumnCards("IN PROGRESS")}
									</div>
									<div className="list">
										<h4>Finalizadas</h4>
										{renderColumnCards("FINISHED")}
									</div>
								</>
							)}
						</div>
					)}
				</section>
			</main>
		</>
	)
}
