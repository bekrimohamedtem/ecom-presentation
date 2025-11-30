import React, { useState, useCallback, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
// import { colisService } from "../../services/colis.service"; // TODO: Utiliser quand les APIs seront prêtes
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import AddModal from "../../components/modals/AddModal";
import EditModal from "../../components/modals/EditModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import Badge from "../../components/ui/Badge";
import usePagination from "../../hooks/usePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ColisList() {
  const { searchTerm } = useSearch();
  // Données mockées pour le développement - sera remplacé par les APIs plus tard
  const [colis, setColis] = useState([
    {
      id: 1,
      tracking: "TRK001",
      nom: "Colis Express",
      expediteur: "Ali Ahmed",
      destinataire: "Mohamed Benali",
      adresse: "Alger, Alger",
      statut: "En transit",
    },
    {
      id: 2,
      tracking: "TRK002",
      nom: "Livraison Rapide",
      expediteur: "Fatima Zohra",
      destinataire: "Karim Bensaid",
      adresse: "Oran, Oran",
      statut: "Livré",
    },
    {
      id: 3,
      tracking: "TRK003",
      nom: "Envoi Standard",
      expediteur: "Sara Amrani",
      destinataire: "Youssef Kaddour",
      adresse: "Constantine, Constantine",
      statut: "En attente",
    },
  ]);
  const [filteredColis, setFilteredColis] = useState([]);
  const [filters, setFilters] = useState({
    statut: "",
    expediteur: "",
    destinataire: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingColis, setEditingColis] = useState(null);
  const [deletingColis, setDeletingColis] = useState(null);
  const [newColis, setNewColis] = useState({
    tracking: "",
    nom: "",
    quantity: "",
    price: "",
    expediteur: "",
    destinataire: "",
    adresse: "",
    statut: "En transit",
  });

  const {
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    paginatedData,
    showAll,
    setShowAll,
  } = usePagination(filteredColis, 6);

  // Charger les données - pour le moment on utilise les données locales
  useEffect(() => {
    setFilteredColis(colis);
  }, [colis]);

  // Fonction de filtrage
  const applyFilter = useCallback(
    (term, statutFilter, expediteurFilter, destinataireFilter) => {
      let filtered = colis;

      if (term.trim()) {
        const normalized = term.trim().toLowerCase();
        filtered = filtered.filter((c) =>
          [
            c.nom,
            c.tracking,
            c.expediteur,
            c.destinataire,
            c.adresse,
            c.statut,
          ].some((field) => field?.toLowerCase().includes(normalized))
        );
      }

      if (statutFilter) {
        filtered = filtered.filter((c) => c.statut === statutFilter);
      }

      if (expediteurFilter) {
        filtered = filtered.filter((c) => c.expediteur === expediteurFilter);
      }

      if (destinataireFilter) {
        filtered = filtered.filter((c) => c.destinataire === destinataireFilter);
      }

      setFilteredColis(filtered);
    },
    [colis]
  );

  useEffect(() => {
    applyFilter(searchTerm, filters.statut, filters.expediteur, filters.destinataire);
  }, [searchTerm, filters, applyFilter]);

  // Gestion CRUD - pour le moment on utilise useState local
  // TODO: Remplacer par des appels API quand ils seront prêts
  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...colis.map((c) => c.id), 0) + 1;
    const colisToAdd = { ...newColis, id: newId };
    setColis([...colis, colisToAdd]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (colis) => {
    setEditingColis(colis);
    setNewColis(colis);
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setColis(
      colis.map((c) => (c.id === editingColis.id ? { ...newColis, id: editingColis.id } : c))
    );
    setShowEditModal(false);
    resetForm();
  };

  const handleDelete = (colis) => {
    setDeletingColis(colis);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setColis(colis.filter((c) => c.id !== deletingColis.id));
    setShowDeleteModal(false);
    setDeletingColis(null);
  };

  const resetForm = () => {
    setNewColis({
      tracking: "",
      nom: "",
      quantity: "",
      price: "",
      expediteur: "",
      destinataire: "",
      adresse: "",
      statut: "En transit",
    });
    setEditingColis(null);
  };

  const columns = [
    { key: "tracking", label: "Tracking" },
    { key: "nom", label: "Nom" },
    { key: "expediteur", label: "Expéditeur" },
    { key: "destinataire", label: "Destinataire" },
    {
      key: "statut",
      label: "Statut",
      render: (value) => (
        <Badge
          variant={
            value === "Livré"
              ? "success"
              : value === "En transit"
              ? "info"
              : value === "En attente"
              ? "warning"
              : "danger"
          }
        >
          {value}
        </Badge>
      ),
    },
  ];

  const tableActions = (row) => (
    <>
      <button
        className="bg-blue-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(row);
        }}
      >
        <EditIcon fontSize="small" />
      </button>
      <button
        className="bg-red-600 text-white w-7 h-7 rounded-md flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(row);
        }}
      >
        <DeleteIcon fontSize="small" />
      </button>
    </>
  );

  return (
    <div className="font-sans p-6 bg-gray-200/70">
      <div className="bg-white rounded-lg w-[98%] mx-auto p-4">
        <PageHeader
          title="Liste des Colis"
          count={filteredColis.length}
          onAdd={() => setShowAddModal(true)}
          onFilter={() => setShowFilterModal(true)}
        />

        <DataTable
          columns={columns}
          data={filteredColis}
          currentPage={currentPage}
          itemsPerPage={6}
          showAll={showAll}
          onPageChange={setCurrentPage}
          onShowAll={setShowAll}
          actions={tableActions}
        />
      </div>

      {/* Modal Ajouter */}
      <AddModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Ajouter un Colis"
        onSubmit={handleAdd}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Tracking"
            name="tracking"
            value={newColis.tracking}
            onChange={(e) =>
              setNewColis({ ...newColis, tracking: e.target.value })
            }
            required
          />
          <InputField
            label="Nom"
            name="nom"
            value={newColis.nom}
            onChange={(e) => setNewColis({ ...newColis, nom: e.target.value })}
            required
          />
          <InputField
            label="Expéditeur"
            name="expediteur"
            value={newColis.expediteur}
            onChange={(e) =>
              setNewColis({ ...newColis, expediteur: e.target.value })
            }
            required
          />
          <InputField
            label="Destinataire"
            name="destinataire"
            value={newColis.destinataire}
            onChange={(e) =>
              setNewColis({ ...newColis, destinataire: e.target.value })
            }
            required
          />
          <InputField
            label="Adresse"
            name="adresse"
            value={newColis.adresse}
            onChange={(e) =>
              setNewColis({ ...newColis, adresse: e.target.value })
            }
            required
          />
          <SelectField
            label="Statut"
            name="statut"
            value={newColis.statut}
            onChange={(e) =>
              setNewColis({ ...newColis, statut: e.target.value })
            }
            options={[
              { value: "En transit", label: "En transit" },
              { value: "Livré", label: "Livré" },
              { value: "En attente", label: "En attente" },
              { value: "Retourné", label: "Retourné" },
            ]}
            required
          />
        </div>
      </AddModal>

      {/* Modal Modifier */}
      <EditModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          resetForm();
        }}
        title="Modifier le Colis"
        onSubmit={handleUpdate}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Tracking"
            name="tracking"
            value={newColis.tracking}
            onChange={(e) =>
              setNewColis({ ...newColis, tracking: e.target.value })
            }
            required
          />
          <InputField
            label="Nom"
            name="nom"
            value={newColis.nom}
            onChange={(e) => setNewColis({ ...newColis, nom: e.target.value })}
            required
          />
          <InputField
            label="Expéditeur"
            name="expediteur"
            value={newColis.expediteur}
            onChange={(e) =>
              setNewColis({ ...newColis, expediteur: e.target.value })
            }
            required
          />
          <InputField
            label="Destinataire"
            name="destinataire"
            value={newColis.destinataire}
            onChange={(e) =>
              setNewColis({ ...newColis, destinataire: e.target.value })
            }
            required
          />
          <InputField
            label="Adresse"
            name="adresse"
            value={newColis.adresse}
            onChange={(e) =>
              setNewColis({ ...newColis, adresse: e.target.value })
            }
            required
          />
          <SelectField
            label="Statut"
            name="statut"
            value={newColis.statut}
            onChange={(e) =>
              setNewColis({ ...newColis, statut: e.target.value })
            }
            options={[
              { value: "En transit", label: "En transit" },
              { value: "Livré", label: "Livré" },
              { value: "En attente", label: "En attente" },
              { value: "Retourné", label: "Retourné" },
            ]}
            required
          />
        </div>
      </EditModal>

      {/* Modal Supprimer */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletingColis(null);
        }}
        onConfirm={confirmDelete}
        message={`Êtes-vous sûr de vouloir supprimer le colis "${deletingColis?.nom}" ?`}
      />
    </div>
  );
}

export default ColisList;

