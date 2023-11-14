const express = require('express')
const port = 3000
const path = require('path')
const cookieSession = require('cookie-session')
const bcrypt = require('bcrypt')
const dbConnection = require('./db')
const { body, ValidationReslt } = require('express-validator')
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false }))

// app.set('views', path.join(__dirname, 'views'))
// app.set('view engins', 'ejs')

// app.use(cookieSession({
//     name: 'session',
//     keys: ['key1', 'key2'],
//     maxAge: 3600 * 1000 // 1hr
// }))
// CREATE Routes
// Login
app.post("/login.html", async (req, res) => {
    const { email, password } = req.body

    try {
        dbConnection.query(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            [email, password],
            (err, result, fields) => {
                if (err) {
                    console.log("Data missing or in wrong format", err);
                    return res.status(400).send();
                }
                if (result.length > 0) {
                    // ผู้ใช้พบในฐานข้อมูล
                    const user = result[0];
                    return res.status(200).json({
                        message: "Login successful",
                        user: {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            passsword: user.passsword,
                            urole: user.urole,
                            sex: user.sex
                        }
                    });
                } else {
                    // ไม่พบผู้ใช้
                    return res.status(401).json({ error: "Login fail" });
                }

            }
        )
    } catch (err) {
        console.log("Server error during registration");
        return res.status(500).send();
    }
})



// Register
app.post("/register", async (req, res) => {
    const { username, email, password, urole, sex } = req.body
    // const { username, email, password, urole, sex, image } = req.body

    try {
        dbConnection.query(
            "INSERT INTO users(username, email, password, urole, sex) VALUES(?, ?, ?, ?, ?)",
            [username, email, password, 'user', sex],
            (err, result, fields) => {
                if (err) {
                    console.log("Data missing or in wrong format", err);
                    return res.status(400).send();
                }
                return res.status(201).json({ message: "User registered successfully!" });
            }
        )
    } catch (err) {
        console.log("Server error during registration");
        return res.status(500).send();
    }
})

// PUT

