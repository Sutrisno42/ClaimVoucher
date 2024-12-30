/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export default function Voucher({ category }) {
    const { user, isError } = useSelector((state) => state.auth);
    const [voucher, setVoucher] = useState([]);

    useEffect(() => {
        getVoucher();
    }, [category]);

    const getVoucher = async () => {
        try {
            const response = await axios.get("http://localhost:5000/voucher");
            let data = response.data;
            
            // Filter berdasarkan kategori jika tersedia
            if (category) {
                data = data.filter((item) => item.kategori === category);
            }
    
            // Filter berdasarkan status 'available'
            data = data.filter((item) => item.status === "available");
    
            setVoucher(data);
        } catch (error) {
            console.error("Error fetching voucher:", error);
        }
    };
    
      const claimVoucher = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/voucher/${id}/claim`);
            alert(response.data.message || "Voucher berhasil diklaim!");
            // Setelah klaim, refresh data voucher
            getVoucher();
        } catch (error) {
            console.error("Error claiming voucher:", error);
            alert(error.response?.data?.message || "Gagal mengklaim voucher.");
        }
    };
      
    return (
        <main className="flex-1 p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Data Voucher</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {voucher.length > 0 ? (
                    voucher.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 shadow-md rounded-md flex flex-col"
                        >
                            <img
                                src={`http://localhost:5000/images/${item.foto}`}
                                alt={item.nama}
                                className="w-full h-32 object-cover rounded-md mb-4"
                            />
                            <div className="w-full flex items-center justify-between">
                                <div>
                                    <h2 className="font-semibold">{item.nama}</h2>
                                    <p className="text-gray-500 text-sm">{item.kategori}</p>
                                </div>
                                <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={() => claimVoucher(item.id)}
                                >
                                    Claim
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Tidak ada voucher tersedia.</p>
                )}
            </div>
        </main>
    )
}
