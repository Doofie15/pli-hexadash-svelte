// Group Service - Handles CRUD operations for groups
import { writable } from 'svelte/store';
import groupsData from '../../demo-data/groups.json';

// Create a writable store with the initial data
const groupsStore = writable(groupsData);

// Helper to generate a unique ID
const generateId = () => {
    return Math.max(...groupsData.map(group => group.id), 0) + 1;
};

// Helper to generate a group code
const generateGroupCode = () => {
    const currentYear = new Date().getFullYear();
    const nextGroupNumber = Math.max(...groupsData.map(group => {
        if (group.code.startsWith(`GRP-${currentYear}`)) {
            const codeNumber = parseInt(group.code.split('-')[2]);
            return isNaN(codeNumber) ? 0 : codeNumber;
        }
        return 0;
    }), 0) + 1;
    
    return `GRP-${currentYear}-${nextGroupNumber.toString().padStart(3, '0')}`;
};

// Service object with CRUD methods
const groupService = {
    // Get all groups
    getAll: () => {
        return new Promise((resolve) => {
            // Simulate API delay
            setTimeout(() => {
                let groups;
                groupsStore.subscribe(value => {
                    groups = value;
                })();
                resolve(groups);
            }, 300);
        });
    },
    
    // Get a single group by ID
    getById: (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let groups;
                groupsStore.subscribe(value => {
                    groups = value;
                })();
                
                const group = groups.find(g => g.id === id);
                if (group) {
                    resolve(group);
                } else {
                    reject(new Error(`Group with ID ${id} not found`));
                }
            }, 300);
        });
    },
    
    // Create a new group
    create: (groupData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newGroup = {
                    id: generateId(),
                    code: generateGroupCode(),
                    createdAt: new Date().toISOString(),
                    status: "Active",
                    ...groupData
                };
                
                groupsStore.update(groups => {
                    const updatedGroups = [...groups, newGroup];
                    // Update the mock data for persistence during the session
                    groupsData.push(newGroup);
                    return updatedGroups;
                });
                
                resolve(newGroup);
            }, 300);
        });
    },
    
    // Update an existing group
    update: (id, groupData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let found = false;
                
                groupsStore.update(groups => {
                    const updatedGroups = groups.map(group => {
                        if (group.id === id) {
                            found = true;
                            return { ...group, ...groupData };
                        }
                        return group;
                    });
                    
                    // Update the mock data for persistence during the session
                    const index = groupsData.findIndex(g => g.id === id);
                    if (index !== -1) {
                        groupsData[index] = { ...groupsData[index], ...groupData };
                    }
                    
                    return updatedGroups;
                });
                
                if (found) {
                    let updatedGroup;
                    groupsStore.subscribe(groups => {
                        updatedGroup = groups.find(g => g.id === id);
                    })();
                    resolve(updatedGroup);
                } else {
                    reject(new Error(`Group with ID ${id} not found`));
                }
            }, 300);
        });
    },
    
    // Delete a group
    delete: (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let found = false;
                
                groupsStore.update(groups => {
                    const updatedGroups = groups.filter(group => {
                        if (group.id === id) {
                            found = true;
                            return false;
                        }
                        return true;
                    });
                    
                    // Update the mock data for persistence during the session
                    const index = groupsData.findIndex(g => g.id === id);
                    if (index !== -1) {
                        groupsData.splice(index, 1);
                    }
                    
                    return updatedGroups;
                });
                
                if (found) {
                    resolve({ success: true, message: `Group with ID ${id} deleted successfully` });
                } else {
                    reject(new Error(`Group with ID ${id} not found`));
                }
            }, 300);
        });
    }
};

export default groupService;
export { groupsStore };
