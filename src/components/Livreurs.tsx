import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import { useSearch } from "../contexts/SearchContext";
import Pagination from "./Pagination";

function PageLivreurs() {
  const { searchTerm, setSearchTerm: setSearchTermContext } = useSearch();
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(6);
  const [showAll, setShowAll] = React.useState(false);

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
  const [filteredColis, setFilteredColis] = React.useState([
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
  const [showAffecterColisModal, setShowAffecterColisModal] =
    React.useState(false);
  const [selectedColisIds, setSelectedColisIds] = React.useState<number[]>([]);
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
    {
      id: 4,
      nom: "Yasmina",
      prenom: "Kacem",
      telephone: "0555234987",
      email: "yasmina.kacem@example.com",
      ville: "Blida",
      statut: "Actif",
    },
    {
      id: 5,
      nom: "Karim",
      prenom: "Benali",
      telephone: "0555321789",
      email: "karim.benali@example.com",
      ville: "Tizi Ouzou",
      statut: "En congé",
    },
    {
      id: 6,
      nom: "Fatima",
      prenom: "Rahmani",
      telephone: "0555098741",
      email: "fatima.rahmani@example.com",
      ville: "Sétif",
      statut: "Actif",
    },
    {
      id: 7,
      nom: "Rachid",
      prenom: "Touati",
      telephone: "0555674321",
      email: "rachid.touati@example.com",
      ville: "Annaba",
      statut: "Inactif",
    },
    {
      id: 8,
      nom: "Nadia",
      prenom: "Boualem",
      telephone: "0555543210",
      email: "nadia.boualem@example.com",
      ville: "Béjaïa",
      statut: "Actif",
    },
    {
      id: 9,
      nom: "Omar",
      prenom: "Djellal",
      telephone: "0555765432",
      email: "omar.djellal@example.com",
      ville: "Batna",
      statut: "Actif",
    },
    {
      id: 10,
      nom: "Leila",
      prenom: "Mokhtari",
      telephone: "0555123987",
      email: "leila.mokhtari@example.com",
      ville: "Mostaganem",
      statut: "En congé",
    },
  ]);

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
    setSearchTermContext("");
    setFilteredLivreurs(livreurs);
  };

  // Calcul de la pagination
  const totalItems = filteredLivreurs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedLivreurs = showAll
    ? filteredLivreurs
    : filteredLivreurs.slice(startIndex, endIndex);

  // Réinitialiser à la page 1 quand les filtres changent
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handlleaffectercolis = () => {
    setShowAffecterColisModal(true);
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
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="text-lg font-bold mb-4">LIST VIEW</div>
      <div className="bg-white rounded-lg w-full mx-auto p-4">
        <div className="flex justify-between items-center p-0 px-4 mb-4">
          <h2 className="text-md font-bold">
            Livreurs List{" "}
            <span className="text-sm bg-violet-500 text-white ml-2 px-2 py-0.5 rounded-md">
              {filteredLivreurs.length}
            </span>
          </h2>
          <div className="flex gap-4 ">
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
          <table className="w-full bg-white rounded-md table-fixed text-center text-gray-800">
            <thead>
              <tr className="font-bold bg-gray-100">
                {[
                  "Nom",
                  "Prénom",
                  "Téléphone",
                  "Ville",
                  "Statut",
                  "Action",
                  "Affecter colis",
                ].map((head) => (
                  <th key={head} className="p-2">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedLivreurs.map((l) => (
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
                  {/* Affectation des colis */}

                  <td>
                    <button
                      onClick={handlleaffectercolis}
                      className="bg-gray-600 text-white px-3 py-1 rounded-md hover:scale-105 transition-transform"
                    >
                      Affecter un colis
                    </button>
                    {showAffecterColisModal && (
                      <div className="inset-0 fixed flex items-center justify-center  bg-black/10 ">
                        <div className="rounded-md relative bg-white p-4 w-[50%] max-w-2xl min-h-[50vh] overflow-y-auto">
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white w-7 h-7 rounded-md flex items-center justify-center"
                            onClick={() => {
                              setShowAffecterColisModal(false);
                              setSelectedColisIds([]);
                            }}
                          >
                            X
                          </button>
                          <h1 className="text-lg font-bold mb-4">
                            Affectation des colis
                          </h1>
                          <div className="space-y-2 max-h-60 overflow-y-auto border rounded p-2">
                            {colis.length === 0 ? (
                              <p className="text-gray-500 text-center py-4">
                                Aucun colis disponible
                              </p>
                            ) : (
                              colis
                                .filter((c) => c.statut === "En transit")
                                .map((c) => (
                                  <label
                                    key={c.numero}
                                    className={`flex items-center gap-3 p-3 border rounded cursor-pointer transition-colors ${
                                      selectedColisIds.includes(c.numero)
                                        ? "bg-blue-50 border-blue-300"
                                        : "bg-white border-gray-200 hover:bg-gray-50"
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedColisIds.includes(
                                        c.numero
                                      )}
                                      onChange={() => {
                                        setSelectedColisIds((prev) => {
                                          if (prev.includes(c.numero)) {
                                            return prev.filter(
                                              (id) => id !== c.numero
                                            );
                                          } else {
                                            return [...prev, c.numero];
                                          }
                                        });
                                      }}
                                      className="w-4 h-4 text-blue-600"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    <div className="flex-1">
                                      <div className="font-medium">{c.nom}</div>
                                      <div className="text-sm text-gray-500">
                                        {c.tracking}
                                      </div>
                                    </div>
                                  </label>
                                ))
                            )}
                          </div>
                          {selectedColisIds.length > 0 && (
                            <div className="mt-2 text-sm text-gray-600">
                              {selectedColisIds.length} colis sélectionné
                              {selectedColisIds.length > 1 ? "s" : ""}
                            </div>
                          )}
                          <button
                            className={`px-5 py-1 absolute bottom-[3%] right-[3%] rounded-md hover:scale-105 transition-transform ${
                              selectedColisIds.length > 0
                                ? "bg-blue-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            onClick={() => {
                              if (selectedColisIds.length > 0) {
                                // Ici vous pouvez affecter les colis sélectionnés au livreur
                                // handleAffecterColis(selectedColisIds);
                                console.log(
                                  "Colis sélectionnés:",
                                  selectedColisIds
                                );
                                setShowAffecterColisModal(false);
                                setSelectedColisIds([]);
                              }
                            }}
                            disabled={selectedColisIds.length === 0}
                          >
                            Affecter{" "}
                            {selectedColisIds.length > 0 &&
                              `(${selectedColisIds.length})`}
                          </button>
                        </div>
                      </div>
                    )}
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

      {/* Modal pour ajouter/modifier un livreur */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50">
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