app.get("/request/:borrow_id", async (req, res) => {
    const borrow_id = req.params.borrow_id;
    try {
        dbConnection.query("SELECT motorcycle_name, motorcycle_id, motorcycle_image, borrow_status FROM borrowing WHERE borrow_id = ?", [borrow_id], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(result);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/request_lander/:borrow_id", async (req, res) => {
    const borrow_id = req.params.borrow_id;
    try {
        dbConnection.query("SELECT motorcycle_name, motorcycle_id, motorcycle_image, borrow_status, user_id FROM borrowing WHERE borrow_id = ?", [borrow_id], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(result);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.patch("/request_lander/:borrow_id", async (req, res) => {
    const { reason, borrow_status } = req.body;
    const borrow_id = req.params.borrow_id;

    try {
        dbConnection.query(
            "UPDATE borrowing SET reason = ?, borrow_status = ? WHERE borrow_id = ?",
            [reason, borrow_status, borrow_id],
            (err, result, fields) => {
                if (err) {
                    console.log("Error update into 'borrowing'", err);
                    return res.status(400).json({ message: "Disapprove" });
                }

                return res.status(200).json({ message: "Complete!" });
            }
        );
    }

    catch (err) {
        console.log("Server error during registration", err);
        return res.status(500).send();
    }
});

app.post("/Staff_add", async (req, res) => {
    const { motorcycle_name, motorcycle_detail, motorcycle_image } = req.body;

    try {
        // Insert into 'borrowing'
        dbConnection.query(
            "INSERT INTO motocycles (motorcycle_name, motorcycle_detail, motorcycle_image, motorcycle_status, motorcycle_address) VALUES (?, ?, ?, ?, ?)",
            [motorcycle_name, motorcycle_detail, motorcycle_image, 'avaliable', 'MFU'],
            (err, result, fields) => {
                if (err) {
                    console.log("Error inserting into 'borrowing'", err);
                    return res.status(400).json({ message: "Post product fialed" });
                }

                return res.status(200).json({ message: "Post product successfully!" });
            }
        );
    }
    catch (err) {
        console.log("Server error during registration", err);
        return res.status(500).send();
    }
});

app.get("/homeuser", async (req, res) => {
    try {
        dbConnection.query("SELECT * FROM motocycles", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(result);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/list/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    try {
        dbConnection.query("SELECT user_profile, user_name, motorcycle_name, borrow_status, motorcycle_id, motorcycle_image, borrow_date, return_date, approve_by, reason FROM borrowing WHERE user_id = ?", [user_id], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(result);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/detail/:motorcycle_id", async (req, res) => {
    const motorcycle_id = req.params.motorcycle_id;
    try {
        dbConnection.query("SELECT motorcycle_id, motorcycle_name, motorcycle_image, motorcycle_detail FROM motocycles WHERE motorcycle_id = ?", [motorcycle_id], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(result);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/history/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    try {
        dbConnection.query("SELECT user_profile, user_name, motorcycle_name, borrow_status, motorcycle_id, motorcycle_image, borrow_date, return_date, approve_by, reason FROM borrowing WHERE user_id =?", [user_id], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(result);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

// READ single users form db
app.get("/profile/:email", async (req, res) => {
    const email = req.params.email;

    try {
        dbConnection.query("SELECT * FROM users WHERE email = ?", [email], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(result);
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/history_lander", async (req, res) => {
    try {
        dbConnection.query("SELECT user_profile, user_name, motorcycle_name, borrow_status, motorcycle_id, motorcycle_image, borrow_date, return_date, approve_by, reason FROM borrowing", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ result, File: "history_lander.html" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

// UPDATE 
app.patch("/profile/changePassword/:email", async (req, res) => {
    const email = req.params.email;
    const newPassword = req.body.newPassword;


    try {
        dbConnection.query("UPDATE users SET password = ? WHERE email = ?", [newPassword, email], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "Password changed successfully!" });
        })
    } catch (err) {
        console.log("Password changed failed");
        return res.status(500).send();
    }
})

app.patch("/profile/Edit/:email", async (req, res) => {
    const email = req.params.email;
    const phone = req.body.phone;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const user_location = req.body.user_location;
    const image = req.body.image;

    try {
        dbConnection.query("UPDATE users SET image = ?, phone = ?, firstname = ?, lastname = ?, user_location = ? WHERE email = ?", [image, phone, firstname, lastname, user_location, email], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "Edit successfully!" });
        })
    } catch (err) {
        console.log("Edit failed");
        return res.status(500).send();
    }
})

// RETURN / GET status of borrowing 

app.get("/return/:id", async (req, res) => {
    const id = req.params.id;
    try {
        dbConnection.query("SELECT motorcycle_name, motorcycle_status, motorcycle_id, motorcycle_image FROM motocycles WHERE motorcycle_id = ?", [id], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ result, File: "dashboard_lander.html" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.patch("/return/:id", async (req, res) => {
    const id = req.params.id;
    const motorcycle_status = req.body.motorcycle_status;

    try {
        dbConnection.query("UPDATE motocycles SET motorcycle_status = ? WHERE motorcycle_id = ?", [motorcycle_status, id], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ message: "Status update successfully!", result });
        })
    } catch (err) {
        console.log("Status update failed");
        return res.status(500).send();
    }
})

app.get("/dashbord_lander", async (req, res) => {
    try {
        dbConnection.query("SELECT borrowing.user_id, motocycles.motorcycle_id FROM  borrowing, motocycles", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ result, Text: "item_id, item_status", File: "dashboard_lander.html" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/list_lander", async (req, res) => {
    try {
        dbConnection.query("SELECT motorcycle_name, borrow_status, motorcycle_id, motorcycle_image, user_id, user_profile FROM  borrowing", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ result, File: "list_lander.html" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/Staff_home", async (req, res) => {
    try {
        dbConnection.query("SELECT motorcycle_name, motorcycle_status, motorcycle_id, motorcycle_image FROM  motocycles", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ result, File: "list_lander.html" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/Staff_history", async (req, res) => {
    try {
        dbConnection.query("SELECT user_profile, user_name, motorcycle_name, borrow_status, motorcycle_id, motorcycle_image, borrow_date, return_date, approve_by, reason FROM borrowing", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ result, File: "Staff_history.html" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/Staff_edit/:id", async (req, res) => {
    const id = req.params.id;
    try {
        dbConnection.query("SELECT motorcycle_name, motorcycle_status, motorcycle_id, motorcycle_image, motorcycle_detail FROM motocycles WHERE motorcycle_id = ?", [id], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ result, File: "Staff_edit.html" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.get("/Staff_dashboard", async (req, res) => {
    try {
        dbConnection.query("SELECT borrowing.user_id, motocycles.motorcycle_id FROM  borrowing, motocycles", (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json({ result, Text: "item_id, item_status", File: "dashboard_lander.html" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

// DEDLETE
app.delete("/delete/:email", async (req, res) => {
    const email = req.params.email;

    try {
        dbConnection.query("DELETE FROM users WHERE email = ?", [email], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "No user eith that email!" });
            }
            return res.status(200).json({ message: "User deleted successfully!" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

app.delete("/Staff_edit/:id", async (req, res) => {
    const id = req.params.id;

    try {
        dbConnection.query("DELETE FROM motocycles WHERE motorcycle_id = ?", [id], (err, result, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "delete fialed" });
            }
            return res.status(200).json({ message: "Product deleted successfully!" });
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})


app.get('/', (req, res) => res.send('Hello World!eeee'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));