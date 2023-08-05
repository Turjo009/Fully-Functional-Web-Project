const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static Files Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
let db = mysql.createConnection({
    host: "localhost",
    database: "your_database"
});

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
  res.redirect('/home.html');
});


app.post('/signup', (req, res) => {
    let data = {
        first_name: req.body['first-name'],
        last_name: req.body['last-name'],
        email_address: req.body['Email Address'],
        username: req.body.Username,
        password: req.body.password,
        isAdmin: false,
        isManager: false
    };
    let sql = "INSERT INTO users SET ?";
    let query = db.query(sql, data,(err, result) => {
        if(err) throw err;
        res.redirect('/login.html');
    });
});

app.post('/login', (req, res) => {
    let sql = `SELECT * FROM users WHERE username='${req.body.Username}' AND password='${req.body.password}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            // Save user information in session
            req.session.username = req.body.Username;
            req.session.email = result[0].email_address;
            req.session.isAdmin = result[0].isAdmin;
            req.session.isManager = result[0].isManager;
            req.session.isManager1 = result[0].isManager1; // Added isManager1 to the session
            req.session.isManager2 = result[0].isManager2; // Added isManager2 to the session
            res.redirect('/home.html');
        } else {
            res.send('Invalid Username or Password, go Back and Try Again.');
        }
    });
});

app.get('/api/isLoggedIn', (req, res) => {
    if (!req.session.username) {
      res.sendStatus(401);
    } else {
      res.sendStatus(200);
    }
  });

  app.post('/api/updateUser', (req, res) => {
    const {
        firstname, lastname, email, password, username
    } = req.body;

    // Initialize an array to hold query parts
    let queryParts = [];
    let queryValues = [];

    // Check if each field exists and is not empty, then add to query
    if (firstname) {
        queryParts.push('first_name = ?');
        queryValues.push(firstname);
    }
    if (lastname) {
        queryParts.push('last_name = ?');
        queryValues.push(lastname);
    }
    if (email) {
        queryParts.push('email_address = ?');
        queryValues.push(email);
    }
    if (password) {
        queryParts.push('password = ?');
        queryValues.push(password);
    }
    if (username) {
        queryParts.push('username = ?');
        queryValues.push(username);
    }

    // Add the current user's username to the values array
    queryValues.push(req.session.username);

    // Convert parts array to string
    let queryString = queryParts.join(', ');

    // Construct full query using a placeholder for the username
    let sql = `UPDATE users SET ${queryString} WHERE username = ?`;

    // Execute the query
    db.query(sql, queryValues, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: err.message });
        } else {
            res.send({ message: 'User updated successfully' });
        }
    });
});



app.get('/getClubPage', (req, res) => {
    if (req.session.username && req.session.email) {
        if (req.session.isAdmin) {
            res.sendFile(path.join(__dirname, '/public/clubAdmin.html'));
        } else if (req.session.isManager) {
            res.sendFile(path.join(__dirname, '/public/clubManager.html'));
        } else {
            res.sendFile(path.join(__dirname, '/public/clubguestMember.html'));
        }
    } else {
        res.sendFile(path.join(__dirname, '/public/clubguestMember.html'));
    }
});

app.get('/getClubPage1', (req, res) => {
    if (req.session.username && req.session.email) {
        if (req.session.isAdmin) {
            res.sendFile(path.join(__dirname, '/public/clubAdmin1.html'));
        } else if (req.session.isManager1) {
            res.sendFile(path.join(__dirname, '/public/clubManager1.html'));
        } else {
            res.sendFile(path.join(__dirname, '/public/clubguestMember1.html'));
        }
    } else {
        res.sendFile(path.join(__dirname, '/public/clubguestMember1.html'));
    }
});

app.get('/getClubPage2', (req, res) => {
    if (req.session.username && req.session.email) {
        if (req.session.isAdmin) {
            res.sendFile(path.join(__dirname, '/public/clubAdmin2.html'));
        } else if (req.session.isManager2) {
            res.sendFile(path.join(__dirname, '/public/clubManager2.html'));
        } else {
            res.sendFile(path.join(__dirname, '/public/clubguestMember2.html'));
        }
    } else {
        res.sendFile(path.join(__dirname, '/public/clubguestMember2.html'));
    }
});

app.get('/isLoggedIn', (req, res) => {
    if (req.session.username && req.session.email) {
        res.send({ status: 'success' });
    } else {
        res.send({ status: 'failure' });
    }
});

app.post('/addToClub', (req, res) => {
    if (!req.session.username || !req.session.email) {
        res.send({ status: 'failure', message: 'Not logged in' });
        return;
    }

    // First, check if the user is already a member of the club
    let sql = `SELECT * FROM ClubA_members WHERE username='${req.session.username}' AND email='${req.session.email}'`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            res.send({ status: 'failure', message: err.message });
            return;
        }

        // If user is not a member of the club, insert them into the club
        if (result.length == 0) {
            let data = {
                username: req.session.username,
                email: req.session.email
            };
            sql = "INSERT INTO ClubA_members SET ?";
            query = db.query(sql, data, (err, result) => {
                if (err) {
                    res.send({ status: 'failure', message: err.message });
                    return;
                }
                res.send({ status: 'success' });
            });
        } else {
            res.send({ status: 'failure', message: 'You are already a member of this club' });
        }
    });
});

app.post('/addToClub1', (req, res) => {
    if (!req.session.username || !req.session.email) {
        res.send({ status: 'failure', message: 'Not logged in' });
        return;
    }

    // First, check if the user is already a member of the club
    let sql = `SELECT * FROM ClubB_members WHERE username='${req.session.username}' AND email='${req.session.email}'`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            res.send({ status: 'failure', message: err.message });
            return;
        }

        // If user is not a member of the club, insert them into the club
        if (result.length == 0) {
            let data = {
                username: req.session.username,
                email: req.session.email
            };
            sql = "INSERT INTO ClubB_members SET ?";
            query = db.query(sql, data, (err, result) => {
                if (err) {
                    res.send({ status: 'failure', message: err.message });
                    return;
                }
                res.send({ status: 'success' });
            });
        } else {
            res.send({ status: 'failure', message: 'You are already a member of this club' });
        }
    });
});

app.post('/addToClub', (req, res) => {
    if (!req.session.username || !req.session.email) {
        res.send({ status: 'failure', message: 'Not logged in' });
        return;
    }

    // First, check if the user is already a member of the club
    let sql = `SELECT * FROM ClubC_members WHERE username='${req.session.username}' AND email='${req.session.email}'`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            res.send({ status: 'failure', message: err.message });
            return;
        }

        // If user is not a member of the club, insert them into the club
        if (result.length == 0) {
            let data = {
                username: req.session.username,
                email: req.session.email
            };
            sql = "INSERT INTO ClubC_members SET ?";
            query = db.query(sql, data, (err, result) => {
                if (err) {
                    res.send({ status: 'failure', message: err.message });
                    return;
                }
                res.send({ status: 'success' });
            });
        } else {
            res.send({ status: 'failure', message: 'You are already a member of this club' });
        }
    });
});

app.post('/api/users/delete', (req, res) => {
    const { username } = req.body;

    db.query(`DELETE FROM users WHERE username = ?`, username, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
      } else {
        // delete from ClubA_members
        db.query(`DELETE FROM ClubA_members WHERE username = ?`, username, (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send({ error: err.message });
          } else {
            // delete from ClubB_members
            db.query(`DELETE FROM ClubB_members WHERE username = ?`, username, (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send({ error: err.message });
              } else {
                // delete from ClubC_members
                db.query(`DELETE FROM ClubC_members WHERE username = ?`, username, (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send({ error: err.message });
                  } else {
                    res.send({ success: true });
                  }
                });
              }
            });
          }
        });
      }
    });
  });

  app.post('/isClubMember', (req, res) => {
    if (!req.session.username || !req.session.email) {
      res.json({ status: 'success', isMember: false });
      return;
  }

    let sql = `SELECT * FROM ClubA_members WHERE username = '${req.session.username}'`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.json({ status: 'error', message: 'An error occurred while checking the user\'s club membership status.' });
      } else if (result.length > 0) {
        console.log('User is a member');
        res.json({ status: 'success', isMember: true });
      } else {
        console.log('User is not a member');
        res.json({ status: 'success', isMember: false });
      }
    });
  });

  app.post('/isClubMember1', (req, res) => {
    if (!req.session.username || !req.session.email) {
      res.json({ status: 'success', isMember: false });
      return;
  }
  let sql = `SELECT * FROM ClubB_members WHERE username = '${req.session.username}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ status: 'error', message: 'An error occurred while checking the user\'s club membership status.' });
    } else if (result.length > 0) {
      console.log('User is a member');
      res.json({ status: 'success', isMember: true });
    } else {
      console.log('User is not a member');
      res.json({ status: 'success', isMember: false });
    }
  });
  });
  app.post('/isClubMember2', (req, res) => {
    if (!req.session.username || !req.session.email) {
      res.json({ status: 'success', isMember: false });
      return;
  }
  let sql = `SELECT * FROM ClubC_members WHERE username = '${req.session.username}'`;
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      res.json({ status: 'error', message: 'An error occurred while checking the user\'s club membership status.' });
    } else if (result.length > 0) {
      console.log('User is a member');
      res.json({ status: 'success', isMember: true });
    } else {
      console.log('User is not a member');
      res.json({ status: 'success', isMember: false });
    }
  });
  });
  // Route handler for promoting a user to admin
