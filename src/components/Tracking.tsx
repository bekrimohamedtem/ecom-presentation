import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

function PageTracking() {
	const [trackings, setTrackings] = React.useState([
		{
			id: 1,
			tracking: "TN12345",
			nom: "Colis A",
			statut: "En transit",
			expediteur: "Alice",
			destinataire: "Bob",
			dateEnvoi: "20/11/2025",
			dateLivraison: "25/11/2025",
		},
		{
			id: 2,
			tracking: "TN12346",
			nom: "Colis B",
			statut: "Livré",
			expediteur: "Charlie",
			destinataire: "Ahmed",
			dateEnvoi: "18/11/2025",
			dateLivraison: "21/11/2025",
		},
		{
			id: 3,
			tracking: "TN12347",
			nom: "Colis C",
			statut: "Retourné",
			expediteur: "Mohamed",
			destinataire: "Sara",
			dateEnvoi: "19/11/2025",
			dateLivraison: "22/11/2025",
		},
	]);

	const [searchTerm, setSearchTerm] = React.useState("");
	const [filteredTrackings, setFilteredTrackings] = React.useState(trackings);

	React.useEffect(() => {
		setFilteredTrackings(trackings);
	}, [trackings]);

	const handleDelete = (id: number) => {
		setTrackings(trackings.filter((t) => t.id !== id));
	};

	const handleEdit = (id: number) => {
		alert(`Modifier le suivi du colis ${id}`);
	};

	const applyFilter = React.useCallback(
		(term: string) => {
			const normalized = term.trim().toLowerCase();
			if (!normalized) {
				setFilteredTrackings(trackings);
				return;
			}
			const matches = trackings.filter((t) =>
				[t.tracking, t.nom, t.statut, t.expediteur, t.destinataire].some(
					(field) => field.toLowerCase().includes(normalized)
				)
			);
			setFilteredTrackings(matches);
		},
		[trackings]
	);

	React.useEffect(() => {
		applyFilter(searchTerm);
	}, [searchTerm, applyFilter]);

	const handleFilter = () => {
		applyFilter(searchTerm);
	};

	return (
		<div className="font-sans p-4">
			<div className="text-lg font-bold mb-4">Liste de suivi </div>

			<div className="bg-gray-200/30 rounded-lg p-4 w-[98%] mx-auto">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-xl font-normal">Tracking :</h3>

					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Rechercher par tracking, statut, destinataire..."
						className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 min-w-[240px]"
					/>

					<div className="flex gap-4">
						<button
							className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-md hover:scale-105 transition-transform"
							onClick={() => alert("Ajouter un suivi")}
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
									"Tracking",
									"Colis",
									"Statut",
									"Expéditeur",
									"Destinataire",
									"Date Envoi",
									"Date Livraison",
									"Action",
								].map((head) => (
									<th key={head} className="p-2">
										{head}
									</th>
								))}
							</tr>
						</thead>

						<tbody>
							{filteredTrackings.map((t) => (
								<tr key={t.id} className=" rounded-md">
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{t.tracking}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{t.nom}
									</td>
									<td className="p-2">{t.statut}</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{t.expediteur}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{t.destinataire}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{t.dateEnvoi}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{t.dateLivraison}
									</td>
									<td className="flex justify-center gap-2 p-2">
										<button
											className="bg-blue-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
											onClick={() => handleEdit(t.id)}
										>
											<EditIcon fontSize="small" />
										</button>
										<button
											className="bg-red-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
											onClick={() => handleDelete(t.id)}
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

export default PageTracking;
