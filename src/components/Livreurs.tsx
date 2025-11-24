import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";

function PageLivreurs() {
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [editingLivreurId, setEditingLivreurId] = React.useState<number | null>(
    null
  );
  const [newLivreur, setNewLivreur] = React.useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    ville: "",
    statut: "Actif",
  });
  const [filters, setFilters] = React.useState({
    statut: "",
    ville: "",
  });

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

  const handleDelete = (id: number) => {
    setLivreurs(livreurs.filter((l) => l.id !== id));
  };

  const handleEdit = (id: number) => {
    const livreurToEdit = livreurs.find((l) => l.id === id);
    if (livreurToEdit) {
      setEditingLivreurId(id);
      setNewLivreur({
        nom: livreurToEdit.nom,
        prenom: livreurToEdit.prenom,
        telephone: livreurToEdit.telephone,
        email: livreurToEdit.email,
        ville: livreurToEdit.ville,
        statut: livreurToEdit.statut,
      });
      setShowEditModal(true);
    }
  };

  const applyFilter = React.useCallback(
    (term: string, statutFilter?: string, villeFilter?: string) => {
      let filtered = livreurs;

      // Filtre par texte de recherche
      const normalized = term.trim().toLowerCase();
      if (normalized) {
        filtered = filtered.filter((l) =>
          [l.nom, l.prenom, l.telephone, l.email, l.ville, l.statut].some(
            (field) => field.toLowerCase().includes(normalized)
          )
        );
      }

      // Filtre par statut
      if (statutFilter) {
        filtered = filtered.filter((l) => l.statut === statutFilter);
      }

      // Filtre par ville
      if (villeFilter) {
        filtered = filtered.filter((l) => l.ville === villeFilter);
      }

      setFilteredLivreurs(filtered);
    },
    [livreurs]
  );

  React.useEffect(() => {
    applyFilter(searchTerm, filters.statut, filters.ville);
  }, [searchTerm, filters, applyFilter, livreurs]);

  const handleFilter = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilters = () => {
    applyFilter(searchTerm, filters.statut, filters.ville);
    setShowFilterModal(false);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      statut: "",
      ville: "",
    });
    setSearchTerm("");
    setFilteredLivreurs(livreurs);
  };

  const handleAddLivreur = () => {
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingLivreurId(null);
    setNewLivreur({
      nom: "",
      prenom: "",
      telephone: "",
      email: "",
      ville: "",
      statut: "Actif",
    });
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
  };

  // Récupérer les villes uniques pour le filtre
  const uniqueVilles = Array.from(new Set(livreurs.map((l) => l.ville)));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewLivreur((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const livreurData = {
      id: editingLivreurId || livreurs.length + 1,
      nom: newLivreur.nom,
      prenom: newLivreur.prenom,
      telephone: newLivreur.telephone,
      email: newLivreur.email,
      ville: newLivreur.ville,
      statut: newLivreur.statut,
    };

    if (showEditModal && editingLivreurId) {
      // Modifier le livreur existant
      setLivreurs(
        livreurs.map((l) => (l.id === editingLivreurId ? livreurData : l))
      );
    } else {
      // Ajouter un nouveau livreur
      setLivreurs([...livreurs, livreurData]);
    }
    handleCloseModal();
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
              onClick={handleAddLivreur}
            >
              <AddIcon /> Ajouter
            </button>
            <button
              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md hover:scale-105 transition-transform"
              onClick={handleFilter}
            >
              <FilterListIcon /> Filtrer
            </button>
            {(searchTerm || filters.statut || filters.ville) && (
              <button
                className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded-md hover:scale-105 transition-transform"
                onClick={handleResetFilters}
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
                  <td className="p-1 text-[14px] font-normal text-gray-700">
                    {l.nom}
                  </td>
                  <td className="p-1 text-[14px] font-normal text-gray-700">
                    {l.prenom}
                  </td>
                  <td className="p-1 text-[14px] font-normal text-gray-700">
                    {l.telephone}
                  </td>
                  <td className="p-1 text-[14px] font-normal text-gray-700">
                    {l.ville}
                  </td>
                  <td className="p-1 text-[14px] font-normal text-gray-700">
                    {l.statut}
                  </td>
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

      {/* Modal pour ajouter/modifier un livreur */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {showEditModal
                  ? "Modifier le livreur"
                  : "Ajouter un nouveau livreur"}
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
                    Nom *
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={newLivreur.nom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ahmed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={newLivreur.prenom}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ali"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={newLivreur.telephone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0555123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newLivreur.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ahmed.ali@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="ville"
                    value={newLivreur.ville}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Alger"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Statut *
                  </label>
                  <select
                    name="statut"
                    value={newLivreur.statut}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
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

      {/* Modal pour filtrer les livreurs */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Filtrer les livreurs</h2>
              <button
                onClick={handleCloseFilterModal}
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
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <select
                  name="ville"
                  value={filters.ville}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Toutes les villes</option>
                  {uniqueVilles.map((ville) => (
                    <option key={ville} value={ville}>
                      {ville}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseFilterModal}
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

export default PageLivreurs;