app.post('/api/users/promoteAdmin', (req, res) => {
    let sql = `UPDATE users SET isAdmin = true WHERE username = '${req.body.username}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).send({ error: err.message });
        } else {
            res.send({ status: 'success' });
        }
    });
  });

  // Route handler for promoting a user to manager 1
  app.post('/api/users/promoteManager1', (req, res) => {
    let sql = `UPDATE users SET isManager1 = true WHERE username = '${req.body.username}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).send({ error: err.message });
        } else {
            res.send({ status: 'success' });
        }
    });
  });

  // Route handler for promoting a user to manager 2
  app.post('/api/users/promoteManager2', (req, res) => {
    let sql = `UPDATE users SET isManager2 = true WHERE username = '${req.body.username}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).send({ error: err.message });
        } else {
            res.send({ status: 'success' });
        }
    });
  });

// Route handler for promoting a user to manager
app.post('/api/users/promoteManager', (req, res) => {
  let sql = `UPDATE users SET isManager = true WHERE username = '${req.body.username}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.error(err);
            res.status(500).send({ error: err.message });
        } else {
            res.send({ status: 'success' });
        }
    });
  });

  function sendEventEmail(email, username, event_title, event_location, event_description) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'webgroupjs@gmail.com',
        pass: 'ebfvlkgmrlncgxcl'
      }
    });

    const html = `
      <h1>Hello ${username}</h1>
      <p>Your club has just created a new event.
      <br>Title: ${event_title}
      <br>Location: ${event_location}
      <br>Description: ${event_description}
      <br>Don't miss out this exciting event!</p>
    `;

    const mailOptions = {
      from: 'webgroupjs@gmail.com',
      to: email,
      subject: 'New Event Notification',
      html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending event email:', error);
      } else {
        console.log('Event email sent:', info.messageId);
      }
    });
  }

  function sendUpdateEmail(email, username, update_title, update_description) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'webgroupjs@gmail.com',
        pass: 'ebfvlkgmrlncgxcl'
      }
    });

    const html = `
      <h1>Hello ${username}</h1>
      <p>Your club has just made a new update.
      <br>Title: ${update_title}
      <br>Description: ${update_description}</p>
    `;

    const mailOptions = {
      from: 'webgroupjs@gmail.com',
      to: email,
      subject: 'New Update Notification',
      html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending update email:', error);
      } else {
        console.log('Update email sent:', info.messageId);
      }
    });
  }

