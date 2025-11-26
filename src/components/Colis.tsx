import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearch } from "../contexts/SearchContext";
import Pagination from "./Pagination";

function PageColis() {
  const { searchTerm, setSearchTerm: setSearchTermContext } = useSearch();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [editingColis, setEditingColis] = React.useState<string | null>(null);
  const [filters, setFilters] = React.useState({
    statut: "",
    expediteur: "",
    destinataire: "",
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(6);
  const [showAll, setShowAll] = React.useState(false);
  const [newColis, setNewColis] = React.useState({
    tracking: "",
    nom: "",
    quantity: "",
    price: "",
    expediteur: "",
    destinataire: "",
    numero: "",
    adresse: "",
    statut: "En transit",
    dateEnvoi: "",
    dateLivraison: "",
  });

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
    {
      numero: 4,
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
      numero: 5,
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
      numero: 6,
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
      numero: 7,
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
      numero: 8,
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
      numero: 9,
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
      numero: 10,
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

  const [filteredColis, setFilteredColis] = React.useState(colis);

  React.useEffect(() => {
    setFilteredColis(colis);
  }, [colis]);

  const handleDelete = (tracking: string) => {
    setColis(colis.filter((c) => c.tracking !== tracking));
  };

  const handleEdit = (tracking: string) => {
    const colisToEdit = colis.find((c) => c.tracking === tracking);
    if (colisToEdit) {
      setEditingColis(tracking);
      setNewColis({
        tracking: colisToEdit.tracking,
        nom: colisToEdit.nom,
        quantity: colisToEdit.quantity.toString(),
        price: colisToEdit.price.toString(),
        expediteur: colisToEdit.expediteur,
        destinataire: colisToEdit.destinataire,
        numero: colisToEdit.numero.toString(),
        adresse: colisToEdit.adresse,
        statut: colisToEdit.statut,
        dateEnvoi: colisToEdit.dateEnvoi,
        dateLivraison: colisToEdit.dateLivraison,
      });
      setShowEditModal(true);
    }
  };

  const handleAddColis = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingColis(null);
    setNewColis({
      tracking: "",
      nom: "",
      quantity: "",
      price: "",
      expediteur: "",
      destinataire: "",
      numero: "",
      adresse: "",
      statut: "En transit",
      dateEnvoi: "",
      dateLivraison: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewColis((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const colisData = {
      numero: parseInt(newColis.numero) || colis.length + 1,
      tracking: newColis.tracking,
      nom: newColis.nom,
      quantity: parseInt(newColis.quantity) || 1,
      price: parseInt(newColis.price) || 0,
      expediteur: newColis.expediteur,
      destinataire: newColis.destinataire,
      adresse: newColis.adresse,
      statut: newColis.statut,
      dateEnvoi: newColis.dateEnvoi,
      dateLivraison: newColis.dateLivraison,
    };

    if (showEditModal && editingColis) {
      // Modifier le colis existant
      setColis(colis.map((c) => (c.tracking === editingColis ? colisData : c)));
    } else {
      // Ajouter un nouveau colis
      setColis([...colis, colisData]);
    }
    handleCloseModal();
  };

  const applyFilter = React.useCallback(
    (
      term: string,
      statutFilter?: string,
      expediteurFilter?: string,
      destinataireFilter?: string
    ) => {
      let filtered = colis;

      // Filtre par texte de recherche
      const normalized = term.trim().toLowerCase();
      if (normalized) {
        filtered = filtered.filter((c) =>
          [
            c.tracking,
            c.nom,
            c.expediteur,
            c.destinataire,
            c.statut,
            c.adresse,
          ].some((field) => field.toLowerCase().includes(normalized))
        );
      }

      // Filtre par statut
      if (statutFilter) {
        filtered = filtered.filter((c) => c.statut === statutFilter);
      }

      // Filtre par expéditeur
      if (expediteurFilter) {
        filtered = filtered.filter((c) => c.expediteur === expediteurFilter);
      }

      // Filtre par destinataire
      if (destinataireFilter) {
        filtered = filtered.filter(
          (c) => c.destinataire === destinataireFilter
        );
      }

      setFilteredColis(filtered);
    },
    [colis]
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
    setFilteredColis(colis);
  };

  // Récupérer les valeurs uniques pour les filtres
  const uniqueExpediteurs = Array.from(new Set(colis.map((c) => c.expediteur)));
  const uniqueDestinataires = Array.from(
    new Set(colis.map((c) => c.destinataire))
  );

  // Calcul de la pagination
  const totalItems = filteredColis.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedColis = showAll
    ? filteredColis
    : filteredColis.slice(startIndex, endIndex);

  // Réinitialiser à la page 1 quand les filtres changent
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  return (
    <div className="font-roboto p-6 bg-gray-200/70">
      <div className="text-lg font-bold mb-4">LIST VIEW</div>
      <div className="bg-white rounded-lg w-full mx-auto p-4">
        <div className="flex justify-between items-center p-0 px-4 mb-4">
          <h2 className="text-md font-bold">
            Colis List{" "}
            <span className="text-sm bg-violet-500 text-white ml-2 px-2 py-0.5 rounded-md">
              {filteredColis.length}
            </span>
          </h2>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleAddColis}
              className="flex items-center gap-1 bg-black text-white px-3 py-1 rounded-md hover:scale-105 transition-transform"
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
                className="bg-gray-500 text-white px-2 py-1 rounded-md cursor-pointer transition-transform hover:scale-105 flex items-center gap-1"
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
              {paginatedColis.map((c) => (
                <tr key={c.tracking} className=" rounded-md mb-5">
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

      {/* Modal pour ajouter/modifier un colis */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {showEditModal
                  ? "Modifier le colis"
                  : "Ajouter un nouveau colis"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tracking *
                  </label>
                  <input
                    type="text"
                    name="tracking"
                    value={newColis.tracking}
                    onChange={handleInputChange}
                    required
                    disabled={showEditModal}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      showEditModal ? "bg-gray-100 cursor-not-allowed" : ""
                    }`}
                    placeholder="TN12345"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du produit *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={newColis.nom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Colis A"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantité *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={newColis.quantity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prix *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newColis.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expéditeur *
                  </label>
                  <input
                    type="text"
                    name="expediteur"
                    value={newColis.expediteur}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Alice"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destinataire *
                  </label>
                  <input
                    type="text"
                    name="destinataire"
                    value={newColis.destinataire}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bob"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Numéro
                  </label>
                  <input
                    type="number"
                    name="numero"
                    value={newColis.numero}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Auto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut *
                  </label>
                  <select
                    name="statut"
                    value={newColis.statut}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="En transit">En transit</option>
                    <option value="Livré">Livré</option>
                    <option value="Retourné">Retourné</option>
                    <option value="En attente">En attente</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    name="adresse"
                    value={newColis.adresse}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Alger, Algérie"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date d'envoi *
                  </label>
                  <input
                    type="date"
                    name="dateEnvoi"
                    value={newColis.dateEnvoi}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date de livraison *
                  </label>
                  <input
                    type="date"
                    name="dateLivraison"
                    value={newColis.dateLivraison}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  {showEditModal ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal pour filtrer les colis */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Filtrer les colis</h2>
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

export default PageColis;
