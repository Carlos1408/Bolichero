"use client";

import { useState } from "react";

const fakeComments = [
  {
    id: "1",
    description: "¡Excelente artículo! Me ha sido de gran ayuda.",
    type: "general",
    createdAt: "hace 2 horas",
    customer: { name: "Carlos Nuñez" },
  },
  {
    id: "2",
    description: "producto medio",
    type: "crítica",
    createdAt: "hace 3 horas",
    customer: { name: "Canast Nurgaodomegov" },
  },
];

export default function CommentsPage() {
  const [comments, setComments] = useState(fakeComments);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setCommentToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setComments(comments.filter((comment) => comment.id !== commentToDelete));
    setShowDeleteModal(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Comentarios</h1>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-start justify-between border-b last:border-none py-4"
          >
            <div>
              <h2 className="font-semibold">{comment.customer.name}</h2>
              <p className="text-gray-600">{comment.description}</p>
              <span className="text-sm text-gray-400">{comment.createdAt}</span>
            </div>
            <button
              onClick={() => handleDeleteClick(comment.id)}
              className="text-red-500 hover:underline"
            >
              Eliminar
            </button>
          </div>
        ))}
        <form className="mt-6">
          <textarea
            className="w-full border rounded-lg p-2 text-gray-700"
            placeholder="Escribe tu comentario aquí..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Publicar
          </button>
        </form>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold">¿Seguro que quieres eliminar el comentario?</h2>
            <p className="text-gray-600">Esta acción eliminará el comentario permanentemente.</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