// Route handler for fetching all users
app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
      } else {
        res.send(result);
      }
    });
  });

  app.get('/club-members1', (req, res) => {
    const getMembersQuery = 'SELECT email, username FROM ClubB_members';

    db.query(getMembersQuery, (error, results) => {
      if (error) {
        console.error('Error retrieving club members:', error);
        res.status(500).json({ error: 'Failed to retrieve club members' });
        return;
      }

      const members = results.map(result => ({ email: result.email, username: result.username }));
      res.status(200).json({ members: members });
    });
  });

  app.get('/club-members', (req, res) => {
    const getMembersQuery = 'SELECT email, username FROM ClubA_members';

    db.query(getMembersQuery, (error, results) => {
      if (error) {
        console.error('Error retrieving club members:', error);
        res.status(500).json({ error: 'Failed to retrieve club members' });
        return;
      }

      const members = results.map(result => ({ email: result.email, username: result.username }));
      res.status(200).json({ members: members });
    });
  });

  app.get('/club-members2', (req, res) => {
    const getMembersQuery = 'SELECT email, username FROM ClubC_members';

    db.query(getMembersQuery, (error, results) => {
      if (error) {
        console.error('Error retrieving club members:', error);
        res.status(500).json({ error: 'Failed to retrieve club members' });
        return;
      }

      const members = results.map(result => ({ email: result.email, username: result.username }));
      res.status(200).json({ members: members });
    });
  });

  app.post('/send-email/event', (req, res) => {
    console.log('Received event email request');
    const {
        email, username, event_title, event_location, event_description
    } = req.body;
    sendEventEmail(email, username, event_title, event_location, event_description);

    res.status(200).json({ message: 'Event email sent successfully' });
  });

  app.post('/send-email/update', (req, res) => {
    console.log('Received update email request');
    const {
        email, username, update_title, update_description
    } = req.body;
    sendUpdateEmail(email, username, update_title, update_description);

    res.status(200).json({ message: 'Update email sent successfully' });
  });
  app.post('/joinEvent', (req, res) => {
    let { event_id } = req.body;
    let sql = `SELECT * FROM event_participants WHERE user_id='${req.session.username}' AND event_id='${event_id}'`;
    let query = db.query(sql, (err, result) => {
      if (err) {
          res.send({ status: 'failure', message: err.message });
          return;
      }

      // If user is not a member of the club, insert them into the club
      if (result.length == 0) {
        let data = {
          user_id: req.session.username,
          event_id: event_id
        };
          sql = "INSERT INTO event_participants SET ?";
          query = db.query(sql, data, (err, result) => {
              if (err) {
                  res.send({ status: 'failure', message: 'You need to be logged in to join an event.' });
                  return;
              }
              res.send({ status: 'success' });
          });
      } else {
        res.send({ status: 'failure', message: 'You are already registered for this event' });
      }
    });
  });
  app.post('/joinEvent1', (req, res) => {
    let { event_id } = req.body;
    let sql = `SELECT * FROM event_participants1 WHERE user_id='${req.session.username}' AND event_id='${event_id}'`;
    let query = db.query(sql, (err, result) => {
      if (err) {
          res.send({ status: 'failure', message: err.message });
          return;
      }

      // If user is not a member of the club, insert them into the club
      if (result.length == 0) {
        let data = {
          user_id: req.session.username,
          event_id: event_id
        };
          sql = "INSERT INTO event_participants1 SET ?";
          query = db.query(sql, data, (err, result) => {
              if (err) {
                  res.send({ status: 'failure', message: 'You need to be logged in to join an event.' });
                  return;
              }
              res.send({ status: 'success' });
          });
      } else {
        res.send({ status: 'failure', message: 'You are already registered for this event' });
      }
    });
  });
  app.post('/joinEvent2', (req, res) => {
    let { event_id } = req.body;
    let sql = `SELECT * FROM event_participants2 WHERE user_id='${req.session.username}' AND event_id='${event_id}'`;
    let query = db.query(sql, (err, result) => {
      if (err) {
          res.send({ status: 'failure', message: err.message });
          return;
      }

      // If user is not a member of the club, insert them into the club
      if (result.length == 0) {
        let data = {
          user_id: req.session.username,
          event_id: event_id
        };
          sql = "INSERT INTO event_participants2 SET ?";
          query = db.query(sql, data, (err, result) => {
              if (err) {
                  res.send({ status: 'failure', message: 'You need to be logged in to join an event.' });
                  return;
              }
              res.send({ status: 'success' });
          });
      } else {
        res.send({ status: 'failure', message: 'You are already registered for this event' });
      }
    });
  });
  app.get('/getEventMembers', (req, res) => {
    const sql = "SELECT user_id FROM event_participants WHERE event_id = ?";
    db.query(sql, [req.query.event_id], (err, results) => {
      if (err) {
        res.send({ status: 'failure', message: err.message });
        return;
      }
      res.send(results);
    });
  });
  app.get('/getEventMembers1', (req, res) => {
    const sql = "SELECT user_id FROM event_participants1 WHERE event_id = ?";
    db.query(sql, [req.query.event_id], (err, results) => {
      if (err) {
        res.send({ status: 'failure', message: err.message });
        return;
      }
      res.send(results);
    });
  });
  app.get('/getEventMembers2', (req, res) => {
    const sql = "SELECT user_id FROM event_participants2 WHERE event_id = ?";
    db.query(sql, [req.query.event_id], (err, results) => {
      if (err) {
        res.send({ status: 'failure', message: err.message });
        return;
      }
      res.send(results);
    });
  });
app.listen(3000, () => {
    console.log('Server started on port 3000...');
});

module.exports = app;
