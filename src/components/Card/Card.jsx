import React, { useState } from "react"
import "./card.css"

export const Card = ({
	deleteCard,
	editCardStatus,
	data: {
		_id,
		title,
		createdAt,
		user: { userName },
		description,
		status,
		importance,
	},
	data, // lo volvemos a definir
}) => {
	// Recibe las props de data.js

	const limitString = string => {
		// Limitador string
		if (string.length > 170) return { string: string.slice(0, 167).concat("..."), addButton: true }
		return { string, addButton: false }
	}

	const [showMore, setShowMore] = useState(false) // Mostrar más o no

	const datetime = new Date(createdAt).toLocaleString().concat(" hs.") // Fecha y hora de creación

	return (
		<div className="card">
			<div className="close" onClick={() => deleteCard(_id)}>
				x
			</div>
			<h3>{title}</h3>
			<h6>{datetime}</h6>
			<h5>Creada por: {userName}</h5>
			<button className={status === "NEW" ? "new" : status === "IN PROGRESS" ? "inProgress" : "finished"} type="button" onClick={() => editCardStatus(data)}>
				{status}
			</button>
			<button className={importance === "HIGH" ? "high" : importance === "MEDIUM" ? "medium" : "low"} type="button">
				{importance}
			</button>
			{!showMore && <p>{limitString(description).string}</p>} {/* Si no se muestra más, se muestra la descripción */}
			{showMore && ( // Si se muestra más, se muestra la descripción completa
				<>
					<p>{description}</p>
					<button onClick={() => setShowMore(false)}>Ver menos</button>
				</>
			)}
			{!showMore &&
				limitString(description).addButton && ( // Si no se muestra ver más
					<button onClick={() => setShowMore(true)}>Ver más</button>
				)}
		</div>
	)
}
