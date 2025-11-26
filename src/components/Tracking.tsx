import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import { useSearch } from "../contexts/SearchContext";
import Pagination from "./Pagination";

function PageTracking() {
  const { searchTerm, setSearchTerm: setSearchTermContext } = useSearch();
  const [trackings, setTrackings] = React.useState([
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
    {
      id: 4,
      tracking: "TN12348",
      nom: "Colis D",
      quantity: 3,
      price: 3200,
      expediteur: "Fatima",
      destinataire: "Youssef",
      adresse: "Blida, Algérie",
      statut: "En transit",
      dateEnvoi: "21/11/2025",
      dateLivraison: "26/11/2025",
    },
    {
      id: 5,
      tracking: "TN12349",
      nom: "Colis E",
      quantity: 1,
      price: 1800,
      expediteur: "Karim",
      destinataire: "Lina",
      adresse: "Tizi Ouzou, Algérie",
      statut: "En attente",
      dateEnvoi: "22/11/2025",
      dateLivraison: "27/11/2025",
    },
    {
      id: 6,
      tracking: "TN12350",
      nom: "Colis F",
      quantity: 2,
      price: 2100,
      expediteur: "Nadia",
      destinataire: "Omar",
      adresse: "Béjaïa, Algérie",
      statut: "Livré",
      dateEnvoi: "17/11/2025",
      dateLivraison: "20/11/2025",
    },
    {
      id: 7,
      tracking: "TN12351",
      nom: "Colis G",
      quantity: 1,
      price: 950,
      expediteur: "Samir",
      destinataire: "Leila",
      adresse: "Annaba, Algérie",
      statut: "En transit",
      dateEnvoi: "23/11/2025",
      dateLivraison: "28/11/2025",
    },
    {
      id: 8,
      tracking: "TN12352",
      nom: "Colis H",
      quantity: 4,
      price: 4500,
      expediteur: "Amel",
      destinataire: "Rachid",
      adresse: "Sétif, Algérie",
      statut: "Livré",
      dateEnvoi: "16/11/2025",
      dateLivraison: "19/11/2025",
    },
    {
      id: 9,
      tracking: "TN12353",
      nom: "Colis I",
      quantity: 1,
      price: 1350,
      expediteur: "Bilal",
      destinataire: "Salma",
      adresse: "Batna, Algérie",
      statut: "Retourné",
      dateEnvoi: "15/11/2025",
      dateLivraison: "18/11/2025",
    },
    {
      id: 10,
      tracking: "TN12354",
      nom: "Colis J",
      quantity: 2,
      price: 2800,
      expediteur: "Djamila",
      destinataire: "Tarek",
      adresse: "Mostaganem, Algérie",
      statut: "En attente",
      dateEnvoi: "24/11/2025",
      dateLivraison: "29/11/2025",
    },
  ]);

  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [filters, setFilters] = React.useState({
    statut: "",
    expediteur: "",
    destinataire: "",
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(6);
  const [showAll, setShowAll] = React.useState(false);
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
    setSearchTermContext("");
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

  // Calcul de la pagination
  const totalItems = filteredTrackings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTrackings = showAll
    ? filteredTrackings
    : filteredTrackings.slice(startIndex, endIndex);

  // Réinitialiser à la page 1 quand les filtres changent
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="text-lg font-bold mb-4">LIST VIEW</div>
      <div className="bg-white rounded-lg w-full mx-auto p-4">
        <div className="flex justify-between items-center p-0 px-4 mb-4">
          <h2 className="text-md font-bold">
            Tracking List{" "}
            <span className="text-sm bg-violet-500 text-white ml-2 px-2 py-0.5 rounded-md">
              {filteredTrackings.length}
            </span>
          </h2>
          <div className="flex-1 flex justify-end gap-4 items-center">
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

        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white rounded-md table-fixed text-center text-gray-800">
            <thead>
              <tr className="font-bold bg-gray-100">
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
                  <th key={head} className="p-2 font-bold">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedTrackings.map((t) => (
                <tr key={t.id} className=" rounded-md mb-5">
                  <td className="p-1 text-[14px] font-normal text-gray-700">
                    {t.tracking}
                  </td>
                  <td className="p-1 text-[14px] font-normal text-gray-700">
                    {t.nom}
                  </td>
                  <td className="p-1 text-[14px] font-normal text-gray-700">
                    {t.statut}
                  </td>
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

        {/* Pagination */}
        {totalItems > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            showAll={showAll}
            onShowAll={setShowAll}
          />
        )}
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
