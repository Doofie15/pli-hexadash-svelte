// Breeding Service - Handles CRUD operations for breeding records
import { writable } from 'svelte/store';
import breedingData from '../../demo-data/breeding-records.json';

// Create a writable store with the initial data
const breedingStore = writable(breedingData.records);

// Helper to generate a unique ID
const generateId = () => {
    return Math.max(...breedingData.records.map(record => record.id), 0) + 1;
};

// Service object with CRUD methods
const breedingService = {
    // Get all breeding records
    getAll: () => {
        return new Promise((resolve) => {
            // Simulate API delay
            setTimeout(() => {
                let records;
                breedingStore.subscribe(value => {
                    records = value;
                })();
                resolve(records);
            }, 300);
        });
    },
    
    // Get a single breeding record by ID
    getById: (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let records;
                breedingStore.subscribe(value => {
                    records = value;
                })();
                
                const record = records.find(r => r.id === id);
                if (record) {
                    resolve(record);
                } else {
                    reject(new Error(`Breeding record with ID ${id} not found`));
                }
            }, 300);
        });
    },
    
    // Create a new breeding record
    create: (recordData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newRecord = {
                    id: generateId(),
                    timestamp: new Date().toISOString(),
                    status: "Active",
                    ...recordData
                };
                
                // Calculate days between start and end date if both are provided
                if (newRecord.startDate && newRecord.endDate) {
                    const start = new Date(newRecord.startDate);
                    const end = new Date(newRecord.endDate);
                    const diffTime = Math.abs(end - start);
                    newRecord.days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
                }
                
                // Calculate ram-ewe ratio if both values are provided
                if (newRecord.ewes > 0 && newRecord.rams > 0) {
                    newRecord.ramEweRatio = Math.round(newRecord.ewes / newRecord.rams);
                }
                
                breedingStore.update(records => {
                    const updatedRecords = [...records, newRecord];
                    // Update the mock data for persistence during the session
                    breedingData.records.push(newRecord);
                    return updatedRecords;
                });
                
                resolve(newRecord);
            }, 300);
        });
    },
    
    // Update an existing breeding record
    update: (id, recordData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let found = false;
                
                breedingStore.update(records => {
                    const updatedRecords = records.map(record => {
                        if (record.id === id) {
                            found = true;
                            const updatedRecord = { ...record, ...recordData };
                            
                            // Recalculate days if start or end date changed
                            if ((recordData.startDate || recordData.endDate) && 
                                updatedRecord.startDate && updatedRecord.endDate) {
                                const start = new Date(updatedRecord.startDate);
                                const end = new Date(updatedRecord.endDate);
                                const diffTime = Math.abs(end - start);
                                updatedRecord.days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                            }
                            
                            // Recalculate ram-ewe ratio if ewes or rams changed
                            if ((recordData.ewes || recordData.rams) && 
                                updatedRecord.ewes > 0 && updatedRecord.rams > 0) {
                                updatedRecord.ramEweRatio = Math.round(updatedRecord.ewes / updatedRecord.rams);
                            }
                            
                            return updatedRecord;
                        }
                        return record;
                    });
                    
                    // Update the mock data for persistence during the session
                    const index = breedingData.records.findIndex(r => r.id === id);
                    if (index !== -1) {
                        breedingData.records[index] = { 
                            ...breedingData.records[index], 
                            ...recordData 
                        };
                        
                        // Recalculate days and ratio for mock data too
                        if ((recordData.startDate || recordData.endDate) && 
                            breedingData.records[index].startDate && breedingData.records[index].endDate) {
                            const start = new Date(breedingData.records[index].startDate);
                            const end = new Date(breedingData.records[index].endDate);
                            const diffTime = Math.abs(end - start);
                            breedingData.records[index].days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                        }
                        
                        if ((recordData.ewes || recordData.rams) && 
                            breedingData.records[index].ewes > 0 && breedingData.records[index].rams > 0) {
                            breedingData.records[index].ramEweRatio = 
                                Math.round(breedingData.records[index].ewes / breedingData.records[index].rams);
                        }
                    }
                    
                    return updatedRecords;
                });
                
                if (found) {
                    let updatedRecord;
                    breedingStore.subscribe(records => {
                        updatedRecord = records.find(r => r.id === id);
                    })();
                    resolve(updatedRecord);
                } else {
                    reject(new Error(`Breeding record with ID ${id} not found`));
                }
            }, 300);
        });
    },
    
    // Delete a breeding record
    delete: (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let found = false;
                
                breedingStore.update(records => {
                    const updatedRecords = records.filter(record => {
                        if (record.id === id) {
                            found = true;
                            return false;
                        }
                        return true;
                    });
                    
                    // Update the mock data for persistence during the session
                    const index = breedingData.records.findIndex(r => r.id === id);
                    if (index !== -1) {
                        breedingData.records.splice(index, 1);
                    }
                    
                    return updatedRecords;
                });
                
                if (found) {
                    resolve({ success: true, message: `Breeding record with ID ${id} deleted successfully` });
                } else {
                    reject(new Error(`Breeding record with ID ${id} not found`));
                }
            }, 300);
        });
    }
};

export default breedingService;
export { breedingStore };
