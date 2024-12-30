/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddVoucher() {
    const [nama, setNama] = useState("");
    const [kategori, setKategori] = useState("");
    const [foto, setFoto] = useState("");
    const [status, setStatus] = useState("");
    const [preview, setPreview] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFoto(image);
        setPreview(URL.createObjectURL(image));
    };

    const addVoucher = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("foto", foto);
        formData.append("nama", nama);
        formData.append("kategori", kategori);
        formData.append("status", status);
        try {
            await axios.post("http://localhost:5000/voucher", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                },
            });
              navigate("/dashboard");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-6 mt-4 w-1/2 h-fit mx-auto bg-white rounded-md shadow-2xl">
            <h2 className="text-2xl font-semibold text-center mb-4">Tambah Voucher</h2>
            {msg && <div className="text-red-500 text-center mb-4">{msg}</div>}
            <form onSubmit={addVoucher}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Nama</label>
                    <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="kategori" className="block text-gray-700">Kategori</label>
                    <input
                        type="text"
                        id="kategori"
                        name="kategori"
                        value={kategori}
                        onChange={(e) => setKategori(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="foto" className="block text-gray-700">Foto</label>
                    <input
                        type="file"
                        id="foto"
                        name="foto"
                        accept="image/*"
                        onChange={loadImage}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    {preview ? (
                        <figure className="image is-128x128">
                            <img src={preview} alt="Preview Image" />
                        </figure>
                    ) : (
                        ""
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="status" className="block text-gray-700">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Kategori</option>
                        <option value="available">Tersedia</option>
                        <option value="claimed">Klaim</option>
                    </select>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        // disabled={loading}
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Tambah Data
                    </button>
                </div>
            </form>
        </div>
    );
}
