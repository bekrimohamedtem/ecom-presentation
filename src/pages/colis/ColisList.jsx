import React, { useState, useCallback, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
// import { colisService } from "../../services/colis.service"; // TODO: Utiliser quand les APIs seront prêtes
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/tables/DataTable";
import AddModal from "../../components/modals/AddModal";
import EditModal from "../../components/modals/EditModal";
import DeleteConfirmModal from "../../components/modals/DeleteConfirmModal";
import AssignModal from "../../components/modals/AssignModal";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import usePagination from "../../hooks/usePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";

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
      nomClient: "Mohamed Benali",
      telephone: "0555123456",
      adresse: "Rue Didouche Mourad",
      wilaya: "Alger",
      adresseWilaya: "Rue Didouche Mourad, Alger",
      poids: 2.5,
      prix: 500,
      modePaiement: "Espèces",
      statut: "En transit",
      instructionsLivreur: "Appeler avant livraison",
      livreurId: 1,
      depot: "Dépôt Alger Centre",
    },
    {
      id: 2,
      tracking: "TRK002",
      nom: "Livraison Rapide",
      expediteur: "Fatima Zohra",
      destinataire: "Karim Bensaid",
      nomClient: "Karim Bensaid",
      telephone: "0555123457",
      adresse: "Boulevard de la Soummam",
      wilaya: "Oran",
      adresseWilaya: "Boulevard de la Soummam, Oran",
      poids: 1.8,
      prix: 400,
      modePaiement: "Carte",
      statut: "Livré",
      instructionsLivreur: "Livrer à la réception",
      livreurId: 2,
      depot: "Dépôt Oran Centre",
    },
    {
      id: 3,
      tracking: "TRK003",
      nom: "Envoi Standard",
      expediteur: "Sara Amrani",
      destinataire: "Youssef Kaddour",
      nomClient: "Youssef Kaddour",
      telephone: "0555123458",
      adresse: "Avenue Ali Mendjeli",
      wilaya: "Constantine",
      adresseWilaya: "Avenue Ali Mendjeli, Constantine",
      poids: 3.2,
      prix: 600,
      modePaiement: "Chèque",
      statut: "En attente",
      instructionsLivreur: "Fragile",
      livreurId: null,
      depot: "Dépôt Constantine",
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
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [editingColis, setEditingColis] = useState(null);
  const [deletingColis, setDeletingColis] = useState(null);
  const [assigningColis, setAssigningColis] = useState(null);
  // Liste des livreurs disponibles pour l'affectation
  const [livreurs] = useState([
    { id: 1, nom: "Ahmed Benali" },
    { id: 2, nom: "Mohamed Kaddour" },
    { id: 3, nom: "Karim Bensaid" },
  ]);
  const [newColis, setNewColis] = useState({
    tracking: "",
    nom: "",
    expediteur: "",
    destinataire: "",
    nomClient: "",
    telephone: "",
    adresse: "",
    wilaya: "",
    adresseWilaya: "",
    poids: "",
    prix: "",
    modePaiement: "Espèces",
    statut: "En transit",
    instructionsLivreur: "",
    livreurId: "",
    depot: "",
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
            c.nomClient,
            c.telephone,
            c.adresse,
            c.wilaya,
            c.adresseWilaya,
            c.statut,
            c.modePaiement,
            c.depot,
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
        filtered = filtered.filter(
          (c) => c.destinataire === destinataireFilter
        );
      }

      setFilteredColis(filtered);
    },
    [colis]
  );

  useEffect(() => {
    applyFilter(
      searchTerm,
      filters.statut,
      filters.expediteur,
      filters.destinataire
    );
  }, [searchTerm, filters, applyFilter]);

  // Gestion CRUD - pour le moment on utilise useState local
  // TODO: Remplacer par des appels API quand ils seront prêts
  const handleAdd = (e) => {
    e.preventDefault();
    const newId = Math.max(...colis.map((c) => c.id), 0) + 1;
    const colisToAdd = {
      ...newColis,
      id: newId,
      poids: parseFloat(newColis.poids) || 0,
      prix: parseFloat(newColis.prix) || 0,
      livreurId: newColis.livreurId ? parseInt(newColis.livreurId) : null,
    };
    setColis([...colis, colisToAdd]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEdit = (colis) => {
    setEditingColis(colis);
    setNewColis({
      ...colis,
      poids: colis.poids ? colis.poids.toString() : "",
      prix: colis.prix ? colis.prix.toString() : "",
      livreurId: colis.livreurId ? colis.livreurId.toString() : "",
    });
    setShowEditModal(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setColis(
      colis.map((c) =>
        c.id === editingColis.id
          ? {
              ...newColis,
              id: editingColis.id,
              poids: parseFloat(newColis.poids) || 0,
              prix: parseFloat(newColis.prix) || 0,
              livreurId: newColis.livreurId
                ? parseInt(newColis.livreurId)
                : null,
            }
          : c
      )
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
      expediteur: "",
      destinataire: "",
      nomClient: "",
      telephone: "",
      adresse: "",
      wilaya: "",
      adresseWilaya: "",
      poids: "",
      prix: "",
      modePaiement: "Espèces",
      statut: "En transit",
      instructionsLivreur: "",
      livreurId: "",
      depot: "",
    });
    setEditingColis(null);
  };

  const columns = [
    { key: "tracking", label: "Tracking" },
    { key: "nom", label: "Colis" },
    { key: "nomClient", label: "Nom Client" },
    { key: "telephone", label: "Téléphone du Client" },
    {
      key: "poids",
      label: "Poids (kg)",
      render: (value) => `${value} kg`,
    },
    {
      key: "prix",
      label: "Prix (DZD)",
      render: (value) => `${value.toLocaleString()} DZD`,
    },
    { key: "modePaiement", label: "Mode Paiement" },
    { key: "wilaya", label: "Wilaya" },
    { key: "adresseWilaya", label: "Adresse du Client" },
    { key: "instructionsLivreur", label: "Instructions" },
    {
      key: "livreurId",
      label: "ID Livreur",
      render: (value) => value || "Non assigné",
    },
    { key: "depot", label: "Dépôt" },
    {
      key: "affectation",
      label: "Affectation",
      render: (value, row) => {
        const livreur = livreurs.find((l) => l.id === row.livreurId);
        return (
          <div className="flex items-center justify-center gap-2">
            {row.livreurId ? (
              <Badge variant="success">
                {livreur ? livreur.nom : `Livreur #${row.livreurId}`}
              </Badge>
            ) : (
              <Badge variant="default">Non affecté</Badge>
            )}
          </div>
        );
      },
    },
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

  const handleAssign = (colis) => {
    setAssigningColis(colis);
    setShowAssignModal(true);
  };

  const confirmAssign = (livreurId) => {
    if (assigningColis && livreurId) {
      setColis(
        colis.map((c) =>
          c.id === assigningColis.id
            ? { ...c, livreurId: parseInt(livreurId) }
            : c
        )
      );
      setShowAssignModal(false);
      setAssigningColis(null);
    }
  };

  const tableActions = (row) => (
    <div className="flex items-center justify-center gap-2">
      <button
        className="bg-green-600 text-white w-7 h-7 rounded-md flex items-center justify-center hover:bg-green-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          handleAssign(row);
        }}
        title="Affecter à un livreur"
      >
        <AssignmentIcon fontSize="small" />
      </button>
      <button
        className="bg-blue-600 text-white w-7 h-7 rounded-md flex items-center justify-center hover:bg-blue-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          handleEdit(row);
        }}
        title="Modifier"
      >
        <EditIcon fontSize="small" />
      </button>
      <button
        className="bg-red-600 text-white w-7 h-7 rounded-md flex items-center justify-center hover:bg-red-700 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(row);
        }}
        title="Supprimer"
      >
        <DeleteIcon fontSize="small" />
      </button>
    </div>
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
            label="Colis"
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
            label="Nom du Client"
            name="nomClient"
            value={newColis.nomClient}
            onChange={(e) =>
              setNewColis({ ...newColis, nomClient: e.target.value })
            }
            required
          />
          <InputField
            label="Téléphone du Client"
            name="telephone"
            value={newColis.telephone}
            onChange={(e) =>
              setNewColis({ ...newColis, telephone: e.target.value })
            }
            required
          />
          <InputField
            label="Adresse du Client"
            name="adresse"
            value={newColis.adresse}
            onChange={(e) =>
              setNewColis({ ...newColis, adresse: e.target.value })
            }
            required
          />
          <InputField
            label="Wilaya"
            name="wilaya"
            value={newColis.wilaya}
            onChange={(e) =>
              setNewColis({ ...newColis, wilaya: e.target.value })
            }
            required
          />
          <InputField
            label="Adresse Complète (Wilaya)"
            name="adresseWilaya"
            value={newColis.adresseWilaya}
            onChange={(e) =>
              setNewColis({ ...newColis, adresseWilaya: e.target.value })
            }
            required
          />
          <InputField
            label="Poids (kg)"
            name="poids"
            type="number"
            step="0.1"
            value={newColis.poids}
            onChange={(e) =>
              setNewColis({ ...newColis, poids: e.target.value })
            }
            required
          />
          <InputField
            label="Prix (DZD)"
            name="prix"
            type="number"
            value={newColis.prix}
            onChange={(e) => setNewColis({ ...newColis, prix: e.target.value })}
            required
          />
          <SelectField
            label="Mode de Paiement"
            name="modePaiement"
            value={newColis.modePaiement}
            onChange={(e) =>
              setNewColis({ ...newColis, modePaiement: e.target.value })
            }
            options={[
              { value: "Espèces", label: "Espèces" },
              { value: "Carte", label: "Carte" },
              { value: "Chèque", label: "Chèque" },
              { value: "Virement", label: "Virement" },
            ]}
            required
          />
          <InputField
            label="Instructions au Livreur"
            name="instructionsLivreur"
            value={newColis.instructionsLivreur}
            onChange={(e) =>
              setNewColis({ ...newColis, instructionsLivreur: e.target.value })
            }
          />
          <InputField
            label="ID Livreur"
            name="livreurId"
            type="number"
            value={newColis.livreurId}
            onChange={(e) =>
              setNewColis({ ...newColis, livreurId: e.target.value })
            }
          />
          <InputField
            label="Dépôt"
            name="depot"
            value={newColis.depot}
            onChange={(e) =>
              setNewColis({ ...newColis, depot: e.target.value })
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
            label="Colis"
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
            label="Nom du Client"
            name="nomClient"
            value={newColis.nomClient}
            onChange={(e) =>
              setNewColis({ ...newColis, nomClient: e.target.value })
            }
            required
          />
          <InputField
            label="Téléphone du Client"
            name="telephone"
            value={newColis.telephone}
            onChange={(e) =>
              setNewColis({ ...newColis, telephone: e.target.value })
            }
            required
          />
          <InputField
            label="Adresse du Client"
            name="adresse"
            value={newColis.adresse}
            onChange={(e) =>
              setNewColis({ ...newColis, adresse: e.target.value })
            }
            required
          />
          <InputField
            label="Wilaya"
            name="wilaya"
            value={newColis.wilaya}
            onChange={(e) =>
              setNewColis({ ...newColis, wilaya: e.target.value })
            }
            required
          />
          <InputField
            label="Adresse Complète (Wilaya)"
            name="adresseWilaya"
            value={newColis.adresseWilaya}
            onChange={(e) =>
              setNewColis({ ...newColis, adresseWilaya: e.target.value })
            }
            required
          />
          <InputField
            label="Poids (kg)"
            name="poids"
            type="number"
            step="0.1"
            value={newColis.poids}
            onChange={(e) =>
              setNewColis({ ...newColis, poids: e.target.value })
            }
            required
          />
          <InputField
            label="Prix (DZD)"
            name="prix"
            type="number"
            value={newColis.prix}
            onChange={(e) => setNewColis({ ...newColis, prix: e.target.value })}
            required
          />
          <SelectField
            label="Mode de Paiement"
            name="modePaiement"
            value={newColis.modePaiement}
            onChange={(e) =>
              setNewColis({ ...newColis, modePaiement: e.target.value })
            }
            options={[
              { value: "Espèces", label: "Espèces" },
              { value: "Carte", label: "Carte" },
              { value: "Chèque", label: "Chèque" },
              { value: "Virement", label: "Virement" },
            ]}
            required
          />
          <InputField
            label="Instructions au Livreur"
            name="instructionsLivreur"
            value={newColis.instructionsLivreur}
            onChange={(e) =>
              setNewColis({ ...newColis, instructionsLivreur: e.target.value })
            }
          />
          <InputField
            label="ID Livreur"
            name="livreurId"
            type="number"
            value={newColis.livreurId}
            onChange={(e) =>
              setNewColis({ ...newColis, livreurId: e.target.value })
            }
          />
          <InputField
            label="Dépôt"
            name="depot"
            value={newColis.depot}
            onChange={(e) =>
              setNewColis({ ...newColis, depot: e.target.value })
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

      {/* Modal Affectation */}
      <AssignModal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setAssigningColis(null);
        }}
        title={`Affecter le colis "${assigningColis?.tracking}" à un livreur`}
        options={livreurs.map((l) => ({
          value: l.id.toString(),
          label: l.nom,
        }))}
        onSubmit={confirmAssign}
        submitLabel="Affecter"
      />
    </div>
  );
}

export default ColisList;
