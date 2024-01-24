
const mysql = require('mysql2/promise');
const connectDatabase = require('./connectDb')

const createDailyTable = async (connection, year, month, day) => {
    const tableName = `data_${year}_${month}_${day}`;
  
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            tgtTime INT PRIMARY KEY,
            pvQnt DECIMAL(10, 2) NOT NULL
        )
    `;
  
    try {
        await connection.execute(createTableQuery);
        console.log(`Table ${tableName} created successfully - start`);
    } catch (error) {
        console.error(`Error creating table ${tableName}:`, error);
    }
};


const insertData = async (connection, year, month, day, data) => {
    const tableName = `data_${year}_${month}_${day}`;

    // Assuming data is an array of objects with tgtTime and pvQnt properties
    const insertQuery = `
        INSERT INTO ${tableName} (tgtTime, pvQnt) VALUES ${data.map(item => `(${item.tgtTime}, ${item.pvQnt})`).join(', ')}
    `;

    try {
        await connection.execute(insertQuery);
        console.log(`Data inserted successfully into ${tableName}`);
    } catch (error) {
        console.error(`Error inserting data into ${tableName}:`, error);
    }
};

const dataToInsert = [
    { tgtTime: 0, pvQnt: 0 },
    { tgtTime: 1, pvQnt: 0 },
    { tgtTime: 2, pvQnt: 0 },
    { tgtTime: 3, pvQnt: 0 },
    { tgtTime: 4, pvQnt: 0 },
    { tgtTime: 5, pvQnt: 0 },
    { tgtTime: 6, pvQnt: 0 },
    { tgtTime: 7, pvQnt: 0 },
    { tgtTime: 8, pvQnt: 0.1 },
    { tgtTime: 9, pvQnt: 0.5 },
    { tgtTime: 10, pvQnt: 2.4 },
    { tgtTime: 11, pvQnt: 3.5 },
    { tgtTime: 12, pvQnt: 3.4 },
    { tgtTime: 13, pvQnt: 2.8 },
    { tgtTime: 14, pvQnt: 2.5 },
    { tgtTime: 15, pvQnt: 1.7 },
    { tgtTime: 16, pvQnt: 0.8 },
    { tgtTime: 17, pvQnt: 0.1 },
    { tgtTime: 18, pvQnt: 0 },
    { tgtTime: 19, pvQnt: 0 },
    { tgtTime: 20, pvQnt: 0 },
    { tgtTime: 21, pvQnt: 0 },
    { tgtTime: 22, pvQnt: 0 },
    { tgtTime: 23, pvQnt: 0 },
    // Add more data objects as needed
];

const createTableOnStart = async () => {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const connection = await connectDatabase();
        
        await createDailyTable(connection, year, month, day);
        

        return connection;
    } catch (error) {
        console.error('Error:', error);
    }
};

createTableOnStart()
    .then(async (connection) => {
        await insertData(connection, 2024, 1, 22, dataToInsert);
        await connection.end();
    })
    .catch(error => {
        console.error('Error:', error);
    });
