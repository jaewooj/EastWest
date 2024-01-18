
const runTasks = async () => {
    try {
        await createDb();
        
    } catch (error) {
        console.error('Error:', error)
    }

};

runTasks();
