const salesInvoice = require('./salesInvoice'); // Import your schema
const mongoose = require("mongoose");

// Function to Reset the Sequence Counter
const resetCounter = async () => {
    try {
        const collection = mongoose.connection.collection('counters');
        await collection.updateOne(
            { _id: 'salesInvoice_invoice_no' },  // Identifier for the sequence counter
            { $set: { seq: 0 } },  // Reset the sequence number to 0 (next will be 1)
            { upsert: true }  // Create a new counter document if it doesn't exist
        );
        console.log('Sequence counter reset to 0');
    } catch (error) {
        console.error('Error resetting sequence counter:', error);
        
    }
};


module.exports =  resetCounter ;