import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { packageService } from "../../services/packageService";
import Loader from "../Loader/Loader";

const LensModal = ({ isOpen, onClose, lensDataId }) => {
  const [lensData, setLensData] = useState({});
  const [loading, setLoading] = useState(true); // Loading state for API call

  useEffect(() => {
    if (!isOpen || !lensDataId) {
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const response = await packageService.getLensById(lensDataId);
        if (response.success) {
          setLensData(response.data.message.data);
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Error fetching lens details");
      } finally {
        setLoading(false);
      }
    })();
  }, [lensDataId, isOpen]);

  if (!isOpen || !lensDataId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-poppins font-medium text-xl md:text-2xl">
            Lens Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Modal Body */}
        {loading ? (
          <Loader />
        ) : (
          <div className="p-4 md:p-6 font-poppins text-sm md:text-base">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Display Name:</p>
                <p>{lensData.displayName || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Brand:</p>
                <p>{lensData.brand?.name || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Prescription Type:</p>
                <p>{lensData.prescriptionType?.name || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">SKU:</p>
                <p>{lensData.sku || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Sell Price:</p>
                <p>{lensData.sellPrice ? `${lensData.sellPrice} ₹` : "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">MRP:</p>
                <p>{lensData.MRP ? `${lensData.MRP} ₹` : "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Discount:</p>
                <p>{lensData.discount ? `${lensData.discount} ₹` : "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Tax:</p>
                <p>{lensData.tax ? `${lensData.tax} ₹` : "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">Unit:</p>
                <p>{lensData.unit?.name || "N/A"}</p>
              </div>
              <div>
                <p className="font-semibold">New Barcode:</p>
                <p>{lensData.newBarcode || "N/A"}</p>
              </div>
            </div>

            {/* Photos */}
            {lensData.photos && lensData.photos.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold">Photos:</p>
                <div className="flex flex-wrap gap-2">
                  {lensData.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Lens ${index + 1}`}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
                      onError={(e) => (e.target.src = "/placeholder-image.png")} // Fallback image
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {lensData.description && (
              <div className="mt-4">
                <p className="font-semibold">Description:</p>
                <p>{lensData.description}</p>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        {!loading && (
          <div className="flex justify-end p-4 border-t">
            <button
              onClick={onClose}
              className="font-poppins bg-[#007569] text-white rounded-lg px-4 py-2 hover:bg-[#005f56] transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LensModal;
