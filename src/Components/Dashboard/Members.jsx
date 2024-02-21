import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Style.css";

const Members = () => {
  const [loadingStates, setLoadingStates] = useState(false);
  const [editMember, setEditMember] = useState()
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingStates(true);
      try {
        const res = await axios.get("http://localhost:4000/all-teamMember");
        toast.success(res.message);
        setData(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchData();
    return () => {
    };
  }, []);

  const handleDelete = async () => {
    setLoadingStates(true);
    try {
      const res = await axios.delete("http://localhost:4000/delete-teamMember");
      toast.success(res.message);
      setData(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadingStates(false);
    }
  }

  const handleEdit = (member) => {
    setEditMember(member);
    setShowModal(true);
    console.log("Edit member clicked:", member);
  };
  
  const closeModal = () => {
    setEditMember(null);
    setShowModal(false);
    console.log("Modal closed");
  };
  
  return (
    <div className="table-responsive-md">
      {loadingStates ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {data && data.data ? (
            <table className="table table-hover align-middle">
              <thead className="Posts_table">
                <tr>
                  <th scope="col" style={{ width: "20%" }}>
                    NAME
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    EMAIL
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    USER TYPE
                  </th>
                  <th scope="col" style={{ width: "25%" }}>
                    UPDATED AT
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    EDIT
                  </th>
                  <th scope="col" style={{ width: "10%" }}>
                    DELETE
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {data.data.map((members) => (
                  <tr key={members._id}>
                    <td>{members.name}</td>
                    <td>{members.email}</td>
                    <td>{members.userType}</td>
                    <td>{members.updatedAt}</td>
                    <td>
                      <button className="Action_btn" onClick={() => handleEdit(members)}>
                        <i className="fa-solid fa-pencil" style={{ color: "#d7eaa8", backgroundColor: "#556b2f", padding: "40%", borderRadius: "50%" }}></i>
                      </button>

                    </td>
                    <td>
                      <button className="Action_btn" onClick={handleDelete}>
                        <i className="fa-solid fa-trash" style={{ color: "#d7eaa8", backgroundColor: "#556b2f", padding: "40%", borderRadius: "50%" }}></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "No Posts Available"
          )}
        </>
      )}

      {showModal ?  (
        <div className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Member</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              {editMember && (
                <div className="modal-body">
                  <p>Name: {editMember.name}</p>
                  <p>Email: {editMember.email}</p>
                  <p>User Type: {editMember.userType}</p>
                </div>
              )}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : console.log("null")}
    </div>
  );
};

export default Members;
