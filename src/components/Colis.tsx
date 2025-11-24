import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

function PageColis() {
	const [colis, setColis] = React.useState([
		{
			numero: 1,
			tracking: "TN12345",
			nom: "Colis A",
			quantity: 2,
			price: 1500,
			expediteur: "Alice",
			destinataire: "Bob",
			adresse: "Alger, Algérie",
			statut: "En transit",
			dateEnvoi: "20/11/2025",
			dateLivraison: "25/11/2025",
		},
		{
			numero: 2,
			tracking: "TN12346",
			nom: "Colis B",
			quantity: 1,
			price: 2500,
			expediteur: "Charlie",
			destinataire: "Ahmed",
			adresse: "Oran, Algérie",
			statut: "Livré",
			dateEnvoi: "18/11/2025",
			dateLivraison: "21/11/2025",
		},
		{
			numero: 3,
			tracking: "TN12347",
			nom: "Colis C",
			quantity: 1,
			price: 1200,
			expediteur: "Mohamed",
			destinataire: "Sara",
			adresse: "Constantine, Algérie",
			statut: "Retourné",
			dateEnvoi: "19/11/2025",
			dateLivraison: "22/11/2025",
		},
	]);

	const [searchTerm, setSearchTerm] = React.useState("");
	const [filteredColis, setFilteredColis] = React.useState(colis);

	React.useEffect(() => {
		setFilteredColis(colis);
	}, [colis]);

	const handleDelete = (tracking: string) => {
		setColis(colis.filter((c) => c.tracking !== tracking));
	};

	const handleEdit = (tracking: string) => {
		alert(`Modifier le colis ${tracking}`);
	};

	const applyFilter = React.useCallback(
		(term: string) => {
			const normalized = term.trim().toLowerCase();
			if (!normalized) {
				setFilteredColis(colis);
				return;
			}

			setFilteredColis(
				colis.filter((c) =>
					[
						c.tracking,
						c.nom,
						c.expediteur,
						c.destinataire,
						c.statut,
						c.adresse,
					].some((field) => field.toLowerCase().includes(normalized))
				)
			);
		},
		[colis]
	);

	React.useEffect(() => {
		applyFilter(searchTerm);
	}, [searchTerm, applyFilter]);

	return (
		<div className="font-roboto">
			<div className="text-lg font-bold m-4">Colis list</div>
			<div className="bg-gray-200 rounded-lg w-[98%] mx-auto p-4 relative bottom-0">
				<div className="flex justify-between items-center p-0 px-4 mb-4">
					<h3 className="text-[20px] font-normal">Colis :</h3>

					<div>
						<input
							type="text"
							placeholder="Rechercher par tracking, nom, statut..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="px-4 py-2 rounded-full border border-gray-300 bg-white min-w-[240px] text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-blue-300"
						/>
					</div>

					<div className="flex gap-8">
						<button className="bg-black text-white px-2 py-1 rounded-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1">
							<AddIcon /> add colis
						</button>
						<button
							className="bg-blue-600 text-white px-2 py-1 rounded-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1"
							onClick={() => applyFilter(searchTerm)}
						>
							<FilterListIcon /> Filter
						</button>
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full table-fixed border-separate border-spacing-2 text-center text-black">
						<thead>
							<tr>
								{[
									"Tracking",
									"Produit",
									"Quantité",
									"Prix",
									"Expéditeur",
									"Destinataire",
									"Numéro",
									"Adresse",
									"Statut",
									"Date Envoi",
									"Date Livraison",
									"Action",
								].map((h) => (
									<th key={h} className="p-2 font-bold">
										{h}
									</th>
								))}
							</tr>
						</thead>

						<tbody>
							{filteredColis.map((c) => (
								<tr key={c.tracking} className=" rounded-md">
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.tracking}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.nom}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.quantity}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.price}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.expediteur}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.destinataire}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.numero}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.adresse}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.statut}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.dateEnvoi}
									</td>
									<td className="p-1 text-[14px] font-normal text-gray-700">
										{c.dateLivraison}
									</td>
									<td className="flex justify-center gap-2">
										<button
											className="bg-blue-600 text-white w-7 h-7 rounded-md cursor-pointer flex items-center justify-center"
											onClick={() => handleEdit(c.tracking)}
										>
											<EditIcon fontSize="small" />
										</button>

										<button
											className="bg-red-600 text-white w-7 h-7 rounded-md cursor-pointer flex items-center justify-center"
											onClick={() => handleDelete(c.tracking)}
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

export default PageColis;
