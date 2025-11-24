import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";

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
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [filters, setFilters] = React.useState({
    statut: "",
    expediteur: "",
    destinataire: "",
  });
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
    (
      term: string,
      statutFilter?: string,
      expediteurFilter?: string,
      destinataireFilter?: string
    ) => {
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

      // Filtre par expéditeur
      if (expediteurFilter) {
        filtered = filtered.filter((t) => t.expediteur === expediteurFilter);
      }

      // Filtre par destinataire
      if (destinataireFilter) {
        filtered = filtered.filter(
          (t) => t.destinataire === destinataireFilter
        );
      }

      setFilteredTrackings(filtered);
    },
    [trackings]
  );

  React.useEffect(() => {
    applyFilter(
      searchTerm,
      filters.statut,
      filters.expediteur,
      filters.destinataire
    );
  }, [searchTerm, filters, applyFilter]);

  const handleFilter = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilters = () => {
    applyFilter(
      searchTerm,
      filters.statut,
      filters.expediteur,
      filters.destinataire
    );
    setShowFilterModal(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetFilter = () => {
    setSearchTerm("");
    setFilters({
      statut: "",
      expediteur: "",
      destinataire: "",
    });
    setFilteredTrackings(trackings);
  };

  // Récupérer les valeurs uniques pour les filtres
  const uniqueExpediteurs = Array.from(
    new Set(trackings.map((t) => t.expediteur))
  );
  const uniqueDestinataires = Array.from(
    new Set(trackings.map((t) => t.destinataire))
  );

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

          <div className="flex justify-center gap-4 items-center">
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
            {(searchTerm ||
              filters.statut ||
              filters.expediteur ||
              filters.destinataire) && (
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

      {/* Modal pour filtrer les trackings */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Filtrer les trackings</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  name="statut"
                  value={filters.statut}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tous les statuts</option>
                  <option value="En transit">En transit</option>
                  <option value="Livré">Livré</option>
                  <option value="Retourné">Retourné</option>
                  <option value="En attente">En attente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expéditeur
                </label>
                <select
                  name="expediteur"
                  value={filters.expediteur}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tous les expéditeurs</option>
                  {uniqueExpediteurs.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destinataire
                </label>
                <select
                  name="destinataire"
                  value={filters.destinataire}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Tous les destinataires</option>
                  {uniqueDestinataires.map((dest) => (
                    <option key={dest} value={dest}>
                      {dest}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowFilterModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageTracking;
