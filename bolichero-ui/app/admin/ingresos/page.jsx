"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const fakeEntries = [
  {
    id: "1",
    datetime: "2025-01-01T10:00:00",
    customer: { name: "Carlos Nuñez" },
    club: { name: "Club Chicha" },
  },
  {
    id: "2",
    datetime: "2025-01-02T15:30:00",
    customer: { name: "Canast Nurgaodomegov" },
    club: { name: "Club Elite tomadores" },
  },
];

export default function EntriesPage() {
  const [entries, setEntries] = useState(fakeEntries);
  const [isEditing, setIsEditing] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const handleEditClick = (entry) => {
    setEntryToEdit(entry);
    setIsEditing(true);
  };

  const handleDeleteClick = (id) => {
    setEntryToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setEntries(entries.filter((entry) => entry.id !== entryToDelete));
    setShowDeleteModal(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === entryToEdit.id ? entryToEdit : entry
        )
      );
      setIsEditing(false);
      setEntryToEdit(null);
    } else {
      const newEntry = {
        id: (entries.length + 1).toString(),
        datetime: e.target.datetime.value,
        customer: { name: e.target.customer.value },
        club: { name: e.target.club.value },
      };
      setEntries([...entries, newEntry]);
    }
    e.target.reset();
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ingresos</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <ul>
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center justify-between border-b last:border-none py-4"
            >
              <div>
                <h2 className="font-semibold">{entry.customer.name}</h2>
                <p className="text-gray-600">
                  {entry.club.name} - {new Date(entry.datetime).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleEditClick(entry)}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteClick(entry.id)}
                >
                  Eliminar
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSave} className="mt-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              type="text"
              name="customer"
              placeholder="Nombre del cliente"
              defaultValue={entryToEdit?.customer.name || ""}
              required
            />
            <Input
              type="text"
              name="club"
              placeholder="Nombre del club"
              defaultValue={entryToEdit?.club.name || ""}
              required
            />
            <Input
              type="datetime-local"
              name="datetime"
              defaultValue={entryToEdit?.datetime || ""}
              required
            />
          </div>
          <Button type="submit" className="mt-4">
            {isEditing ? "Actualizar" : "Agregar"}
          </Button>
        </form>
      </div>

      {/* Modal de Confirmación para Eliminar */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar este ingreso?</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600">
            Esta acción no se puede deshacer. ¿Estás seguro?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
