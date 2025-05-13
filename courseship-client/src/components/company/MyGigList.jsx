import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTools, FaRupeeSign } from 'react-icons/fa';
import { MdDelete, MdEdit } from 'react-icons/md';

const MyGigList = () => {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/gigs/my-gigs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGigs(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gigs:', err);
        setError('Failed to load gigs');
        setLoading(false);
      }
    };

    fetchMyGigs();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading gigs...</div>;
  if (error) return <div className="text-danger text-center mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">My Posted Gigs</h2>
      {gigs.length === 0 ? (
        <p className="text-center">No gigs posted yet.</p>
      ) : (
        <div className="row">
          {gigs.map((gig) => (
            <div className="col-md-6 mb-4" key={gig._id}>
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-primary">{gig.title}</h5>
                    <p className="card-text text-muted">{gig.description}</p>
                    <p className="mb-1">
                      <FaTools className="me-2 text-secondary" />
                      <strong>Skills:</strong> {gig.skillsRequired.join(', ')}
                    </p>
                    <p className="mb-3">
                      <FaRupeeSign className="me-2 text-success" />
                      <strong>Stipend:</strong> ₹{gig.stipend}
                    </p>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-primary btn-sm me-2">
                      <MdEdit className="me-1" /> Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm">
                      <MdDelete className="me-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyGigList;











// 2 design 

// src/components/company/MyGigList.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MyGigList = () => {
//   const [gigs, setGigs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedGig, setSelectedGig] = useState(null);

//   useEffect(() => {
//     const fetchMyGigs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await axios.get('http://localhost:5000/api/gigs/my-gigs', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setGigs(res.data);
//       } catch (err) {
//         console.error('Error fetching gigs:', err);
//         setError('Failed to load gigs');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMyGigs();
//   }, []);

//   const openModal = (gig) => {
//     setSelectedGig(gig);
//   };

//   const closeModal = () => {
//     setSelectedGig(null);
//   };

//   if (loading) return <p className="text-center mt-4">Loading gigs...</p>;
//   if (error) return <p className="text-danger text-center mt-4">{error}</p>;

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">My Posted Gigs</h2>
//       {gigs.length === 0 ? (
//         <p className="text-muted">No gigs posted yet.</p>
//       ) : (
//         <div className="row">
//           {gigs.map((gig) => (
//             <div className="col-md-6 mb-3" key={gig._id}>
//               <div className="card shadow-sm border-0 h-100">
//                 <div className="card-body">
//                   <h5 className="card-title">{gig.title}</h5>
//                   <p className="card-text text-truncate">{gig.description}</p>
//                   <p><strong>Skills:</strong> {gig.skillsRequired.join(', ')}</p>
//                   <p><strong>Stipend:</strong> ₹{gig.stipend}</p>
//                   <button className="btn btn-outline-primary btn-sm" onClick={() => openModal(gig)}>
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* React Modal */}
//       {selectedGig && (
//         <div
//           className="modal-backdrop"
//           style={{
//             position: 'fixed',
//             top: 0, left: 0, right: 0, bottom: 0,
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1050
//           }}
//         >
//           <div className="bg-white p-4 rounded shadow" style={{ maxWidth: '600px', width: '100%' }}>
//             <h4>{selectedGig.title}</h4>
//             <p><strong>Description:</strong> {selectedGig.description}</p>
//             <p><strong>Skills Required:</strong> {selectedGig.skillsRequired.join(', ')}</p>
//             <p><strong>Stipend:</strong> ₹{selectedGig.stipend}</p>
//             <button className="btn btn-secondary mt-3" onClick={closeModal}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyGigList;
