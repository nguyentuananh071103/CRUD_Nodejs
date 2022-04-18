const mysql = require('mysql');

//Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// View User
exports.view = (req, res)=>{

    pool.getConnection((err, connection)=>{
        if(err) throw err; 
        console.log('Connected as ID ' + connection.threadId);
        //User the connection
        connection.query('SELECT * FROM user WHERE status = "active"', (err, rows)=>{
            //when done with the connection, releasw it
        connection.release();
        if(!err){   
            res.render('home', {rows});
        }else{
            console.log(err);
        }
        console.log('the data from user table: \n', rows );
        });
    });
}


//Find user by search
exports.find = (req, res)=>{
    
    pool.getConnection((err, connection)=>{
        if(err) throw err; 
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;
        //User the connection
        connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows)=>{
            //when done with the connection, releasw it
        connection.release();
        if(!err){   
            res.render('home', {rows});
        }else{
            console.log(err);
        }
        console.log('the data from user table: \n', rows );
        });
    });
}


exports.form = (req, res)=>{
    res.render('add-user');
}

//Add new user
exports.create = (req, res)=>{
    const {first_name, last_name, email, phone, comments} = req.body

    pool.getConnection((err, connection)=>{
        if(err) throw err; 
        console.log('Connected as ID ' + connection.threadId);
        let searchTerm = req.body.search;

        //User the connection
        connection.query('INSERT INTO user SET first_name = ?, last_name = ?',[first_name, last_name], (err, rows)=>{
            //when done with the connection, releasw it
        connection.release();
        if(!err){   
            res.render('add-user');
        }else{
            console.log(err);
        }
        console.log('the data from user table: \n', rows );
        });
    });
}
