import { useEffect, useState } from 'react';

export const Actions = () => {
    let [users, setUsers] = useState([]);


    let [userLength, setUserLength] = useState(null);
    

    useEffect(() => {
        fetch("http://localhost/onlineinstructions/all-users.php")
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.success) {
              setUsers(data.users.reverse());
              setUserLength(true);
            } else {
              setUserLength(0);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

    // Inserting a new user into the database.
  const insertUser = (newUser) => {
    fetch("http://localhost/onlineinstructions/add-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.id) {
          setUsers([
            {
              id: data.id,
              ...newUser,
            },
            ...users,
          ]);
          setUserLength(true);
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
      insertUser,
      users,
  };
};