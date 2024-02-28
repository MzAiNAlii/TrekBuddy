import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";
import "./Style.css";

const Members = () => {
  const [loadingStates, setLoadingStates] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(false);
  const [editMember, setEditMember] = useState({
    name: "",
    userType: "",
  });



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
  };

  const EditModal = async () => {
    setLoadingStates(true);
    try {
      const { id, name, userType } = editMember;
      const payload = { name, userType };
      const res = await axios.put(`http://localhost:4000/update-teamMemberInfo/${id}`, payload);
      toast.success(res.message);
      setData(res.data);
    } catch (error) {
      toast.error(error.message);
      console.log("message", error.message);
    } finally {
      setLoadingStates(false);
      closeModal();
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditMember({ ...editMember, [name]: value });
  };

  const handleEdit = (member) => {
    setEditMember({ ...member, id: member._id });
    setShowModal(true);
  };

  const closeModal = () => {
    setEditMember(null);
    setShowModal(false);
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
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Edit Member Modal"
      >
        <div>
          <button type="button" class="btn-close text-end" aria-label="Close" onClick={closeModal}></button>
          <h5>Edit Member</h5>
          {editMember && (
            <form onSubmit={EditModal}>

              <div >
                <input
                  name="name"
                  className="form-control mb-3 "
                  placeholder="Name"
                  required
                  value={editMember.name}
                  onChange={handleInputChange}
                />
              </div>

              <div >
                <input
                  name="userType"
                  className="form-control mb-3 "
                  placeholder="user Type"
                  required
                  value={editMember.userType}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <button type="submit" className="button btn">
                  {loadingStates ? (
                    <div class="spinner-border text-light" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    ""
                  )}
                  Update
                </button>
              </div>
            </form>

          )}

        </div>
      </Modal>
    </div>
  );
};

export default Members;
