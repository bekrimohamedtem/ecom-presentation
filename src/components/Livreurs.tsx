import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

function PageLivreurs() {
	const [livreurs, setLivreurs] = React.useState([
		{
			id: 1,
			nom: "Ahmed",
			prenom: "Ali",
			telephone: "0555123456",
			email: "ahmed.ali@example.com",
			ville: "Alger",
			statut: "Actif",
		},
		{
			id: 2,
			nom: "Sara",
			prenom: "Benz",
			telephone: "0555987654",
			email: "sara.benz@example.com",
			ville: "Oran",
			statut: "Inactif",
		},
		{
			id: 3,
			nom: "Mohamed",
			prenom: "Said",
			telephone: "0555001122",
			email: "mohamed.said@example.com",
			ville: "Constantine",
			statut: "Actif",
		},
	]);

	const [searchTerm, setSearchTerm] = React.useState("");
	const [filteredLivreurs, setFilteredLivreurs] = React.useState(livreurs);

	React.useEffect(() => {
		setFilteredLivreurs(livreurs);
	}, [livreurs]);

	const handleDelete = (id: number) => {
		setLivreurs(livreurs.filter((l) => l.id !== id));
	};

	const handleEdit = (id: number) => {
		alert(`Modifier le livreur ${id}`);
	};

	const applyFilter = React.useCallback(
		(term: string) => {
			const normalized = term.trim().toLowerCase();
			if (!normalized) {
				setFilteredLivreurs(livreurs);
				return;
			}
			const matches = livreurs.filter((l) =>
				[l.nom, l.prenom, l.telephone, l.email, l.ville, l.statut].some(
					(field) => field.toLowerCase().includes(normalized)
				)
			);
			setFilteredLivreurs(matches);
		},
		[livreurs]
	);

	React.useEffect(() => {
		applyFilter(searchTerm);
	}, [searchTerm, applyFilter]);

	const handleFilter = () => {
		applyFilter(searchTerm);
	};

	return (
		<div className="font-sans bg-gray-200/70 h-full p-4">
			<div className="text-lg font-bold mb-4">Liste des livreurs</div>

			<div className="bg-gray-200/30 rounded-lg p-4 w-[98%] mx-auto">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-normal">Livreurs :</h3>

					<input
						type="text"
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						placeholder="Rechercher par nom, téléphone, ville..."
						className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 min-w-[240px]"
					/>

					<div className="flex gap-4">
						<button
							className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-md hover:scale-105 transition-transform"
							onClick={() => alert("Ajouter un livreur")}
						>
							<AddIcon /> Ajouter
						</button>
						<button
							className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:scale-105 transition-transform"
							onClick={handleFilter}
						>
							<FilterListIcon /> Filtrer
						</button>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full table-fixed border-separate border-spacing-2 text-center text-gray-800">
						<thead>
							<tr className="font-bold ">
								{[
									"Nom",
									"Prénom",
									"Téléphone",
									"Ville",
									"Statut",
									"Action",
								].map((head) => (
									<th key={head} className="p-2">
										{head}
									</th>
								))}
							</tr>
						</thead>

						<tbody>
							{filteredLivreurs.map((l) => (
								<tr key={l.id} className=" rounded-md">
									<td className="p-1 text-[14px] font-normal text-gray-700">{l.nom}</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">{l.prenom}</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">{l.telephone}</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">{l.ville}</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">{l.statut}</td>
									<td className="flex justify-center gap-2 p-2">
										<button
											className="bg-blue-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
											onClick={() => handleEdit(l.id)}
										>
											<EditIcon fontSize="small" />
										</button>
										<button
											className="bg-red-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
											onClick={() => handleDelete(l.id)}
										>
											<DeleteIcon fontSize="small" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default PageLivreurs;
