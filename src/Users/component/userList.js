
import { useEffect, useState } from "react";
import UserDetail from "./userDetail";

function UserList() {
  const [userList, setUserList] = useState([]);

  const [userId, setUserId] = useState("");
  const [showUserDetail, setShowUserDetail] = useState(false);

  const getUsers = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    setUserList(await response.json());
  }

  useEffect(() => {
    getUsers();
  }, []);
 

  console.log(userList);
  return (
    <div className="container">
      {showUserDetail ? (
        <UserDetail userId={userId} setShowUserDetail={setShowUserDetail} />
      ) : (
        <div className="row" style={{ margin: "0px auto" }}>
          {userList.length > 0 &&
            userList.map((user) => (
              <div
                key={user.id}
                className="card m-2"
                style={{ width: "18rem" }}
              >
                <div className="card-body">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name[0]}&color=7F9CF5&background=EBF4FF`}
                    class="rounded-circle"
                    style={{marginBottom:'5px'}}
                    alt=""
                  />
                  <h5 className="card-title">{user.name}</h5>
                  <p className="card-text"  style ={{ fontWeight:"lighter", fontStyle:"italic", fontSize:"small"}}>@{user.username}</p>
                  <p className="card-text">
                    <a href={user.email}>{user.email}</a>
                  </p>

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setUserId(user.id);
                      setShowUserDetail(true);
                    }}
                  >
                    More Details
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
