'use client'
import { GetListTypeOfArtworkAsyncByRoleAdmin } from "@/app/component/api/GetListTypeOfArtworkAsyncByRoleAdmin";
import { TypeOfArtwork, UpdateTypeOfArtwork } from "@/app/component/lib/Interface";
import { CreateTypeOfArtworkAsync } from "@/app/component/api/CreateTypeOfArtworkAsync";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UpdateTypeOfArtworkAsync } from "@/app/component/api/UpdateTypeOfArtworkAsync";
import { DeleteTypeOfArtworkAsync } from "@/app/component/api/DeleteTypeOfArtworkAsync";

export default function Page() {
    const [listTypeOfArtwork, setListTypeOfArtwork] = useState<TypeOfArtwork[]>([]);
    const [error, setError] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [newType, setNewType] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [showEditMode, setShowEditModal] = useState<boolean>(false);
    const [updateType, setUpdateType] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");
    const [typeOfArtworkId, SetTypeOfArtworkId] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const fetchTypeOfArtwork = async () => {
                const response = await GetListTypeOfArtworkAsyncByRoleAdmin(token);
                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        setListTypeOfArtwork(response.data);
                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
            }
            fetchTypeOfArtwork();
        }
        else {
            alert("You are not login")
            router.push("/login");
        }
    }, []);

    const handleCreateNewType = () => {
        setShowModal(true)
    }

    const handleUpdateType = (typeOfArtworkId: any) => {
        SetTypeOfArtworkId(typeOfArtworkId);
        setShowEditModal(true);
    }

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Check Exception 
                // The Data is not null and the length is more than 4
                if (!newType || newType.length < 4 || !newDescription || newDescription.length < 4) {
                    alert('The Type and Description Can not be null and the length is more than 4');
                    return;
                }
                const formData = new FormData();
                formData.append('type', newType);
                formData.append('typeDescription', newDescription);

                const response = await CreateTypeOfArtworkAsync(formData, token);

                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        console.log("New type of artwork created successfully");
                        window.location.reload();

                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
                setShowModal(false);
                setNewType("");
                setNewDescription("");
            }
            catch (error) {
                console.error("An error occurred:", error);
            }
        }
        else {
            alert("You are not logged in");
            router.push("/login");
        }
    }

    const handleUpdate = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                // Check Exception 
                // The Data is not null and the length is more than 4
                if (!updateType || updateType.length < 4 || !updateDescription || updateDescription.length < 4) {
                    alert('The Type and Description Can not be null and the length is more than 4');
                    return;
                }
                const updateTypeOfArtwork: UpdateTypeOfArtwork = {
                    typeOfArtworkID: typeOfArtworkId,
                    type: updateType,
                    typeDescription: updateDescription
                }

                const response = await UpdateTypeOfArtworkAsync(updateTypeOfArtwork, token);

                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        console.log("New type of artwork created successfully");
                        window.location.reload();

                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
                setShowEditModal(false);
                setUpdateType("");
                setUpdateDescription("");
            }
            catch (error) {
                console.error("An error occurred:", error);
            }
        }
        else {
            alert("You are not logged in");
            router.push("/login");
        }
    }

    const handleDelete = async (typeOfArtworkId: string) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await DeleteTypeOfArtworkAsync(typeOfArtworkId, token);

                if (response.status === "SUCCESS") {
                    if (response.data !== undefined) {
                        console.log("New type of artwork created successfully");
                        window.location.reload();

                    } else {
                        setError("Data is undefined");
                    }
                } else {
                    setError(response.error ?? "Unknown error");
                }
                setShowEditModal(false);
                setUpdateType("");
                setUpdateDescription("");
            }
            catch (error) {
                console.error("An error occurred:", error);
            }
        }
        else {
            alert("You are not logged in");
            router.push("/login");
        }
    }


    return (
        <div className="container mx-auto px-4">
            {error ? (
                <div className="text-red-500">Error: {error}</div>
            ) : (
                <div className="flex flex-col">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 mx-auto"
                        onClick={handleCreateNewType}
                    >
                        Create New Type Of Artwork
                    </button>
                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                            <div className="bg-white p-8 rounded-lg z-20">
                                <h2 className="text-2xl font-bold mb-4">Create New Type Of Artwork</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        Type
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        type="text"
                                        placeholder="Type"
                                        value={newType}
                                        onChange={(e) => setNewType(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="description"
                                        placeholder="Description"
                                        value={newDescription}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                            setShowModal(false);
                                            setNewType("");
                                            setNewDescription("");
                                        }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {showEditMode && (
                        <div className="fixed inset-0 flex items-center justify-center z-10">
                            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                            <div className="bg-white p-8 rounded-lg z-20">
                                <h2 className="text-2xl font-bold mb-4">Update Type Of Artwork</h2>
                                {/* <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="id">
                                        ID
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="id"
                                        type="text"
                                        placeholder="ID"
                                        value={typeOfArtworkId}
                                        readOnly
                                    />
                                </div> */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                                        Type
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="type"
                                        type="text"
                                        placeholder="Type"
                                        value={updateType}
                                        onChange={(e) => setUpdateType(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="description"
                                        placeholder="Description"
                                        value={updateDescription}
                                        onChange={(e) => setUpdateDescription(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={handleUpdate}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                            setShowEditModal(false);
                                            setUpdateType("");
                                            SetTypeOfArtworkId("");
                                            setUpdateDescription("");
                                        }}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-3">Type</th>
                                <th className="border border-gray-300 p-3">Description</th>
                                <th className="border border-gray-300 p-3">Status</th>
                                <th className="border border-gray-300 p-3">Edit</th>
                                <th className="border border-gray-300 p-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listTypeOfArtwork.map(typeOfArtwork => (
                                    <tr key={typeOfArtwork.id} className="border border-gray-300">
                                        <td className="border border-gray-300 p-3">{typeOfArtwork.type}</td>
                                        <td className="border border-gray-300 p-3">{typeOfArtwork.typeDescription}</td>
                                        <td className="border border-gray-300 p-3">{typeOfArtwork.statusName}</td>
                                        <td className="border border-gray-300 p-3">
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                onClick={() => handleUpdateType(typeOfArtwork.id)}>
                                                Edit
                                            </button>
                                        </td>
                                        <td className="border border-gray-300 p-3">
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => {
                                                    const confirmed = window.confirm("Are you sure you want to Delete Type Of Artwork?");
                                                    if (confirmed) {
                                                        handleDelete(typeOfArtwork.id);
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}