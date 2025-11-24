import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

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
  const [filterStatut, setFilterStatut] = React.useState("");
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
    (term: string, statutFilter: string) => {
      let filtered = trackings;

      // Filtre par texte de recherche
      const normalized = term.trim().toLowerCase();
      if (normalized) {
        filtered = filtered.filter((t) =>
          [t.tracking, t.nom, t.statut, t.expediteur, t.destinataire].some(
            (field) => field.toLowerCase().includes(normalized)
          )
        );
      }

      // Filtre par statut
      if (statutFilter) {
        filtered = filtered.filter((t) => t.statut === statutFilter);
      }

      setFilteredTrackings(filtered);
    },
    [trackings]
  );

  React.useEffect(() => {
    applyFilter(searchTerm, filterStatut);
  }, [searchTerm, filterStatut, applyFilter]);

  const handleFilter = () => {
    applyFilter(searchTerm, filterStatut);
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setFilterStatut("");
    setFilteredTrackings(trackings);
  };

  return (
    <div className="font-sans p-4">
      <div className="text-lg font-bold mb-4">Liste de suivi </div>

      <div className="bg-gray-200/30 rounded-lg p-4 w-[98%] mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-xl font-normal ">Tracking :</h3>

          <div className="flex justify-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par tracking, statut, destinataire..."
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 min-w-[240px]"
            />
          </div>

          <div className="flex">
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-300 bg-white text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Tous les statuts</option>
              <option value="En transit">En transit</option>
              <option value="Livré">Livré</option>
              <option value="Retourné">Retourné</option>
              <option value="En attente">En attente</option>
            </select>
            <button
              className="flex items-center gap-1 bg-transparent text-transparent px-3 py-1 rounded-md hover:scale-105 transition-transform"
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
            {(searchTerm || filterStatut) && (
              <button
                className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded-md hover:scale-105 transition-transform"
                onClick={handleResetFilter}
                title="Réinitialiser les filtres"
              >
                <ClearIcon /> Réinitialiser
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-md table-fixed border-separate border-spacing-2 text-center text-gray-800">
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
