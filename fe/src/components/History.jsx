/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

export default function History({ category }) {
    const [claims, setClaims] = useState([]);
    const [totals, setTotals] = useState({});

    const getClaimVoucher = async () => {
        try {
            const response = await axios.get("http://localhost:5000/claims");
            let data = response.data;

            if (category) {
                data = data.filter((item) => item.voucher.kategori === category);
            }

            // total jmlh perkategori
            const totalPerCategory = data.reduce((acc, claim) => {
                const cat = claim.voucher.kategori;
                acc[cat] = (acc[cat] || 0) + 1;
                return acc;
            }, {});

            setClaims(data);
            setTotals(totalPerCategory);
        } catch (error) {
            console.error("Error fetching claimed vouchers:", error);
        }
    };

    const deleteClaimVoucher = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/claims/${id}`);
            setClaims(claims.filter((claim) => claim.id !== id));
        
        } catch (error) {
            console.error("Error deleting claimed voucher:", error);
        }
    };

    useEffect(() => {
        console.log("Selected category:", category);
        getClaimVoucher();
    }, [category]);

    return (
        <main className="flex-1 bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-4">Voucher List</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white shadow-md rounded-md">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-4 text-left">Nama</th>
                            <th className="p-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.length > 0 ? (
                            claims.map((claim) => (
                                <tr key={claim.id} className="border-t">
                                    <td className="p-4 flex items-center space-x-4">
                                        {/* Menampilkan foto voucher */}
                                        <img
                                            src={`http://localhost:5000/images/${claim.voucher.foto}`}
                                            alt={claim.voucher.nama}
                                            className="w-16 h-16 object-cover rounded-md"
                                        />
                                        {/* Menampilkan nama voucher */}
                                        <span>{claim.voucher.nama}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => deleteClaimVoucher(claim.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="p-4 text-center">
                                    TIdak ada Voucher terklaim
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* <div className="mt-4">
                <h2 className="text-lg font-bold">Total Per Kategori</h2>
                <ul>
                    {Object.entries(totals).map(([cat, count]) => (
                        <li key={cat} className="mt-2">
                            {cat}: {count}
                        </li>
                    ))}
                </ul>
            </div> */}
        </main>
    )
}
